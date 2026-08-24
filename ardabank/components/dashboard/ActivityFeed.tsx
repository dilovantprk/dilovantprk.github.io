'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ActivityItem } from '@/types';
import { formatCurrency, formatDate, CATEGORY_DETAILS } from '@/lib/utils';
import { 
  Utensils, 
  ShoppingCart, 
  Plane, 
  Home, 
  Film, 
  Zap, 
  ShoppingBag, 
  Receipt,
  ArrowRightLeft,
  Check,
  X,
  Clock
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Utensils,
  ShoppingCart,
  Plane,
  Home,
  Film,
  Zap,
  ShoppingBag,
  Receipt,
};

export const ActivityFeed: React.FC = () => {
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

  const [filter, setFilter] = useState<'all' | 'pending' | 'expense' | 'settlement'>('all');

  const activities: ActivityItem[] = [];

  expenses.forEach((expense) => {
    const isPaidByMe = expense.paid_by === currentUser.id;
    const payer = isPaidByMe ? currentUser : friends.find((f) => f.id === expense.paid_by);
    const mySplit = expense.splits.find((s) => s.user_id === currentUser.id);

    let subtitle = '';
    let isPositive = isPaidByMe;
    let status = expense.status;

    if (isPaidByMe) {
      subtitle = 'Ödeyen sensin';
    } else {
      subtitle = `${payer ? payer.full_name.split(' ')[0] : 'Biri'} ödedi`;
      if (mySplit) {
        status = mySplit.status;
      }
    }

    const canApprove = !isPaidByMe && mySplit && mySplit.status === 'pending';

    activities.push({
      id: expense.id,
      type: 'expense',
      title: expense.description,
      subtitle,
      amount: expense.amount,
      currency: expense.currency,
      date: expense.date || expense.created_at,
      category: expense.category,
      userBadge: payer ? `@${payer.username}` : undefined,
      isPositive,
      status,
      canApprove,
    });
  });

  settlements.forEach((s) => {
    const isPayer = s.payer_id === currentUser.id;
    const payer = isPayer ? currentUser : friends.find((f) => f.id === s.payer_id);
    const receiver = s.receiver_id === currentUser.id ? currentUser : friends.find((f) => f.id === s.receiver_id);
    const canApprove = s.receiver_id === currentUser.id && s.status === 'pending';

    activities.push({
      id: s.id,
      type: 'settlement',
      title: isPayer ? `${receiver?.full_name.split(' ')[0] || 'Arkadaşına'} Ödeme` : `${payer?.full_name.split(' ')[0] || 'Arkadaşından'} Ödeme`,
      subtitle: s.note || 'Hesap Kapatma',
      amount: s.amount,
      currency: s.currency,
      date: s.created_at,
      isPositive: !isPayer,
      status: s.status,
      canApprove,
    });
  });

  activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredActivities = activities.filter((act) => {
    if (filter === 'expense') return act.type === 'expense';
    if (filter === 'settlement') return act.type === 'settlement';
    if (filter === 'pending') return act.status === 'pending';
    return true;
  });

  return (
    <section className="py-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <h2 className="text-sm font-extrabold text-white font-apple">Hareket Akışı</h2>
        <span className="text-[11px] font-semibold text-zinc-400">
          {filteredActivities.length} İşlem
        </span>
      </div>

      {/* Filter Segmented Pills */}
      <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/10 mb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 px-2.5 text-[11px] font-bold rounded-full transition-all shrink-0 text-center apple-press ${
            filter === 'all' ? 'bg-emerald-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Tümü
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`flex-1 py-1 px-2.5 text-[11px] font-bold rounded-full transition-all shrink-0 text-center apple-press ${
            filter === 'pending' ? 'bg-amber-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Bekleyenler
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`flex-1 py-1 px-2.5 text-[11px] font-bold rounded-full transition-all shrink-0 text-center apple-press ${
            filter === 'expense' ? 'bg-emerald-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Harcama
        </button>
        <button
          onClick={() => setFilter('settlement')}
          className={`flex-1 py-1 px-2.5 text-[11px] font-bold rounded-full transition-all shrink-0 text-center apple-press ${
            filter === 'settlement' ? 'bg-teal-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Ödeme
        </button>
      </div>

      {/* Clean List Items Directly on Dark Background - NO Outer Card Container! */}
      <div className="divide-y divide-white/10">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-6 text-zinc-500 text-xs font-medium">
            İşlem kaydı bulunmuyor.
          </div>
        ) : (
          filteredActivities.map((act) => {
            const catDetails = act.category ? CATEGORY_DETAILS[act.category] : null;
            const IconComponent = catDetails ? ICON_MAP[catDetails.iconName] || Receipt : ArrowRightLeft;

            return (
              <div key={act.id} className="py-3 px-1 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${
                        act.type === 'settlement'
                          ? 'bg-teal-500/20 border-teal-400/30 text-teal-300'
                          : catDetails
                          ? `${catDetails.bg} border-white/10 ${catDetails.text}`
                          : 'bg-white/10 border-white/10 text-zinc-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white font-apple truncate">{act.title}</h4>
                      <p className="text-[10px] text-zinc-400 font-medium truncate">{act.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`text-xs font-extrabold font-apple ${
                      act.status === 'rejected'
                        ? 'line-through text-zinc-500'
                        : act.type === 'settlement'
                        ? 'text-teal-300'
                        : act.isPositive
                        ? 'text-emerald-400'
                        : 'text-white'
                    }`}>
                      {formatCurrency(act.amount, currency)}
                    </div>
                    <span className="text-[9px] text-zinc-500 font-medium block">
                      {formatDate(act.date)}
                    </span>
                  </div>
                </div>

                {/* Inline Action Bar */}
                {act.canApprove && (
                  <div className="mt-2 pt-2 flex items-center justify-between bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                    <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Onayınız Bekleniyor</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          act.type === 'expense' ? rejectExpense(act.id) : rejectSettlement(act.id)
                        }
                        className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-[10px] font-bold transition-all apple-press"
                      >
                        Reddet
                      </button>
                      <button
                        onClick={() =>
                          act.type === 'expense' ? approveExpense(act.id) : approveSettlement(act.id)
                        }
                        className="px-3 py-0.5 bg-emerald-400 text-black text-[10px] font-extrabold rounded-lg transition-all apple-press shadow-sm"
                      >
                        Onayla
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
