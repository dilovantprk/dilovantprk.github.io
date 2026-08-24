'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { ExpenseCategory, SplitMethod } from '@/types';
import { CATEGORY_DETAILS } from '@/lib/utils';
import { X, Check, AlertCircle, Percent, DollarSign, Users, Sparkles, Calendar, Plus, Wallet } from 'lucide-react';

export const AddExpenseModal: React.FC = () => {
  const { 
    currentUser, 
    friends, 
    currency, 
    isAddExpenseModalOpen, 
    closeAddExpenseModal, 
    selectedGroupId,
    addExpense 
  } = useAppStore();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  // Paid by is strictly fixed to currentUser.id
  const paidBy = currentUser.id;
  const [category, setCategory] = useState<ExpenseCategory>('dining');
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal');
  const [dueDate, setDueDate] = useState<string>('');
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [customValues, setCustomValues] = useState<Record<string, number>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setParticipantIds([currentUser.id, ...friends.map((f) => f.id)]);
  }, [friends, currentUser.id, isAddExpenseModalOpen]);

  if (!isAddExpenseModalOpen) return null;

  const availableUsers = [currentUser, ...friends];

  const handleToggleParticipant = (userId: string) => {
    if (participantIds.includes(userId)) {
      if (participantIds.length <= 1) {
        setErrorMessage('En az bir katılımcı seçilmelidir.');
        return;
      }
      setParticipantIds(participantIds.filter((id) => id !== userId));
    } else {
      setParticipantIds([...participantIds, userId]);
    }
  };

  const handleCustomValueChange = (userId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setCustomValues((prev) => ({
      ...prev,
      [userId]: num,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const numAmount = parseFloat(amount);
    
    // ONLY REQUIRED FIELD IS AMOUNT!
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage('Lütfen geçerli bir borç/harcama tutarı girin.');
      return;
    }

    // Default description if left empty
    const finalDescription = description.trim() || `${CATEGORY_DETAILS[category]?.label || 'Harcama'}`;

    const result = addExpense({
      description: finalDescription,
      amount: numAmount,
      paidBy: currentUser.id, // Strictly fixed to current user
      groupId: selectedGroupId || null,
      category,
      splitMethod,
      participantIds,
      dueDate: dueDate || undefined,
      customSplitValues: customValues,
    });

    if (!result.success && result.error) {
      setErrorMessage(result.error);
    } else {
      setDescription('');
      setAmount('');
      setDueDate('');
      setCustomValues({});
      closeAddExpenseModal();
    }
  };

  const numAmount = parseFloat(amount) || 0;
  const equalPerPerson = participantIds.length ? (numAmount / participantIds.length).toFixed(2) : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md font-apple">
      <div className="apple-glass w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-[32px] sm:rounded-[36px] border border-white/20 p-6 text-zinc-100 shadow-2xl space-y-4">
        {/* iOS Drag Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Harcama / Borç Ekleyin</h2>
              <p className="text-[11px] text-zinc-400 font-medium">Sadece borç tutarını girerek anında kaydedin</p>
            </div>
          </div>
          <button
            onClick={closeAddExpenseModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors apple-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payer Info Strip */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Ödeyen Kişi</span>
                <span className="text-xs font-extrabold text-white">
                  {currentUser.full_name} (@{currentUser.username})
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-400 text-black rounded-full">
              Sen Ödedin
            </span>
          </div>

          {/* 1. TOP & ONLY REQUIRED FIELD: BORÇ MİKTARI / TUTAR (TRY) */}
          <div className="p-4 rounded-3xl bg-emerald-950/30 border-2 border-emerald-400/50 space-y-1.5 shadow-lg">
            <label className="block text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
              <span>Borç Miktarı / Tutar ({currency}) *</span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md">Zorunlu Alan</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-2xl font-extrabold text-emerald-400">
                {currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : '€'}
              </span>
              <input
                type="number"
                step="0.01"
                required
                autoFocus
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/60 border border-emerald-400/40 rounded-2xl pl-10 pr-4 py-3 text-2xl font-extrabold text-emerald-300 placeholder-zinc-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all font-mono"
              />
            </div>
          </div>

          {/* 2. OPTIONAL HARCAMA AÇIKLAMASI */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Harcama Açıklaması <span className="text-zinc-500 font-normal">(İsteğe Bağlı)</span>
            </label>
            <input
              type="text"
              placeholder="Örn: Akşam Yemeği, Kahve, Market..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* 3. OPTIONAL KATEGORİ & SON ÖDEME TARİHİ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full bg-zinc-900/90 border border-white/15 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-apple"
              >
                {Object.entries(CATEGORY_DETAILS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Son Ödeme Tarihi <span className="text-zinc-500 font-normal">(İsteğe Bağlı)</span></span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-3 py-2.5 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-400 font-apple"
              />
            </div>
          </div>

          {/* 4. BÖLÜŞÜM YÖNTEMİ */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Bölüşüm Yöntemi</label>
            <div className="grid grid-cols-3 gap-1 bg-white/10 p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setSplitMethod('equal')}
                className={`py-1.5 px-3 text-xs font-extrabold rounded-full flex items-center justify-center gap-1 transition-all apple-press ${
                  splitMethod === 'equal'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Eşit</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitMethod('percentage')}
                className={`py-1.5 px-3 text-xs font-extrabold rounded-full flex items-center justify-center gap-1 transition-all apple-press ${
                  splitMethod === 'percentage'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Percent className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Yüzde</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitMethod('exact')}
                className={`py-1.5 px-3 text-xs font-extrabold rounded-full flex items-center justify-center gap-1 transition-all apple-press ${
                  splitMethod === 'exact'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Kesin Tutar</span>
              </button>
            </div>
          </div>

          {/* PARTICIPANTS SELECTOR */}
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
              <span>Bölüşülecek Arkadaşların ({participantIds.length} Kişi)</span>
              {splitMethod === 'equal' && numAmount > 0 && (
                <span className="text-emerald-400 font-extrabold">Kişi Başı: ~{equalPerPerson} {currency}</span>
              )}
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {availableUsers.map((u) => {
                const isSelected = participantIds.includes(u.id);

                return (
                  <div
                    key={u.id}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white/10 border-emerald-400/40'
                        : 'bg-transparent border-white/5 opacity-50'
                    }`}
                  >
                    <div
                      onClick={() => handleToggleParticipant(u.id)}
                      className="flex items-center gap-2.5 cursor-pointer flex-1"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-emerald-400 border-emerald-300 text-black'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <img
                        src={u.avatar_url}
                        alt={u.full_name}
                        className="w-6 h-6 rounded-full object-cover border border-white/20"
                      />
                      <span className="text-xs font-medium text-white">
                        {u.id === currentUser.id ? `Sen (${u.full_name})` : u.full_name}
                      </span>
                    </div>

                    {isSelected && splitMethod === 'percentage' && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          placeholder="0"
                          value={customValues[u.id] ?? ''}
                          onChange={(e) => handleCustomValueChange(u.id, e.target.value)}
                          className="w-14 bg-black border border-white/20 rounded-xl px-2 py-0.5 text-xs text-right font-mono text-emerald-400 focus:outline-none"
                        />
                        <span className="text-xs text-zinc-500">%</span>
                      </div>
                    )}

                    {isSelected && splitMethod === 'exact' && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={customValues[u.id] ?? ''}
                          onChange={(e) => handleCustomValueChange(u.id, e.target.value)}
                          className="w-16 bg-black border border-white/20 rounded-xl px-2 py-0.5 text-xs text-right font-mono text-emerald-400 focus:outline-none"
                        />
                        <span className="text-xs text-zinc-500">{currency}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Sheet Buttons */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all apple-press flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Harcamayı / Borcu Kaydet</span>
            </button>

            <button
              type="button"
              onClick={closeAddExpenseModal}
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
