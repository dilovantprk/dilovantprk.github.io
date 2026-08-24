import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User, 
  Group, 
  GroupMember, 
  Expense, 
  Settlement, 
  Currency, 
  SplitMethod, 
  ExpenseCategory,
  ApprovalStatus,
  Contact,
  Nudge,
  FriendRequest,
  CrossSettlementOffer
} from '@/types';
import { detectCrossSettlementCycles } from '@/lib/settlement-algorithm';
import { hashPinCode } from '@/lib/security';
import { 
  CURRENT_USER, 
  INITIAL_FRIENDS, 
  INITIAL_GROUPS, 
  INITIAL_GROUP_MEMBERS, 
  INITIAL_EXPENSES, 
  INITIAL_SETTLEMENTS,
  INITIAL_CONTACTS,
  INITIAL_NUDGES
} from './mock-data';
import { calculateSplitAmounts } from './settlement-algorithm';

export type TabType = 'dashboard' | 'notifications' | 'friends' | 'activity' | 'profile';

interface AppState {
  currentUser: User;
  isAuthenticated: boolean;
  currency: Currency;
  friends: User[];
  groups: Group[];
  groupMembers: GroupMember[];
  expenses: Expense[];
  settlements: Settlement[];
  contacts: Contact[];
  nudges: Nudge[];
  isPhonebookConnected: boolean;
  selectedUserProfileId: string | null;
  isUserProfileModalOpen: boolean;
  isEditProfileModalOpen: boolean;
  isAddExpenseModalOpen: boolean;
  isSettleUpModalOpen: boolean;
  isAddFriendModalOpen: boolean;
  isCreateGroupModalOpen: boolean;
  settleUpTargetUserId: string | null;
  selectedGroupId: string | null;
  selectedFriendId: string | null;
  activeTab: TabType;
  
  setCurrentUser: (user: User) => void;
  logoutUser: () => void;

  // State and Actions Definition
  setCurrency: (curr: Currency) => void;
  setActiveTab: (tab: TabType) => void;
  
  openAddExpenseModal: (groupId?: string) => void;
  closeAddExpenseModal: () => void;
  openSettleUpModal: (targetUserId?: string) => void;
  closeSettleUpModal: () => void;
  openAddFriendModal: () => void;
  closeAddFriendModal: () => void;
  openUserProfileModal: (userId: string) => void;
  closeUserProfileModal: () => void;
  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  openCreateGroupModal: () => void;
  closeCreateGroupModal: () => void;

  connectPhonebook: () => void;
  importContacts: (newContacts: Contact[]) => void;
  sendInvite: (contactId: string) => { success: boolean; inviteUrl: string };
  addFriendFromContact: (contact: Contact) => void;

  sendNudge: (toUserId: string, expenseId?: string) => { success: boolean; message: string };
  dismissNudge: (nudgeId: string) => void;

  addExpense: (params: {
    description: string;
    amount: number;
    paidBy: string;
    groupId: string | null;
    category: ExpenseCategory;
    splitMethod: SplitMethod;
    participantIds: string[];
    dueDate?: string;
    customSplitValues?: Record<string, number>;
  }) => { success: boolean; error?: string };

  addSettlement: (params: {
    payerId: string;
    receiverId: string;
    amount: number;
    note?: string;
  }) => void;

  approveExpense: (expenseId: string) => void;
  rejectExpense: (expenseId: string) => void;

  approveSettlement: (settlementId: string) => void;
  rejectSettlement: (settlementId: string) => void;

  friendRequests: FriendRequest[];
  sendFriendRequest: (tagInput: string) => { success: boolean; message?: string; error?: string };
  acceptFriendRequest: (requestId: string) => void;
  rejectFriendRequest: (requestId: string) => void;

  crossSettlementOffers: CrossSettlementOffer[];
  scanForCrossSettlements: () => { offersCount: number; message?: string };
  approveCrossSettlement: (offerId: string) => void;
  rejectCrossSettlement: (offerId: string) => void;

  // 2-Factor Financial Data Encryption & PIN Verification State
  isFinancial2FAEnabled: boolean;
  isFinancialUnlocked: boolean;
  userPinHash: string | null;
  isPinModalOpen: boolean;

  enableFinancial2FA: (pin: string) => void;
  disableFinancial2FA: () => void;
  unlockFinancialData: (pin: string) => boolean;
  lockFinancialData: () => void;
  openPinModal: () => void;
  closePinModal: () => void;

  addFriend: (params: { full_name: string; email_or_username: string }) => { success: boolean; error?: string };

  createGroup: (params: { name: string; memberIds: string[]; imageUrl?: string }) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: CURRENT_USER,
      isAuthenticated: false,
      currency: CURRENT_USER.default_currency,
      friends: INITIAL_FRIENDS,
      groups: INITIAL_GROUPS,
      groupMembers: INITIAL_GROUP_MEMBERS,
      expenses: INITIAL_EXPENSES,
      settlements: INITIAL_SETTLEMENTS,
      contacts: INITIAL_CONTACTS,
      nudges: INITIAL_NUDGES,
      friendRequests: [],
      crossSettlementOffers: [],
      isFinancial2FAEnabled: false,
      isFinancialUnlocked: true,
      userPinHash: null,
      isPinModalOpen: false,
      isPhonebookConnected: false,
      selectedUserProfileId: null,
      isUserProfileModalOpen: false,

      activeTab: 'dashboard',
      isAddExpenseModalOpen: false,
      isSettleUpModalOpen: false,
      isAddFriendModalOpen: false,
      isCreateGroupModalOpen: false,
      settleUpTargetUserId: null,
      selectedGroupId: null,
      selectedFriendId: null,

      setCurrentUser: (currentUser) => {
        const isDemo = currentUser.id === 'usr-me';
        const userWithTag = {
          ...currentUser,
          tag: currentUser.tag || `#${Math.floor(1000 + Math.random() * 9000)}`,
        };
        set({ 
          currentUser: userWithTag, 
          isAuthenticated: true,
          friends: isDemo ? INITIAL_FRIENDS : [],
          expenses: isDemo ? INITIAL_EXPENSES : [],
          settlements: isDemo ? INITIAL_SETTLEMENTS : [],
          nudges: isDemo ? INITIAL_NUDGES : [],
          groups: isDemo ? INITIAL_GROUPS : [],
          groupMembers: isDemo ? INITIAL_GROUP_MEMBERS : [],
        });
      },
      logoutUser: () => {
        localStorage.removeItem('ardabank-storage');
        set({ 
          isAuthenticated: false,
          friends: [],
          expenses: [],
          settlements: [],
          nudges: [],
          groups: [],
          groupMembers: []
        });
      },

      setCurrency: (currency) => set({ currency }),
      setActiveTab: (activeTab) => set({ activeTab }),

      openAddExpenseModal: (groupId) => set({ isAddExpenseModalOpen: true, selectedGroupId: groupId || null }),
      closeAddExpenseModal: () => set({ isAddExpenseModalOpen: false }),

      openSettleUpModal: (targetUserId) => set({ isSettleUpModalOpen: true, settleUpTargetUserId: targetUserId || null }),
      closeSettleUpModal: () => set({ isSettleUpModalOpen: false, settleUpTargetUserId: null }),

      openAddFriendModal: () => set({ isAddFriendModalOpen: true }),
      closeAddFriendModal: () => set({ isAddFriendModalOpen: false }),

      openUserProfileModal: (userId) => set({ selectedUserProfileId: userId, isUserProfileModalOpen: true }),
      closeUserProfileModal: () => set({ selectedUserProfileId: null, isUserProfileModalOpen: false }),

      isEditProfileModalOpen: false,
      openEditProfileModal: () => set({ isEditProfileModalOpen: true }),
      closeEditProfileModal: () => set({ isEditProfileModalOpen: false }),
      updateUserProfile: (updates) => set((state) => ({ currentUser: { ...state.currentUser, ...updates } })),

      openCreateGroupModal: () => set({ isCreateGroupModalOpen: true }),
      closeCreateGroupModal: () => set({ isCreateGroupModalOpen: false }),

      connectPhonebook: () => {
        set({ isPhonebookConnected: true });
      },

      importContacts: (newContacts) => {
        const { contacts } = get();
        // Merge contacts cleanly by phone number or ID
        const existingPhones = new Set(contacts.map((c) => c.phone.replace(/[^0-9]/g, '')));
        const fresh = newContacts.filter((nc) => {
          const cleanPhone = nc.phone.replace(/[^0-9]/g, '');
          return cleanPhone && !existingPhones.has(cleanPhone);
        });

        set({
          isPhonebookConnected: true,
          contacts: [...contacts, ...fresh],
        });
      },

      sendInvite: (contactId) => {
        const { contacts, currentUser } = get();
        const inviteUrl = `https://ardabank.app/invite/@${currentUser.username}`;

        set({
          contacts: contacts.map((c) =>
            c.id === contactId ? { ...c, inviteSent: true } : c
          ),
        });

        return { success: true, inviteUrl };
      },

      sendNudge: (toUserId, expenseId) => {
        const { currentUser, friends, nudges } = get();
        const targetUser = friends.find((f) => f.id === toUserId);

        const newNudge: Nudge = {
          id: `nudge-${Date.now()}`,
          from_user_id: currentUser.id,
          to_user_id: toUserId,
          expense_id: expenseId,
          message: `🔔 ${currentUser.full_name} borç ödemesini hatırlattı (Dürtme)!`,
          created_at: new Date().toISOString(),
          isRead: false,
        };

        set({
          nudges: [newNudge, ...nudges],
        });

        return {
          success: true,
          message: `${targetUser?.full_name || 'Arkadaşınıza'} borç dürtmesi gönderildi!`,
        };
      },

      dismissNudge: (nudgeId) => {
        const { nudges } = get();
        set({
          nudges: nudges.filter((n) => n.id !== nudgeId),
        });
      },

      addFriendFromContact: (contact) => {
        const { friends } = get();
        const exists = friends.some((f) => f.id === contact.registeredUserId);
        if (exists || !contact.registeredUserId) return;

        const cleanUsername = contact.name.toLowerCase().replace(/\s+/g, '_');
        const newFriend: User = {
          id: contact.registeredUserId,
          email: contact.email || `${cleanUsername}@ardabank.app`,
          username: cleanUsername,
          full_name: contact.name,
          phone: contact.phone,
          avatar_url: contact.avatar_url || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
          default_currency: 'TRY',
          created_at: new Date().toISOString(),
        };

        set({
          friends: [...friends, newFriend],
        });
      },

      addExpense: ({
        description,
        amount,
        paidBy,
        groupId,
        category,
        splitMethod,
        participantIds,
        dueDate,
        customSplitValues,
      }) => {
        const { currency, expenses, currentUser } = get();

        const splitResult = calculateSplitAmounts(amount, splitMethod, participantIds, customSplitValues);
        if (!splitResult.isValid) {
          return { success: false, error: splitResult.errorMessage };
        }

        const expenseId = `exp-${Date.now()}`;
        const newSplits = splitResult.splits.map((s, idx) => ({
          id: `es-${Date.now()}-${idx}`,
          expense_id: expenseId,
          user_id: s.userId,
          amount_owed: s.amount,
          percentage: s.percentage,
          is_paid: s.userId === paidBy,
          due_date: dueDate,
          status: (s.userId === currentUser.id ? 'approved' : 'pending') as ApprovalStatus,
        }));

        const actualPayerId = currentUser.id;

        const newExpense: Expense = {
          id: expenseId,
          group_id: groupId || null,
          paid_by: actualPayerId,
          amount,
          currency,
          description,
          category,
          split_method: splitMethod,
          date: new Date().toISOString().split('T')[0],
          due_date: dueDate,
          created_at: new Date().toISOString(),
          status: 'pending',
          splits: newSplits,
        };

        set({
          expenses: [newExpense, ...expenses],
          isAddExpenseModalOpen: false,
        });

        return { success: true };
      },

      addSettlement: ({ payerId, receiverId, amount, note }) => {
        const { currency, settlements } = get();

        const newSettlement: Settlement = {
          id: `set-${Date.now()}`,
          payer_id: payerId,
          receiver_id: receiverId,
          amount,
          currency,
          status: 'pending',
          created_at: new Date().toISOString(),
          note: note || 'Mahsuplaşma İsteği',
        };

        set({
          settlements: [newSettlement, ...settlements],
          isSettleUpModalOpen: false,
          settleUpTargetUserId: null,
        });
      },

      approveExpense: (expenseId) => {
        const { expenses, currentUser } = get();

        set({
          expenses: expenses.map((exp) => {
            if (exp.id !== expenseId) return exp;

            const updatedSplits = exp.splits.map((s) => {
              if (s.user_id === currentUser.id) {
                return { ...s, status: 'approved' as ApprovalStatus };
              }
              return s;
            });

            const allApproved = updatedSplits.every((s) => s.status === 'approved');

            return {
              ...exp,
              splits: updatedSplits,
              status: allApproved ? ('approved' as ApprovalStatus) : exp.status,
            };
          }),
        });
      },

      rejectExpense: (expenseId) => {
        const { expenses, currentUser } = get();

        set({
          expenses: expenses.map((exp) => {
            if (exp.id !== expenseId) return exp;

            const updatedSplits = exp.splits.map((s) => {
              if (s.user_id === currentUser.id) {
                return { ...s, status: 'rejected' as ApprovalStatus };
              }
              return s;
            });

            return {
              ...exp,
              splits: updatedSplits,
              status: 'rejected' as ApprovalStatus,
            };
          }),
        });
      },

      approveSettlement: (settlementId) => {
        const { settlements } = get();

        set({
          settlements: settlements.map((s) =>
            s.id === settlementId ? { ...s, status: 'approved' as ApprovalStatus } : s
          ),
        });
      },

      rejectSettlement: (settlementId) => {
        const { settlements } = get();

        set({
          settlements: settlements.map((s) =>
            s.id === settlementId ? { ...s, status: 'rejected' as ApprovalStatus } : s
          ),
        });
      },

      addFriend: ({ full_name, email_or_username }) => {
        const { friends } = get();
        const cleanName = full_name.trim();
        const cleanInput = email_or_username.trim().toLowerCase().replace('@', '');

        if (!cleanName || !cleanInput) {
          return { success: false, error: 'Lütfen isim ve kullanıcı adı/e-posta alanlarını doldurun.' };
        }

        const exists = friends.some(
          (f) => f.username.toLowerCase() === cleanInput || f.email.toLowerCase() === cleanInput
        );

        if (exists) {
          return { success: false, error: 'Bu kullanıcı zaten arkadaş listenizde mevcut.' };
        }

        const newFriend: User = {
          id: `user-${Date.now()}`,
          email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@ardabank.app`,
          username: cleanInput.includes('@') ? cleanInput.split('@')[0] : cleanInput,
          full_name: cleanName,
          avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
          default_currency: 'TRY',
          created_at: new Date().toISOString(),
        };

        set({
          friends: [...friends, newFriend],
          isAddFriendModalOpen: false,
        });

        return { success: true };
      },

      sendFriendRequest: (tagInput) => {
        const { currentUser, friends, friendRequests } = get();
        const raw = tagInput.trim().replace(/^@/, '');

        if (!raw) {
          return { success: false, error: 'Lütfen kullanıcı adı ve 4 haneli tag girin. Örn: arda#1453' };
        }

        let uname = raw;
        let tag = '';

        if (raw.includes('#')) {
          const parts = raw.split('#');
          uname = parts[0].trim().toLowerCase();
          tag = '#' + parts[1].trim();
        }

        if (!tag || tag.length < 2) {
          return { success: false, error: 'Lütfen 4 haneli #tag ile girin (Örn: arda#1453)' };
        }

        // Check if already friends
        const isAlreadyFriend = friends.some((f) => f.username.toLowerCase() === uname);
        if (isAlreadyFriend) {
          return { success: false, error: `console: @${uname}${tag} zaten arkadaş listenizde mevcut.` };
        }

        // Check if self
        if (uname === currentUser.username.toLowerCase() && (tag === currentUser.tag || !currentUser.tag)) {
          return { success: false, error: 'Kendinize arkadaş isteği gönderemezsiniz.' };
        }

        // Create new friend request or directly add
        const newFriend: User = {
          id: `user-${Date.now()}`,
          email: `${uname}@aradapay.app`,
          username: uname,
          full_name: uname.charAt(0).toUpperCase() + uname.slice(1),
          tag,
          avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
          default_currency: 'TRY',
          created_at: new Date().toISOString(),
        };

        set({
          friends: [...friends, newFriend],
          isAddFriendModalOpen: false,
        });

        return { 
          success: true, 
          message: `@${uname}${tag} kullanıcısına arkadaş isteği gönderildi ve kabul edildi! 🎉` 
        };
      },

      acceptFriendRequest: (requestId) => {
        const { friendRequests, friends } = get();
        const req = friendRequests.find((r) => r.id === requestId);
        if (!req) return;

        const newFriend: User = {
          id: req.from_user_id,
          email: `${req.from_user_name.toLowerCase()}@aradapay.app`,
          username: req.from_user_name.toLowerCase(),
          full_name: req.from_user_name,
          tag: req.from_user_tag,
          avatar_url: req.from_user_avatar,
          default_currency: 'TRY',
          created_at: new Date().toISOString(),
        };

        set({
          friendRequests: friendRequests.filter((r) => r.id !== requestId),
          friends: [...friends, newFriend],
        });
      },

      rejectFriendRequest: (requestId) => {
        const { friendRequests } = get();
        set({
          friendRequests: friendRequests.filter((r) => r.id !== requestId),
        });
      },

      scanForCrossSettlements: () => {
        const { currentUser, friends, expenses, settlements, crossSettlementOffers } = get();
        const allUsers = [
          { id: currentUser.id, name: currentUser.full_name, avatar: currentUser.avatar_url, username: currentUser.username },
          ...friends.map((f) => ({ id: f.id, name: f.full_name, avatar: f.avatar_url, username: f.username })),
        ];

        const detected = detectCrossSettlementCycles(allUsers, expenses, settlements);

        if (!detected.length) {
          return { offersCount: 0, message: 'Şu an aktif bir çapraz borç döngüsü bulunamadı.' };
        }

        const newOffers: CrossSettlementOffer[] = detected.map((cycle, idx) => {
          const approvals: Record<string, boolean> = {};
          cycle.participants.forEach((p) => {
            approvals[p.id] = false;
          });
          // Auto approve for current user when scanning
          approvals[currentUser.id] = true;

          return {
            id: `cso-${Date.now()}-${idx}`,
            cycleAmount: cycle.cycleAmount,
            participants: cycle.participants,
            steps: cycle.steps,
            approvals,
            status: 'pending',
            created_at: new Date().toISOString(),
          };
        });

        set({
          crossSettlementOffers: [...crossSettlementOffers, ...newOffers],
        });

        return {
          offersCount: newOffers.length,
          message: `${newOffers.length} adet çapraz borç dengeleme önerisi oluşturuldu ve tüm ortaklara iletildi! 🎉`,
        };
      },

      approveCrossSettlement: (offerId) => {
        const { currentUser, crossSettlementOffers, settlements } = get();
        const offer = crossSettlementOffers.find((o) => o.id === offerId);
        if (!offer) return;

        const updatedApprovals = {
          ...offer.approvals,
          [currentUser.id]: true,
        };

        const allApproved = offer.participants.every((p) => updatedApprovals[p.id]);

        if (allApproved) {
          const newSettlements: Settlement[] = offer.steps.map((step, idx) => ({
            id: `set-cross-${Date.now()}-${idx}`,
            payer_id: step.fromUserId,
            receiver_id: step.toUserId,
            amount: step.amount,
            currency: 'TRY',
            status: 'approved',
            created_at: new Date().toISOString(),
            note: '🔄 Çapraz Borç Dengelemesi ile otomatik mahsuplaşma',
          }));

          set({
            settlements: [...settlements, ...newSettlements],
            crossSettlementOffers: crossSettlementOffers.map((o) =>
              o.id === offerId ? { ...o, approvals: updatedApprovals, status: 'approved' } : o
            ),
          });
        } else {
          set({
            crossSettlementOffers: crossSettlementOffers.map((o) =>
              o.id === offerId ? { ...o, approvals: updatedApprovals } : o
            ),
          });
        }
      },

      rejectCrossSettlement: (offerId) => {
        const { crossSettlementOffers } = get();
        set({
          crossSettlementOffers: crossSettlementOffers.map((o) =>
            o.id === offerId ? { ...o, status: 'rejected' } : o
          ),
        });
      },

      enableFinancial2FA: (pin) => {
        const hash = hashPinCode(pin);
        set({
          isFinancial2FAEnabled: true,
          isFinancialUnlocked: false,
          userPinHash: hash,
          isPinModalOpen: false,
        });
      },

      disableFinancial2FA: () => {
        set({
          isFinancial2FAEnabled: false,
          isFinancialUnlocked: true,
          userPinHash: null,
          isPinModalOpen: false,
        });
      },

      unlockFinancialData: (pin) => {
        const { userPinHash } = get();
        if (!userPinHash) return true;
        const enteredHash = hashPinCode(pin);
        if (enteredHash === userPinHash) {
          set({ isFinancialUnlocked: true, isPinModalOpen: false });
          return true;
        }
        return false;
      },

      lockFinancialData: () => {
        const { isFinancial2FAEnabled } = get();
        if (isFinancial2FAEnabled) {
          set({ isFinancialUnlocked: false });
        }
      },

      openPinModal: () => set({ isPinModalOpen: true }),
      closePinModal: () => set({ isPinModalOpen: false }),

      createGroup: ({ name, memberIds, imageUrl }) => {
        const { groups, groupMembers, currentUser } = get();
        const groupId = `group-${Date.now()}`;
        
        const allMembers = Array.from(new Set([currentUser.id, ...memberIds]));

        const newGroup: Group = {
          id: groupId,
          name,
          created_by: currentUser.id,
          image_url: imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&auto=format&fit=crop&q=80',
          created_at: new Date().toISOString(),
          members_count: allMembers.length,
        };

        const newMembers: GroupMember[] = allMembers.map((uid, idx) => ({
          id: `gm-${Date.now()}-${idx}`,
          group_id: groupId,
          user_id: uid,
          joined_at: new Date().toISOString(),
        }));

        set({
          groups: [newGroup, ...groups],
          groupMembers: [...groupMembers, ...newMembers],
          isCreateGroupModalOpen: false,
        });
      },
    }),
    {
      name: 'ardabank-storage',
      partialize: (state) => ({
        friends: state.friends,
        groups: state.groups,
        groupMembers: state.groupMembers,
        expenses: state.expenses,
        settlements: state.settlements,
        nudges: state.nudges,
        isPhonebookConnected: state.isPhonebookConnected,
        currency: state.currency,
      }),
    }
  )
);
