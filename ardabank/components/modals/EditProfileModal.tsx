'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { X, UserCheck, Sparkles, Check, QrCode, Mail, Phone, User, Camera } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
];

export const EditProfileModal: React.FC = () => {
  const { 
    currentUser, 
    isEditProfileModalOpen, 
    closeEditProfileModal, 
    updateUserProfile 
  } = useAppStore();

  const [fullName, setFullName] = useState(currentUser.full_name);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [iban, setIban] = useState(currentUser.iban || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar_url);
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    if (isEditProfileModalOpen) {
      setFullName(currentUser.full_name);
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
      setIban(currentUser.iban || '');
      setAvatarUrl(currentUser.avatar_url);
    }
  }, [currentUser, isEditProfileModalOpen]);

  if (!isEditProfileModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserProfile({
      full_name: fullName.trim() || currentUser.full_name,
      username: username.trim().toLowerCase() || currentUser.username,
      email: email.trim() || currentUser.email,
      phone: phone.trim() || currentUser.phone,
      iban: iban.trim() || currentUser.iban,
      avatar_url: avatarUrl,
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      closeEditProfileModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md font-apple">
      <div className="apple-glass w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] border border-white/15 p-6 text-zinc-100 shadow-2xl no-scrollbar">
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Profili Düzenle</h2>
              <p className="text-[11px] text-zinc-400 font-medium">Kişisel bilgilerinizi güncelleyin</p>
            </div>
          </div>
          <button
            onClick={closeEditProfileModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors apple-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {successToast && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Profil bilgileriniz başarıyla güncellendi!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Profil Fotoğrafı Seçin</span>
            </label>

            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              {PRESET_AVATARS.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Avatar ${idx}`}
                  onClick={() => setAvatarUrl(url)}
                  className={`w-11 h-11 rounded-full object-cover cursor-pointer transition-all border-2 apple-press shrink-0 ${
                    avatarUrl === url
                      ? 'border-emerald-400 scale-110 shadow-lg shadow-emerald-500/30'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>Ad Soyad</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Kullanıcı Adı</label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-xs font-mono text-emerald-400">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl pl-8 pr-4 py-2.5 text-xs text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>E-Posta Adresi</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Telefon Numarası</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* IBAN */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Banka IBAN Adresiniz</span>
            </label>
            <input
              type="text"
              placeholder="TR00 0000 0000 0000 0000 0000 00"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white font-mono font-bold placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Action Sheet Buttons Stack */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Değişiklikleri Kaydet</span>
            </button>

            <button
              type="button"
              onClick={closeEditProfileModal}
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
