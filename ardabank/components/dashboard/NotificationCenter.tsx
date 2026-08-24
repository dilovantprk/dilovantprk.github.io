'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Bell, Clock, BellRing, Check, X, ShieldAlert } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { 
    currentUser, 
    expenses, 
    settlements, 
    nudges, 
    friends, 
    currency, 
    approveExpense, 
    rejectExpense, 
    approveSettlement, 
    rejectSettlement,
    dismissNudge 
  } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);

  // Pending expenses
  const pendingExpenses = expenses.filter((e) => {
    if (e.paid_by === currentUser.id) return false;
    const mySplit = e.splits.find((s) => s.user_id === currentUser.id);
    return mySplit && mySplit.status === 'pending';
  });

  // Pending settlements
  const pendingSettlements = settlements.filter(
    (s) => s.receiver_id === currentUser.id && s.status === 'pending'
  );

  // Received nudges
  const myNudges = nudges.filter((n) => n.to_user_id === currentUser.id);

  const totalNotifications = pendingExpenses.length + pendingSettlements.length + myNudges.length;

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/15 transition-all apple-press"
        aria-label="Bildirimler"
      >
        <Bell className="w-4 h-4" />
        {totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-black shadow-md">
            {totalNotifications}
          </span>
        )}
      </button>

      {/* Notification Center Dropdown Drawer */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-3 w-80 sm:w-96 apple-glass rounded-[28px] border border-white/15 shadow-2xl z-50 p-4 animate-fade-in text-zinc-100">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-extrabold text-white font-apple">Bildirimler Merkezi</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                {totalNotifications} Yeni
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {totalNotifications === 0 ? (
                <div className="text-center py-6 text-zinc-500 text-xs font-medium">
                  Henüz yeni bir bildiriminiz yok.
                </div>
              ) : (
                <>
                  {/* Nudges */}
                  {myNudges.map((nudge) => {
                    const sender = friends.find((f) => f.id === nudge.from_user_id);
                    return (
                      <div
                        key={nudge.id}
                        className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-2"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <BellRing className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white font-apple truncate">
                              {sender?.full_name} borcunu hatırlattı!
                            </p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{nudge.message}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissNudge(nudge.id)}
                          className="text-zinc-400 hover:text-white p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {/* Pending Expenses */}
                  {pendingExpenses.map((exp) => {
                    const payer = friends.find((f) => f.id === exp.paid_by);
                    const mySplit = exp.splits.find((s) => s.user_id === currentUser.id);

                    return (
                      <div
                        key={exp.id}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                            Harcama Onayı İstendi
                          </span>
                          <h4 className="text-xs font-bold text-white font-apple truncate">{exp.description}</h4>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            {payer?.full_name} • Payın:{' '}
                            <span className="text-emerald-400 font-bold">
                              {formatCurrency(mySplit?.amount_owed || 0, exp.currency)}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => rejectExpense(exp.id)}
                            className="p-1.5 bg-rose-500/20 text-rose-300 rounded-full"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => approveExpense(exp.id)}
                            className="p-1.5 bg-emerald-500 text-black rounded-full"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Pending Settlements */}
                  {pendingSettlements.map((s) => {
                    const payer = friends.find((f) => f.id === s.payer_id);

                    return (
                      <div
                        key={s.id}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                            Ödeme Onayı İstendi
                          </span>
                          <h4 className="text-xs font-bold text-white font-apple truncate">{payer?.full_name} Ödeme Yaptı</h4>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            Tutar:{' '}
                            <span className="text-teal-300 font-bold">
                              {formatCurrency(s.amount, s.currency)}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => rejectSettlement(s.id)}
                            className="p-1.5 bg-rose-500/20 text-rose-300 rounded-full"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => approveSettlement(s.id)}
                            className="p-1.5 bg-emerald-500 text-black rounded-full"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
