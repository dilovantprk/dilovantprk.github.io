'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { calculateUserNetBalance } from '@/lib/settlement-algorithm';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, Scale, Plus, ArrowUpRight, UserPlus } from 'lucide-react';

export const NetBalanceCards: React.FC = () => {
  const { 
    currentUser, 
    expenses, 
    settlements, 
    currency, 
    openAddExpenseModal, 
    openSettleUpModal, 
    openAddFriendModal 
  } = useAppStore();

  const balance = calculateUserNetBalance(currentUser.id, expenses, settlements);

  const isNetPositive = balance.netBalance > 0;
  const isNetZero = balance.netBalance === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Toplam Alacak (Apple iOS Green Widget) */}
      <div className="apple-glass p-5 rounded-[28px] border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-zinc-900/80 to-zinc-950/90 relative overflow-hidden group apple-press">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-apple">Toplam Alacağın</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Alacaklı
          </span>
        </div>
        <div className="text-3xl font-extrabold text-emerald-400 tracking-tight font-apple">
          {formatCurrency(balance.totalOwedToUser, currency)}
        </div>
        <p className="text-[11px] text-zinc-400 mt-1 font-medium">Arkadaşlarının sana ödemesi gereken toplam tutar</p>
      </div>

      {/* Toplam Borç (Apple iOS Red Widget) */}
      <div className="apple-glass p-5 rounded-[28px] border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-zinc-900/80 to-zinc-950/90 relative overflow-hidden group apple-press">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-apple">Toplam Borcun</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Borçlu
          </span>
        </div>
        <div className="text-3xl font-extrabold text-rose-400 tracking-tight font-apple">
          {formatCurrency(balance.totalUserOwes, currency)}
        </div>
        <p className="text-[11px] text-zinc-400 mt-1 font-medium">Geri ödemen gereken toplam borç miktarı</p>
      </div>

      {/* Net Durum (Apple iOS System Cyan Widget) */}
      <div className={`apple-glass p-5 rounded-[28px] border ${
        isNetZero
          ? 'border-white/10 bg-zinc-900/80'
          : isNetPositive
          ? 'border-teal-500/40 bg-gradient-to-br from-teal-950/40 to-zinc-900/90'
          : 'border-amber-500/40 bg-gradient-to-br from-amber-950/40 to-zinc-900/90'
      } relative overflow-hidden`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isNetZero ? 'bg-white/10 text-zinc-300' : isNetPositive ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              <Scale className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-apple">Net Bakiye</span>
          </div>
          <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
            isNetZero
              ? 'bg-zinc-800 text-zinc-400'
              : isNetPositive
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {isNetZero ? 'Nötr (0 TL)' : isNetPositive ? 'Alacaklısın' : 'Borçlusun'}
          </span>
        </div>

        <div className={`text-3xl font-extrabold tracking-tight font-apple ${
          isNetZero ? 'text-zinc-400' : isNetPositive ? 'text-teal-300' : 'text-amber-300'
        }`}>
          {formatCurrency(balance.netBalance, currency)}
        </div>

        {/* Apple iOS Quick Action Pills */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
          <button
            onClick={() => openAddExpenseModal()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold transition-all apple-press"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Harcama</span>
          </button>
          <button
            onClick={() => openSettleUpModal()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-full text-xs font-bold transition-all apple-press"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
            <span>Hesap Kapat</span>
          </button>
          <button
            onClick={() => openAddFriendModal()}
            className="p-2 bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/15 rounded-full transition-all apple-press"
            title="Arkadaş Ekle"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
