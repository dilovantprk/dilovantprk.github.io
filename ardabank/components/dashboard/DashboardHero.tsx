'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { calculateUserNetBalance } from '@/lib/settlement-algorithm';
import { formatCurrency } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  ArrowUpRight, 
  UserPlus
} from 'lucide-react';

import { maskFinancialData } from '@/lib/security';
import { Lock } from 'lucide-react';

export const DashboardHero: React.FC = () => {
  const { 
    currentUser, 
    expenses, 
    settlements, 
    friends, 
    currency, 
    openAddExpenseModal, 
    openSettleUpModal, 
    openAddFriendModal,
    isFinancial2FAEnabled,
    isFinancialUnlocked,
    openPinModal
  } = useAppStore();

  const { netBalance, totalOwedToUser, totalUserOwes } = calculateUserNetBalance(currentUser.id, expenses, settlements);

  let totalReceivable = 0;
  let totalPayable = 0;

  friends.forEach((friend) => {
    const friendExpenses = expenses.filter(
      (e) =>
        e.status !== 'rejected' &&
        ((e.paid_by === currentUser.id && e.splits.some((s) => s.user_id === friend.id && s.status === 'approved')) ||
          (e.paid_by === friend.id && e.splits.some((s) => s.user_id === currentUser.id && s.status === 'approved')))
    );

    let bal = 0;
    friendExpenses.forEach((exp) => {
      if (exp.paid_by === currentUser.id) {
        const s = exp.splits.find((spl) => spl.user_id === friend.id && spl.status === 'approved');
        if (s) bal += s.amount_owed;
      } else {
        const s = exp.splits.find((spl) => spl.user_id === currentUser.id && spl.status === 'approved');
        if (s) bal -= s.amount_owed;
      }
    });

    settlements.forEach((s) => {
      if (s.status !== 'approved') return;
      if (s.payer_id === currentUser.id && s.receiver_id === friend.id) bal += s.amount;
      if (s.receiver_id === currentUser.id && s.payer_id === friend.id) bal -= s.amount;
    });

    if (bal > 0) totalReceivable += bal;
    if (bal < 0) totalPayable += Math.abs(bal);
  });

  const isUnlocked = !isFinancial2FAEnabled || isFinancialUnlocked;

  return (
    <section className="py-2 px-1">
      {/* Greeting & Net Balance Header */}
      <div className="flex items-center justify-between gap-2 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block font-apple">
                Canlı Bakiye
              </span>
              <h1 className="text-xl font-extrabold text-white font-apple tracking-tight mt-0.5">
                Hoş Geldin, {currentUser.full_name.split(' ')[0]} 👋
              </h1>
            </div>

            {/* Net Balance Pill */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="text-[10px] font-semibold text-zinc-400 block font-apple">Net Bakiye</span>
                {!isUnlocked && (
                  <button onClick={openPinModal} className="text-amber-400 hover:text-amber-300">
                    <Lock className="w-3 h-3 animate-pulse" />
                  </button>
                )}
              </div>
              <div className={`text-lg font-extrabold font-apple tracking-tight ${
                netBalance > 0
                  ? 'text-emerald-400'
                  : netBalance < 0
                  ? 'text-rose-400'
                  : 'text-zinc-300'
              }`}>
                {isUnlocked ? (netBalance > 0 ? '+' : '') : ''}
                {isUnlocked ? formatCurrency(netBalance, currency) : maskFinancialData(netBalance, false)}
              </div>
            </div>
          </div>

          {/* Financial Health Metrics */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <div
              onClick={!isUnlocked ? openPinModal : undefined}
              className={`p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between ${
                !isUnlocked ? 'cursor-pointer hover:bg-white/10' : ''
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold text-zinc-400 block font-apple">Alacakların</span>
                <div className="text-sm font-extrabold text-emerald-400 font-apple mt-0.5">
                  {isUnlocked ? '+' + formatCurrency(totalReceivable, currency) : maskFinancialData(totalReceivable, false)}
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>

            <div
              onClick={!isUnlocked ? openPinModal : undefined}
              className={`p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between ${
                !isUnlocked ? 'cursor-pointer hover:bg-white/10' : ''
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold text-zinc-400 block font-apple">Borçların</span>
                <div className="text-sm font-extrabold text-rose-400 font-apple mt-0.5">
                  {isUnlocked ? '-' + formatCurrency(totalPayable, currency) : maskFinancialData(totalPayable, false)}
                </div>
              </div>
              <TrendingDown className="w-4 h-4 text-rose-400" />
            </div>
          </div>

      {/* Quick Action Pills */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => openAddExpenseModal()}
          className="py-2.5 px-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs font-extrabold rounded-xl shadow-md shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Harcama Ekle</span>
        </button>

        <button
          onClick={() => openSettleUpModal()}
          className="py-2.5 px-3 bg-white/10 text-white border border-white/15 text-xs font-extrabold rounded-xl transition-all apple-press flex items-center justify-center gap-1.5"
        >
          <ArrowUpRight className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          <span>Hesap Kapat</span>
        </button>
      </div>
    </section>
  );
};
