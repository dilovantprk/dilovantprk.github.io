'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { getPairwiseBalance } from '@/lib/settlement-algorithm';
import { formatCurrency, formatDate } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { 
  X, 
  Wallet, 
  Send, 
  ShieldAlert, 
  Copy, 
  Check, 
  QrCode,
  PieChart,
  CheckCircle2,
  Receipt
} from 'lucide-react';

export const SettleUpModal: React.FC = () => {
  const { 
    currentUser, 
    friends, 
    expenses, 
    settlements, 
    currency, 
    isSettleUpModalOpen, 
    closeSettleUpModal, 
    settleUpTargetUserId, 
    addSettlement 
  } = useAppStore();

  const [selectedFriendId, setSelectedFriendId] = useState<string>('');
  const [settleMode, setSettleMode] = useState<'full' | 'partial'>('full');
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [copiedIban, setCopiedIban] = useState(false);

  useEffect(() => {
    if (settleUpTargetUserId) {
      setSelectedFriendId(settleUpTargetUserId);
    } else if (friends.length > 0) {
      setSelectedFriendId(friends[0].id);
    }
  }, [settleUpTargetUserId, friends, isSettleUpModalOpen]);

  const targetFriend = friends.find((f) => f.id === selectedFriendId);
  const netBalance = targetFriend
    ? getPairwiseBalance(currentUser.id, targetFriend.id, expenses, settlements)
    : 0;

  const totalOwed = Math.abs(netBalance);

  // Shared expenses with selected friend
  const sharedExpenses = expenses.filter(
    (e) =>
      e.status !== 'rejected' &&
      ((e.paid_by === currentUser.id && e.splits.some((s) => s.user_id === selectedFriendId)) ||
        (e.paid_by === selectedFriendId && e.splits.some((s) => s.user_id === currentUser.id)))
  );

  useEffect(() => {
    if (settleMode === 'full') {
      setAmount(totalOwed > 0 ? totalOwed.toString() : '');
      setSelectedExpenseId(null);
    } else {
      setAmount('');
    }
  }, [selectedFriendId, netBalance, settleMode, totalOwed]);

  if (!isSettleUpModalOpen) return null;

  const owesYou = netBalance > 0;
  const youOwe = netBalance < 0;

  const handleCopyIban = () => {
    const targetIban = targetFriend?.iban || 'TR64 0006 2000 0000 1122 3344 55';
    navigator.clipboard.writeText(targetIban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleSelectSpecificExpense = (expId: string, owedAmt: number) => {
    setSelectedExpenseId(expId);
    setAmount(owedAmt.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!selectedFriendId || isNaN(numAmount) || numAmount <= 0) return;

    const selectedExp = sharedExpenses.find((exp) => exp.id === selectedExpenseId);
    const defaultNote = selectedExp 
      ? `"${selectedExp.description}" Harcaması Ödemesi` 
      : settleMode === 'full' 
      ? 'Tüm Borç Kapatma Ödemesi' 
      : 'Kısmi Harcama Ödemesi';

    addSettlement({
      payerId: currentUser.id,
      receiverId: selectedFriendId,
      amount: numAmount,
      note: note.trim() || defaultNote,
    });

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#10b981', '#14b8a6', '#34d399'],
      });
    } catch (err) {}

    closeSettleUpModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="apple-glass w-full max-w-md rounded-t-[32px] sm:rounded-[32px] border border-white/15 p-6 text-zinc-100 shadow-2xl font-apple max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Hesap Kapat & Ödeme Yap</h2>
              <p className="text-[11px] text-zinc-400 font-medium">Tüm borcu öde veya harcamayı kısmi kapat</p>
            </div>
          </div>
          <button
            onClick={closeSettleUpModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors apple-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Receiver Select */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Alacaklı Arkadaş</label>
            <select
              value={selectedFriendId}
              onChange={(e) => setSelectedFriendId(e.target.value)}
              className="w-full bg-zinc-900/90 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-400"
            >
              {friends.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.full_name} (@{f.username})
                </option>
              ))}
            </select>
          </div>

          {targetFriend && (
            <div className="space-y-3">
              {/* Net Balance Card */}
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                netBalance === 0
                  ? 'bg-white/5 border-white/10'
                  : owesYou
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : 'bg-rose-950/30 border-rose-500/40'
              }`}>
                <div className="flex items-center gap-3">
                  <img
                    src={targetFriend.avatar_url}
                    alt={targetFriend.full_name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{targetFriend.full_name}</h4>
                    <p className={`text-[11px] font-semibold ${owesYou ? 'text-emerald-400' : youOwe ? 'text-rose-400' : 'text-zinc-500'}`}>
                      {youOwe ? 'Toplam Alacaklı Taraf' : owesYou ? 'Sana Borçlu' : 'Borç Bulunmuyor'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-sm font-extrabold ${owesYou ? 'text-emerald-400' : youOwe ? 'text-rose-400' : 'text-zinc-500'}`}>
                    {formatCurrency(totalOwed, currency)}
                  </div>
                </div>
              </div>

              {/* Receiver's Registered IBAN Display Card */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                      {targetFriend.full_name.split(' ')[0]} Alıcı IBAN Hesabı
                    </span>
                    <span className="text-xs font-mono font-bold text-white tracking-tight truncate block">
                      {targetFriend.iban || 'TR64 0006 2000 0000 1122 3344 55'}
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

              {/* Ödeme Modu Seçici (Tüm Borç vs Kısmi Ödeme) */}
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Ödeme Seçeneği
                </label>

                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setSettleMode('full')}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 apple-press ${
                      settleMode === 'full' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tüm Borcu Kapat ({formatCurrency(totalOwed, currency)})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettleMode('partial')}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 apple-press ${
                      settleMode === 'partial' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <PieChart className="w-3.5 h-3.5" />
                    <span>Kısmi Ödeme Yap</span>
                  </button>
                </div>
              </div>

              {/* Specific Shared Expenses List for Partial Settlement */}
              {settleMode === 'partial' && sharedExpenses.length > 0 && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    Ödenecek Harcamayı Seçin (İsteğe Bağlı)
                  </label>

                  <div className="space-y-1 max-h-36 overflow-y-auto no-scrollbar border-t border-b border-white/10 py-1">
                    {sharedExpenses.map((exp) => {
                      const isSelected = selectedExpenseId === exp.id;
                      const split = exp.splits.find((s) => s.user_id === currentUser.id);
                      const owedAmt = split ? split.amount_owed : exp.amount;

                      return (
                        <div
                          key={exp.id}
                          onClick={() => handleSelectSpecificExpense(exp.id, owedAmt)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 apple-press ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                              : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Receipt className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <div className="min-w-0">
                              <span className="truncate block font-bold">{exp.description}</span>
                              <span className="text-[9px] text-zinc-400 block">{formatDate(exp.created_at)}</span>
                            </div>
                          </div>

                          <span className="font-extrabold text-emerald-400 shrink-0">
                            {formatCurrency(owedAmt, currency)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Ödenecek Tutar ({currency})
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm font-extrabold text-emerald-400 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-all font-apple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Açıklama / Dekont Notu</label>
            <input
              type="text"
              placeholder="Örn: Havale gönderildi..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all font-apple"
            />
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Ödeme bildirimi alacaklı arkadaşınıza iletilir. Onayladığında borcunuz düşülür.</span>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-3.5 text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl shadow-lg shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Ödemeyi Bildir ({settleMode === 'full' ? 'Tüm Borç' : 'Kısmi Ödeme'})</span>
            </button>

            <button
              type="button"
              onClick={closeSettleUpModal}
              className="w-full py-3 text-xs font-bold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all apple-press"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
