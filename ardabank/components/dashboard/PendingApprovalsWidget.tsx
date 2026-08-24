'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Clock } from 'lucide-react';

export const PendingApprovalsWidget: React.FC = () => {
  const { 
    currentUser, 
    expenses, 
    settlements, 
    friends, 
    currency, 
    approveExpense, 
    rejectExpense, 
    approveSettlement, 
    rejectSettlement 
  } = useAppStore();

  const pendingExpenses = expenses.filter((e) => {
    if (e.paid_by === currentUser.id) return false;
    const mySplit = e.splits.find((s) => s.user_id === currentUser.id);
    return mySplit && mySplit.status === 'pending';
  });

  const pendingSettlements = settlements.filter(
    (s) => s.receiver_id === currentUser.id && s.status === 'pending'
  );

  const totalPending = pendingExpenses.length + pendingSettlements.length;

  if (totalPending === 0) return null;

  return (
    <div className="py-2 px-1">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-amber-500/30 mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-extrabold text-white font-apple">
            Onay Bekleyen İşlemler ({totalPending})
          </h3>
        </div>
      </div>

      {/* List Dividers */}
      <div className="divide-y divide-white/10">
        {pendingExpenses.map((exp) => {
          const payer = friends.find((f) => f.id === exp.paid_by);
          const mySplit = exp.splits.find((s) => s.user_id === currentUser.id);

          return (
            <div key={exp.id} className="py-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={payer?.avatar_url}
                  alt={payer?.full_name}
                  className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white font-apple truncate">{exp.description}</h4>
                  <p className="text-[10px] text-zinc-400 font-medium truncate">
                    {payer?.full_name.split(' ')[0]} • Payın:{' '}
                    <span className="text-amber-300 font-bold">
                      {formatCurrency(mySplit?.amount_owed || 0, exp.currency)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => rejectExpense(exp.id)}
                  className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-[10px] font-bold"
                >
                  Reddet
                </button>
                <button
                  onClick={() => approveExpense(exp.id)}
                  className="px-2.5 py-0.5 bg-emerald-400 text-black rounded-lg text-[10px] font-extrabold"
                >
                  Onayla
                </button>
              </div>
            </div>
          );
        })}

        {pendingSettlements.map((s) => {
          const payer = friends.find((f) => f.id === s.payer_id);

          return (
            <div key={s.id} className="py-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={payer?.avatar_url}
                  alt={payer?.full_name}
                  className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white font-apple truncate">Ödeme Bildirimi</h4>
                  <p className="text-[10px] text-zinc-400 font-medium truncate">
                    {payer?.full_name.split(' ')[0]} • Tutar:{' '}
                    <span className="text-teal-300 font-bold">
                      {formatCurrency(s.amount, s.currency)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => rejectSettlement(s.id)}
                  className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-[10px] font-bold"
                >
                  Reddet
                </button>
                <button
                  onClick={() => approveSettlement(s.id)}
                  className="px-2.5 py-0.5 bg-emerald-400 text-black rounded-lg text-[10px] font-extrabold"
                >
                  Onayla
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
