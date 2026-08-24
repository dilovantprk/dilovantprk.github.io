'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getPairwiseBalance } from '@/lib/settlement-algorithm';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowUpRight, UserPlus, BellRing, CheckCircle2 } from 'lucide-react';

export const FriendStatusCards: React.FC = () => {
  const { 
    currentUser, 
    friends, 
    expenses, 
    settlements, 
    currency, 
    openSettleUpModal, 
    openAddFriendModal,
    openUserProfileModal,
    sendNudge 
  } = useAppStore();

  const [nudgeToast, setNudgeToast] = useState<string | null>(null);

  const activeFriends = friends
    .map((friend) => {
      const net = getPairwiseBalance(currentUser.id, friend.id, expenses, settlements);

      const friendExpenses = expenses.filter(
        (e) =>
          e.status !== 'rejected' &&
          ((e.paid_by === currentUser.id && e.splits.some((s) => s.user_id === friend.id)) ||
            (e.paid_by === friend.id && e.splits.some((s) => s.user_id === currentUser.id)))
      );

      const dueDates = friendExpenses.map((e) => e.due_date).filter(Boolean) as string[];
      dueDates.sort();

      return {
        ...friend,
        netBalance: net,
        earliestDueDate: dueDates[0],
      };
    })
    .filter((f) => f.netBalance !== 0);

  const handleNudge = (e: React.MouseEvent, friendId: string) => {
    e.stopPropagation();
    const res = sendNudge(friendId);
    setNudgeToast(res.message);
    setTimeout(() => setNudgeToast(null), 3000);
  };

  const handleSettleUp = (e: React.MouseEvent, friendId: string) => {
    e.stopPropagation();
    openSettleUpModal(friendId);
  };

  return (
    <section className="py-2 font-apple">
      {/* Toast Notification */}
      {nudgeToast && (
        <div className="fixed top-14 left-4 right-4 z-50 apple-glass border border-amber-500/40 bg-amber-950/90 text-amber-300 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">{nudgeToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-sm font-extrabold text-white">
          Sosyal Bakiye Durumu
        </h2>
        <button
          onClick={() => openAddFriendModal()}
          className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors apple-press"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Ekle</span>
        </button>
      </div>

      {/* Content - Dividers List, clicking opens UserProfileModal */}
      {activeFriends.length === 0 ? (
        <div className="py-4 text-center bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-white">Tüm arkadaşlarınla hesaplaştın! 🥳</p>
          <p className="text-[10px] text-zinc-400 font-medium">Aktif borç veya alacağın bulunmuyor.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/10">
          {activeFriends.map((friend) => {
            const owesYou = friend.netBalance > 0;

            return (
              <div
                key={friend.id}
                onClick={() => openUserProfileModal(friend.id)}
                className="py-3 px-1 flex items-center justify-between gap-3 hover:bg-white/[0.04] transition-colors cursor-pointer apple-press rounded-xl"
              >
                {/* User Info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={friend.avatar_url}
                    alt={friend.full_name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">{friend.full_name}</h3>
                    <p className={`text-[10px] font-semibold ${owesYou ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {owesYou ? 'Sana Borçlu' : 'Borçlusun'}
                    </p>
                  </div>
                </div>

                {/* Amount & Action */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <div className={`text-xs font-extrabold ${
                      owesYou ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {formatCurrency(Math.abs(friend.netBalance), currency)}
                    </div>
                    {friend.earliestDueDate && (
                      <span className="text-[9px] font-bold text-amber-300 block">
                        Son: {formatDate(friend.earliestDueDate)}
                      </span>
                    )}
                  </div>

                  {owesYou ? (
                    <button
                      onClick={(e) => handleNudge(e, friend.id)}
                      className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-extrabold transition-all apple-press flex items-center gap-1"
                    >
                      <BellRing className="w-3 h-3 text-amber-400" />
                      <span>Dürt</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleSettleUp(e, friend.id)}
                      className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[10px] font-extrabold transition-all apple-press flex items-center gap-1"
                    >
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      <span>Öde</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
