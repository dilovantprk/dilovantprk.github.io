'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getPairwiseBalance } from '@/lib/settlement-algorithm';
import { formatCurrency } from '@/lib/utils';
import { 
  UserPlus, 
  Search, 
  ArrowUpRight, 
  BellRing, 
  Users, 
  Sparkles
} from 'lucide-react';

export const FriendsView: React.FC = () => {
  const { 
    currentUser, 
    friends, 
    expenses, 
    settlements, 
    currency, 
    addFriend,
    openAddFriendModal, 
    openSettleUpModal,
    openUserProfileModal,
    sendNudge 
  } = useAppStore();

  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredFriends = friends.filter(
    (f) =>
      f.full_name.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleNudge = (e: React.MouseEvent, friendId: string) => {
    e.stopPropagation();
    const res = sendNudge(friendId);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSettleUp = (e: React.MouseEvent, friendId: string) => {
    e.stopPropagation();
    openSettleUpModal(friendId);
  };

  const handleAddSearchedUser = (usernameQuery: string) => {
    const cleanUser = usernameQuery.trim().replace(/^@/, '');
    if (!cleanUser) return;

    const res = addFriend({ email_or_username: cleanUser, full_name: cleanUser });
    if (res.success) {
      setToastMessage(`@${cleanUser} arkadaş listenize eklendi! 🎉`);
      setSearch('');
    } else {
      setToastMessage(res.error || 'Eklenirken hata oluştu.');
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-4 py-1 font-apple animate-fade-in px-1">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-4 right-4 z-50 apple-glass border border-emerald-500/40 bg-emerald-950/90 text-emerald-300 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* 1. CLEAN TOP TITLE & DESKTOP ACTION */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h1 className="text-base font-extrabold text-white">Arkadaşlar</h1>
          <p className="text-[10px] text-zinc-400 font-medium">Birlikte harcama ve borç ortaklarınız</p>
        </div>

        <button
          onClick={() => openAddFriendModal()}
          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs font-extrabold rounded-xl shadow-md shadow-emerald-500/20 transition-all apple-press flex items-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Arkadaş Ekle</span>
        </button>
      </div>

      {/* 2. SEARCH INPUT */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Kullanıcı adı veya #tag ile ara (Örn: arda#1453)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all font-apple"
        />
      </div>

      {/* Live Tag Search Result Row */}
      {search.trim().length > 0 && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-extrabold shrink-0">
              #
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-extrabold text-white truncate">
                @{search.trim().replace(/^@/, '')}{!search.includes('#') ? '#1453' : ''}
              </h4>
              <p className="text-[10px] text-emerald-300 font-medium">Arkadaş İsteği Gönder</p>
            </div>
          </div>

          <button
            onClick={() => handleAddSearchedUser(search.includes('#') ? search : `${search}#1453`)}
            className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold rounded-xl transition-all apple-press shrink-0 flex items-center gap-1 shadow-md"
          >
            <UserPlus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>İstek Gönder</span>
          </button>
        </div>
      )}

      {/* 3. GROUPED FRIENDS LIST */}
      <div className="divide-y divide-white/10 border-t border-b border-white/10">
        {filteredFriends.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 text-emerald-400 flex items-center justify-center mx-auto border border-white/10">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-white">Henüz arkadaşınız bulunmuyor</p>
              <p className="text-[11px] text-zinc-400 font-medium">
                Sağ alttaki <b className="text-emerald-400">+</b> butonuna basarak arkadaş ekleyebilir veya QR kod okutabilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          filteredFriends.map((friend) => {
            const net = getPairwiseBalance(currentUser.id, friend.id, expenses, settlements);
            const owesYou = net > 0;
            const youOwe = net < 0;
            const isSettled = net === 0;

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
                    className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">{friend.full_name}</h3>
                    <p className="text-[10px] text-zinc-400 font-mono truncate">@{friend.username}</p>
                  </div>
                </div>

                {/* Net Balance & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <div className={`text-xs font-extrabold ${
                      isSettled ? 'text-zinc-500' : owesYou ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isSettled ? 'Borç Yok' : formatCurrency(Math.abs(net), currency)}
                    </div>
                    <span className={`text-[9px] font-semibold block ${
                      isSettled ? 'text-zinc-500' : owesYou ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isSettled ? 'Dengede' : owesYou ? 'Sana Borçlu' : 'Borçlusun'}
                    </span>
                  </div>

                  {owesYou && (
                    <button
                      onClick={(e) => handleNudge(e, friend.id)}
                      className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-extrabold transition-all apple-press flex items-center gap-1"
                    >
                      <BellRing className="w-3 h-3 text-amber-400" />
                      <span>Dürt</span>
                    </button>
                  )}

                  {youOwe && (
                    <button
                      onClick={(e) => handleSettleUp(e, friend.id)}
                      className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[10px] font-extrabold transition-all apple-press flex items-center gap-1"
                    >
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      <span>Öde</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
