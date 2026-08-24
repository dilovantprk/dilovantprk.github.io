import { Expense, Settlement, PairwiseDebt, SplitMethod } from '@/types';

/**
 * Calculates net balance for a specific user from APPROVED expenses and settlements.
 * Unapproved (pending) or rejected transactions do not alter active balances until confirmed.
 */
export function calculateUserNetBalance(
  userId: string,
  expenses: Expense[],
  settlements: Settlement[]
): { totalOwedToUser: number; totalUserOwes: number; netBalance: number } {
  let totalOwedToUser = 0;
  let totalUserOwes = 0;

  const friendBalances: Record<string, number> = {};

  expenses.forEach((expense) => {
    if (expense.status === 'rejected') return;

    const paidBy = expense.paid_by;

    expense.splits.forEach((split) => {
      if (split.status !== 'approved' || split.user_id === paidBy) return;

      if (paidBy === userId) {
        friendBalances[split.user_id] = Math.round(((friendBalances[split.user_id] || 0) + split.amount_owed) * 100) / 100;
      } else if (split.user_id === userId) {
        friendBalances[paidBy] = Math.round(((friendBalances[paidBy] || 0) - split.amount_owed) * 100) / 100;
      }
    });
  });

  settlements.forEach((settlement) => {
    if (settlement.status !== 'approved') return;

    if (settlement.payer_id === userId) {
      friendBalances[settlement.receiver_id] = Math.round(((friendBalances[settlement.receiver_id] || 0) + settlement.amount) * 100) / 100;
    } else if (settlement.receiver_id === userId) {
      friendBalances[settlement.payer_id] = Math.round(((friendBalances[settlement.payer_id] || 0) - settlement.amount) * 100) / 100;
    }
  });

  Object.values(friendBalances).forEach((bal) => {
    if (bal > 0) {
      totalOwedToUser += bal;
    } else if (bal < 0) {
      totalUserOwes += Math.abs(bal);
    }
  });

  const netBalance = totalOwedToUser - totalUserOwes;

  return {
    totalOwedToUser: Math.round(totalOwedToUser * 100) / 100,
    totalUserOwes: Math.round(totalUserOwes * 100) / 100,
    netBalance: Math.round(netBalance * 100) / 100,
  };
}

/**
 * Calculates net pairwise balance between user A and user B from APPROVED transactions.
 */
export function getPairwiseBalance(
  userAId: string,
  userBId: string,
  expenses: Expense[],
  settlements: Settlement[]
): number {
  let net = 0;

  expenses.forEach((expense) => {
    if (expense.status === 'rejected') return;

    if (expense.paid_by === userAId) {
      const splitB = expense.splits.find((s) => s.user_id === userBId && s.status === 'approved');
      if (splitB) net += splitB.amount_owed;
    } else if (expense.paid_by === userBId) {
      const splitA = expense.splits.find((s) => s.user_id === userAId && s.status === 'approved');
      if (splitA) net -= splitA.amount_owed;
    }
  });

  settlements.forEach((s) => {
    if (s.status !== 'approved') return;

    if (s.payer_id === userAId && s.receiver_id === userBId) {
      net += s.amount;
    } else if (s.payer_id === userBId && s.receiver_id === userAId) {
      net -= s.amount;
    }
  });

  return Math.round(net * 100) / 100;
}

/**
 * Simplifies group or multi-party debts using a greedy flow algorithm over approved balances.
 */
export function simplifyDebts(
  allUserIds: string[],
  expenses: Expense[],
  settlements: Settlement[]
): PairwiseDebt[] {
  const netBalances: Record<string, number> = {};
  allUserIds.forEach((id) => (netBalances[id] = 0));

  expenses.forEach((expense) => {
    if (expense.status === 'rejected') return;

    const paidBy = expense.paid_by;
    expense.splits.forEach((split) => {
      if (split.status === 'approved' && split.user_id !== paidBy) {
        netBalances[paidBy] = Math.round(((netBalances[paidBy] || 0) + split.amount_owed) * 100) / 100;
        netBalances[split.user_id] = Math.round(((netBalances[split.user_id] || 0) - split.amount_owed) * 100) / 100;
      }
    });
  });

  settlements.forEach((s) => {
    if (s.status !== 'approved') return;
    netBalances[s.payer_id] = Math.round(((netBalances[s.payer_id] || 0) + s.amount) * 100) / 100;
    netBalances[s.receiver_id] = Math.round(((netBalances[s.receiver_id] || 0) - s.amount) * 100) / 100;
  });

  const debtors: { userId: string; amount: number }[] = [];
  const creditors: { userId: string; amount: number }[] = [];

  Object.entries(netBalances).forEach(([userId, bal]) => {
    const rounded = Math.round(bal * 100) / 100;
    if (rounded < -0.01) {
      debtors.push({ userId, amount: Math.abs(rounded) });
    } else if (rounded > 0.01) {
      creditors.push({ userId, amount: rounded });
    }
  });

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const simplified: PairwiseDebt[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settlementAmount = Math.round(Math.min(debtor.amount, creditor.amount) * 100) / 100;

    if (settlementAmount > 0) {
      simplified.push({
        fromUserId: debtor.userId,
        toUserId: creditor.userId,
        amount: settlementAmount,
      });
    }

    debtor.amount = Math.round((debtor.amount - settlementAmount) * 100) / 100;
    creditor.amount = Math.round((creditor.amount - settlementAmount) * 100) / 100;

    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return simplified;
}

export function calculateSplitAmounts(
  totalAmount: number,
  method: SplitMethod,
  participantIds: string[],
  customValues?: Record<string, number>
): { splits: { userId: string; amount: number; percentage?: number }[]; isValid: boolean; errorMessage?: string } {
  if (!participantIds.length || totalAmount <= 0) {
    return { splits: [], isValid: false, errorMessage: 'Lütfen geçerli bir tutar ve katılımcı seçin.' };
  }

  if (method === 'equal') {
    const count = participantIds.length;
    const baseAmount = Math.floor((totalAmount / count) * 100) / 100;
    const remainder = Math.round((totalAmount - baseAmount * count) * 100) / 100;

    const splits = participantIds.map((userId, idx) => {
      let amount = baseAmount;
      if (idx === 0 && remainder > 0) {
        amount = Math.round((amount + remainder) * 100) / 100;
      }
      return { userId, amount };
    });

    return { splits, isValid: true };
  }

  if (method === 'percentage') {
    if (!customValues) {
      return { splits: [], isValid: false, errorMessage: 'Yüzde değerleri eksik.' };
    }

    let totalPct = 0;
    participantIds.forEach((id) => {
      totalPct += customValues[id] || 0;
    });

    if (Math.abs(totalPct - 100) > 0.1) {
      return {
        splits: [],
        isValid: false,
        errorMessage: `Yüzdelerin toplamı %100 olmalıdır. Şu an: %${totalPct.toFixed(1)}`,
      };
    }

    const splits = participantIds.map((userId) => {
      const pct = customValues[userId] || 0;
      const amount = Math.round(((totalAmount * pct) / 100) * 100) / 100;
      return { userId, amount, percentage: pct };
    });

    return { splits, isValid: true };
  }

  if (method === 'exact') {
    if (!customValues) {
      return { splits: [], isValid: false, errorMessage: 'Kesin tutarlar eksik.' };
    }

    let sumExact = 0;
    participantIds.forEach((id) => {
      sumExact += customValues[id] || 0;
    });

    sumExact = Math.round(sumExact * 100) / 100;

    if (Math.abs(sumExact - totalAmount) > 0.05) {
      return {
        splits: [],
        isValid: false,
        errorMessage: `Girilen tutarların toplamı (${sumExact} TL) harcama tutarına (${totalAmount} TL) eşit olmalıdır.`,
      };
    }

    const splits = participantIds.map((userId) => ({
      userId,
      amount: Math.round((customValues[userId] || 0) * 100) / 100,
    }));

    return { splits, isValid: true };
  }

  return { splits: [], isValid: false, errorMessage: 'Geçersiz bölüşüm yöntemi.' };
}

/**
 * Detects ANY N-way (2-way, 3-way, 4-way, 5-way, etc.) circular debt cycles between mutual friends.
 * Finds all directed debt cycles (A -> B -> C -> D -> A ...) and calculates the maximum
 * bottleneck capacity (cycleAmount) that can be cancelled across all N participants simultaneously!
 */
export function detectCrossSettlementCycles(
  users: { id: string; name: string; avatar: string; username: string }[],
  expenses: Expense[],
  settlements: Settlement[]
): {
  cycleAmount: number;
  participants: { id: string; name: string; avatar: string; username: string }[];
  steps: { fromUserId: string; fromUserName: string; toUserId: string; toUserName: string; amount: number }[];
}[] {
  const userMap = new Map(users.map((u) => [u.id, u]));
  const userIds = Array.from(userMap.keys());
  const n = userIds.length;
  if (n < 2) return [];

  // Build pairwise debt matrix: matrix[i][j] = amount user i owes user j
  const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const bal = getPairwiseBalance(userIds[i], userIds[j], expenses, settlements);
        if (bal < -0.01) {
          matrix[i][j] = Math.abs(bal);
        }
      }
    }
  }

  const foundCycles: number[][] = [];

  // DFS Cycle Finder for any length L >= 2 (up to max 8 nodes for graph optimization)
  function dfsFindCycles(startNode: number, currentNode: number, path: number[], maxDepth = 8) {
    if (path.length > maxDepth) return;

    for (let nextNode = 0; nextNode < n; nextNode++) {
      if (matrix[currentNode][nextNode] <= 0.01) continue;

      if (nextNode === startNode && path.length >= 2) {
        // Found directed cycle of length path.length!
        const minIndex = path.indexOf(Math.min(...path));
        const canonical = [...path.slice(minIndex), ...path.slice(0, minIndex)];
        const key = canonical.join(':');

        const isDuplicate = foundCycles.some((c) => {
          const minIdx = c.indexOf(Math.min(...c));
          const cCanonical = [...c.slice(minIdx), ...c.slice(0, minIdx)];
          return cCanonical.join(':') === key;
        });

        if (!isDuplicate) {
          foundCycles.push(canonical);
        }
      } else if (!path.includes(nextNode) && nextNode > startNode) {
        dfsFindCycles(startNode, nextNode, [...path, nextNode], maxDepth);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    dfsFindCycles(i, i, [i]);
  }

  const results: {
    cycleAmount: number;
    participants: { id: string; name: string; avatar: string; username: string }[];
    steps: { fromUserId: string; fromUserName: string; toUserId: string; toUserName: string; amount: number }[];
  }[] = [];

  foundCycles.forEach((cycleNodes) => {
    const k = cycleNodes.length;
    let cycleAmount = Infinity;

    for (let i = 0; i < k; i++) {
      const u = cycleNodes[i];
      const v = cycleNodes[(i + 1) % k];
      cycleAmount = Math.min(cycleAmount, matrix[u][v]);
    }

    cycleAmount = Math.round(cycleAmount * 100) / 100;

    if (cycleAmount > 0.01 && isFinite(cycleAmount)) {
      const participants = cycleNodes.map((idx) => userMap.get(userIds[idx])!);
      const steps: { fromUserId: string; fromUserName: string; toUserId: string; toUserName: string; amount: number }[] = [];

      for (let i = 0; i < k; i++) {
        const uNode = userMap.get(userIds[cycleNodes[i]])!;
        const vNode = userMap.get(userIds[cycleNodes[(i + 1) % k]])!;
        steps.push({
          fromUserId: uNode.id,
          fromUserName: uNode.name,
          toUserId: vNode.id,
          toUserName: vNode.name,
          amount: cycleAmount,
        });
      }

      results.push({
        cycleAmount,
        participants,
        steps,
      });
    }
  });

  results.sort((a, b) => b.cycleAmount - a.cycleAmount);

  return results;
}

