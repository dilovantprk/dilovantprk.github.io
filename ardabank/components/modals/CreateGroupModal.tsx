'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Users, Check, AlertCircle } from 'lucide-react';

export const CreateGroupModal: React.FC = () => {
  const { 
    currentUser, 
    friends, 
    isCreateGroupModalOpen, 
    closeCreateGroupModal, 
    createGroup 
  } = useAppStore();

  const [groupName, setGroupName] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isCreateGroupModalOpen) return null;

  const toggleMember = (id: string) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter((mId) => mId !== id));
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!groupName.trim()) {
      setError('Lütfen grup adını girin.');
      return;
    }

    createGroup({
      name: groupName.trim(),
      memberIds: selectedMemberIds,
    });

    setGroupName('');
    setSelectedMemberIds([]);
    closeCreateGroupModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="apple-glass w-full max-w-md rounded-t-[32px] sm:rounded-[32px] border border-white/15 shadow-2xl p-6 text-zinc-100">
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white font-apple">Yeni Grup Oluştur</h2>
              <p className="text-xs text-zinc-400 font-medium">Ortak ev, tatil veya etkinlik grubu</p>
            </div>
          </div>
          <button
            onClick={closeCreateGroupModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors apple-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 font-apple">Grup Adı</label>
            <input
              type="text"
              placeholder="Örn: Ev Arkadaşları 🏠, Balkan Tatili ✈️"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-all font-apple"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-apple">
              Grup Üyeleri Seçin ({selectedMemberIds.length + 1} Kişi)
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto bg-white/5 p-2.5 rounded-2xl border border-white/10">
              {/* Current user fixed */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-500/20 border border-purple-400/40">
                <div className="w-4 h-4 rounded-full bg-purple-400 text-black flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <img src={currentUser.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover border border-white/20" />
                <span className="text-xs font-bold text-white font-apple">Sen ({currentUser.full_name})</span>
              </div>

              {friends.map((f) => {
                const isSelected = selectedMemberIds.includes(f.id);
                return (
                  <div
                    key={f.id}
                    onClick={() => toggleMember(f.id)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/10 border-purple-400/40'
                        : 'bg-transparent border-white/5 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-purple-400 border-purple-300 text-black' : 'border-white/30 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <img src={f.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover border border-white/20" />
                    <span className="text-xs font-medium text-zinc-200 font-apple">{f.full_name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={closeCreateGroupModal}
              className="flex-1 py-3 text-xs font-bold text-zinc-400 hover:text-white bg-white/10 hover:bg-white/15 rounded-full transition-all apple-press"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300 rounded-full shadow-lg shadow-purple-500/30 transition-all apple-press"
            >
              Grup Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
