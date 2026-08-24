'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getPairwiseBalance } from '@/lib/settlement-algorithm';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  BellRing, 
  ArrowUpRight, 
  Plus, 
  History 
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { 
    currentUser, 
    friends, 
    expenses, 
    settlements, 
    currency, 
    isUserProfileModalOpen, 
    closeUserProfileModal, 
    selectedUserProfileId,
    openSettleUpModal,
    openAddExpenseModal,
    sendNudge 
  } = useAppStore();

  const [copiedIban, setCopiedIban] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isUserProfileModalOpen || !selectedUserProfileId) return null;

  const friend = friends.find((f) => f.id === selectedUserProfileId);
  if (!friend) return null;

  const netBalance = getPairwiseBalance(currentUser.id, friend.id, expenses, settlements);
  const owesYou = netBalance > 0;
  const youOwe = netBalance < 0;
  const isSettled = netBalance === 0;

  // Shared expenses between currentUser and this friend
  const sharedExpenses = expenses.filter(
    (e) =>
      e.status !== 'rejected' &&
      ((e.paid_by === currentUser.id && e.splits.some((s) => s.user_id === friend.id)) ||
        (e.paid_by === friend.id && e.splits.some((s) => s.user_id === currentUser.id)))
  );

  // Shared settlements between currentUser and this friend
  const sharedSettlements = settlements.filter(
    (s) =>
      s.status !== 'rejected' &&
      ((s.payer_id === currentUser.id && s.receiver_id === friend.id) ||
        (s.payer_id === friend.id && s.receiver_id === currentUser.id))
  );

  const handleCopyIban = () => {
    const ibanToCopy = friend.iban || 'TR64 0006 2000 0000 1122 3344 55';
    navigator.clipboard.writeText(ibanToCopy);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleSendNudge = () => {
    const res = sendNudge(friend.id);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenSettleUp = () => {
    closeUserProfileModal();
    openSettleUpModal(friend.id);
  };

  const handleOpenAddExpense = () => {
    closeUserProfileModal();
    openAddExpenseModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md font-apple">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-4 right-4 z-50 apple-glass border border-amber-500/40 bg-amber-950/90 text-amber-300 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      <div className="apple-glass w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] border border-white/15 p-6 text-zinc-100 shadow-2xl no-scrollbar">
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Top Close Control */}
        <div className="flex items-center justify-end">
          <button
            onClick={closeUserProfileModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors apple-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Friend Avatar & Main Info */}
        <div className="mt-1 flex items-center gap-3.5">
          <img
            src={friend.avatar_url}
            alt={friend.full_name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-extrabold text-white truncate">{friend.full_name}</h2>
            <p className="text-xs font-mono text-emerald-400">@{friend.username}</p>
            <p className="text-[11px] text-zinc-400 font-medium truncate mt-1">{friend.email}</p>
          </div>
        </div>

        {/* Pairwise Net Balance Indicator */}
        <div className={`mt-4 p-3.5 rounded-2xl border flex items-center justify-between ${
          isSettled
            ? 'bg-white/5 border-white/10'
            : owesYou
            ? 'bg-emerald-950/30 border-emerald-500/40'
            : 'bg-rose-950/30 border-rose-500/40'
        }`}>
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Aramızdaki Bakiye
            </span>
            <span className={`text-xs font-extrabold block mt-0.5 ${
              isSettled ? 'text-zinc-400' : owesYou ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isSettled ? 'Hesaplar Dengede' : owesYou ? 'Sana Borçlu' : 'Borçlusun'}
            </span>
          </div>

          <div className={`text-base font-extrabold ${
            isSettled ? 'text-zinc-400' : owesYou ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {formatCurrency(Math.abs(netBalance), currency)}
          </div>
        </div>

        {/* IBAN Display Card */}
        <div className="mt-3 p-3 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                {friend.full_name.split(' ')[0]} IBAN Hesabı
              </span>
              <span className="text-xs font-mono font-bold text-white tracking-tight truncate block">
                {friend.iban || 'TR64 0006 2000 0000 1122 3344 55'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyIban}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/15 rounded-xl text-[11px] font-bold transition-all apple-press shrink-0 flex items-center gap-1"
          >
            {copiedIban ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedIban ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>

        {/* Shared History Section */}
        <div className="mt-4 space-y-2">
          <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5 px-1">
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ortak İşlem Geçmişi ({sharedExpenses.length + sharedSettlements.length})</span>
          </h3>

          <div className="divide-y divide-white/10 border-t border-b border-white/10 max-h-44 overflow-y-auto pr-1 no-scrollbar">
            {sharedExpenses.length === 0 && sharedSettlements.length === 0 ? (
              <div className="py-4 text-center text-zinc-500 text-xs font-medium">
                Henüz ortak harcama bulunmuyor.
              </div>
            ) : (
              <>
                {sharedExpenses.map((exp) => (
                  <div key={exp.id} className="py-2.5 px-1 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{exp.description}</h4>
                      <p className="text-[10px] text-zinc-400 font-medium">
                        {exp.paid_by === currentUser.id ? 'Sen ödedin' : `${friend.full_name.split(' ')[0]} ödedi`} • {formatDate(exp.date || exp.created_at)}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-white shrink-0">
                      {formatCurrency(exp.amount, exp.currency)}
                    </span>
                  </div>
                ))}

                {sharedSettlements.map((set) => (
                  <div key={set.id} className="py-2.5 px-1 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-teal-300 truncate">Hesap Kapatma Ödemesi</h4>
                      <p className="text-[10px] text-zinc-400 font-medium">
                        {set.payer_id === currentUser.id ? 'Sen gönderdin' : `${friend.full_name.split(' ')[0]} gönderdi`} • {formatDate(set.created_at)}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-teal-300 shrink-0">
                      {formatCurrency(set.amount, set.currency)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-2 mt-4 pt-3 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2">
            {owesYou && (
              <button
                onClick={handleSendNudge}
                className="py-3 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold rounded-2xl transition-all apple-press flex items-center justify-center gap-1.5"
              >
                <BellRing className="w-4 h-4 text-amber-400" />
                <span>Borç Dürt</span>
              </button>
            )}

            {youOwe && (
              <button
                onClick={handleOpenSettleUp}
                className="py-3 px-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs font-extrabold rounded-2xl shadow-md shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                <span>Borç Öde</span>
              </button>
            )}

            <button
              onClick={handleOpenAddExpense}
              className="py-3 px-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-extrabold rounded-2xl transition-all apple-press flex items-center justify-center gap-1.5 col-span-1"
            >
              <Plus className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Harcama Bölüş</span>
            </button>
          </div>

          <button
            type="button"
            onClick={closeUserProfileModal}
            className="w-full py-3 text-xs font-bold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all apple-press"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
