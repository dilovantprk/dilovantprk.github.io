'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { auth, signOut } from '@/lib/firebase';
import { Currency } from '@/types';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { KvkkModal } from '@/components/legal/KvkkModal';
import { 
  User, 
  Mail, 
  Check, 
  Copy, 
  Sparkles,
  QrCode,
  Edit3,
  Save,
  ArrowLeft,
  LogOut,
  ShieldCheck,
  Trash2,
  ChevronRight,
  CreditCard,
  Sliders,
  Lock,
  CheckCircle2,
  AlertCircle,
  Settings,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
];

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    currency, 
    setCurrency, 
    expenses, 
    settlements, 
    friends, 
    updateUserProfile,
    logoutUser,
    isFinancial2FAEnabled,
    disableFinancial2FA,
    openPinModal
  } = useAppStore();

  const [subView, setSubView] = useState<'main' | 'edit' | 'settings' | 'auth'>('main');
  const [isKvkkModalOpen, setIsKvkkModalOpen] = useState(false);
  const [hidePhoneInSearch, setHidePhoneInSearch] = useState(false);

  // Edit form state
  const [fullName, setFullName] = useState(currentUser.full_name);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [iban, setIban] = useState(currentUser.iban || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar_url);
  const [tagNumber, setTagNumber] = useState(currentUser.tag?.replace('#', '') || '1453');

  const [copiedIban, setCopiedIban] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculate Profile Completion Steps
  const completionSteps = [
    { key: 'name', label: 'Ad Soyad & Kullanıcı Adı', isDone: Boolean(currentUser.full_name && currentUser.username), weight: 30 },
    { key: 'email', label: 'E-Posta Adresi', isDone: Boolean(currentUser.email), weight: 20 },
    { key: 'iban', label: 'Banka IBAN Adresi (Hesaplaşma İçin)', isDone: Boolean(currentUser.iban && currentUser.iban.length > 5), weight: 30 },
    { key: 'phone', label: 'Telefon Numarası', isDone: Boolean(currentUser.phone && currentUser.phone.length > 5), weight: 20 },
  ];

  const totalCompletedPercentage = completionSteps.reduce((acc, step) => acc + (step.isDone ? step.weight : 0), 0);
  const isProfileComplete = totalCompletedPercentage === 100;

  const handleCopyIban = () => {
    if (currentUser.iban) {
      navigator.clipboard.writeText(currentUser.iban);
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 2000);
    }
  };

  const handleOpenEditPage = () => {
    setFullName(currentUser.full_name);
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setPhone(currentUser.phone || '');
    setIban(currentUser.iban || '');
    setAvatarUrl(currentUser.avatar_url);
    setTagNumber(currentUser.tag?.replace('#', '') || '1453');
    setSubView('edit');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTagNum = tagNumber.replace(/[^0-9]/g, '').slice(0, 4) || '1453';
    const formattedTag = `#${cleanTagNum}`;

    updateUserProfile({
      full_name: fullName.trim() || currentUser.full_name,
      username: username.trim().toLowerCase() || currentUser.username,
      email: email.trim() || currentUser.email,
      phone: phone.trim() || currentUser.phone,
      iban: iban.trim() || currentUser.iban,
      avatar_url: avatarUrl,
      tag: formattedTag,
    });
    setSubView('main');
    setToastMessage('Profil ve Özel Tag bilgileriniz güncellendi!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('SignOut notice:', err);
    }
    logoutUser();
    setSubView('auth');
  };

  // KVKK m.11 Right to be forgotten (Delete Data & Account)
  const handleDeleteAccountAndData = async () => {
    if (window.confirm('KVKK m.11 uyarınca tüm kişisel verileriniz ve hesabınız kalıcı olarak silinecektir. Emin misiniz?')) {
      try {
        if (auth.currentUser) {
          await auth.currentUser.delete();
        }
      } catch (err) {
        console.warn('Account deletion notice:', err);
      }
      logoutUser();
      setSubView('auth');
    }
  };

  if (subView === 'auth') {
    return <AuthScreen onSuccess={() => setSubView('main')} />;
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-SCREEN: EDIT PROFILE PAGE VIEW
  // -------------------------------------------------------------
  if (subView === 'edit') {
    return (
      <div className="space-y-5 py-2 font-apple animate-fade-in px-1">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <button
            onClick={() => setSubView('main')}
            className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors apple-press"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Geri</span>
          </button>

          <h1 className="text-sm font-extrabold text-white">Profili Düzenle</h1>

          <div className="w-8" />
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
              Profil Fotoğrafı Seçin
            </label>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {PRESET_AVATARS.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Avatar ${idx}`}
                  onClick={() => setAvatarUrl(url)}
                  className={`w-12 h-12 rounded-full object-cover cursor-pointer transition-all border-2 apple-press shrink-0 ${
                    avatarUrl === url
                      ? 'border-emerald-400 scale-110 shadow-lg shadow-emerald-500/30'
                      : 'border-white/20 opacity-60'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-all font-apple"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Kullanıcı Adı</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-xs font-mono text-emerald-400 font-extrabold">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl pl-8 pr-3 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Özel #Tag</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-emerald-400 font-extrabold">#</span>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="1453"
                    value={tagNumber}
                    onChange={(e) => setTagNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    className="w-full bg-white/5 border border-emerald-400/40 rounded-2xl pl-7 pr-2 py-3 text-xs font-mono font-extrabold text-emerald-300 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-1 font-medium">
              Tam Kimlik Tag'iniz: <b className="text-emerald-400 font-mono">@{username}#{tagNumber.padEnd(4, '0')}</b>
            </p>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">E-Posta Adresi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-all font-apple"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Telefon Numarası</label>
              <input
                type="text"
                value={phone}
                placeholder="Örn: +90 532 000 11 22"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Banka IBAN Adresiniz</label>
              <input
                type="text"
                placeholder="TR00 0000 0000 0000 0000 0000 00"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white font-mono font-bold placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Değişiklikleri Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-SCREEN: SETTINGS PAGE VIEW (AYARLAR SAYFASI)
  // -------------------------------------------------------------
  if (subView === 'settings') {
    return (
      <div className="space-y-5 py-2 font-apple animate-fade-in px-1">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <button
            onClick={() => setSubView('main')}
            className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors apple-press"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Geri</span>
          </button>

          <h1 className="text-sm font-extrabold text-white">Uygulama & Hesap Ayarları</h1>

          <div className="w-8" />
        </div>

        {/* KVKK Legal Policy Modal */}
        <KvkkModal isOpen={isKvkkModalOpen} onClose={() => setIsKvkkModalOpen(false)} />

        {/* SECTION 1: UYGULAMA TERCİHLERİ */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-1 block">
            Uygulama Tercihleri
          </span>

          <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-2">
            <label className="block text-xs font-bold text-white">
              Varsayılan Para Birimi
            </label>

            <div className="flex items-center gap-1.5 bg-black/50 p-1.5 rounded-2xl border border-white/10">
              {(['TRY', 'USD', 'EUR'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all apple-press flex items-center justify-center gap-1 ${
                    currency === curr
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{curr === 'TRY' ? '₺ TRY' : curr === 'USD' ? '$ USD' : '€ EUR'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: GİZLİLİK VE GÜVENLİK */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-1 block">
            Gizlilik ve Güvenlik
          </span>

          <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-3 divide-y divide-white/10">
            {/* Phone Privacy Toggle */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white">Numaramı Rehberde Gizle</span>
                <span className="block text-[10px] text-zinc-400 font-medium">Aramalarda rehber eşleşmesini engeller</span>
              </div>

              {/* iOS Switch Toggle */}
              <button
                onClick={() => setHidePhoneInSearch(!hidePhoneInSearch)}
                className={`w-11 h-6 rounded-full transition-all relative p-0.5 apple-press shrink-0 ${
                  hidePhoneInSearch ? 'bg-emerald-400' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    hidePhoneInSearch ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 2FA Financial Data Encryption Toggle */}
            <div className="flex items-center justify-between gap-3 pt-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="block text-xs font-bold text-white">2FA Borç & Tutar Şifreleme</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md">PIN</span>
                </div>
                <span className="block text-[10px] text-zinc-400 font-medium">Borç miktarları ve açıklamaları PIN ile kilitlenir</span>
              </div>

              <button
                onClick={() => {
                  if (isFinancial2FAEnabled) {
                    disableFinancial2FA();
                  } else {
                    openPinModal();
                  }
                }}
                className={`w-11 h-6 rounded-full transition-all relative p-0.5 apple-press shrink-0 ${
                  isFinancial2FAEnabled ? 'bg-emerald-400' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    isFinancial2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* KVKK Policy Reader */}
            <button
              onClick={() => setIsKvkkModalOpen(true)}
              className="w-full pt-3 flex items-center justify-between text-zinc-300 hover:text-white transition-colors apple-press group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-xs">KVKK Aydınlatma Metni & Politikası</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-[11px]">
                <span>Görüntüle</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* SECTION 3: DANGER ZONE - DELETE ACCOUNT */}
        <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-xs font-bold text-rose-300">Hesabımı ve Verilerimi Sil</span>
            <span className="block text-[10px] text-rose-400/80 font-medium">KVKK m.11 uyarınca tüm verileriniz silinir</span>
          </div>

          <button
            onClick={handleDeleteAccountAndData}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-extrabold transition-all apple-press shrink-0 shadow-md"
          >
            Kalıcı Sil
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN PROFILE VIEW (HERO CARD + STATS + IBAN + AYARLAR ENTRY)
  // -------------------------------------------------------------
  return (
    <div className="space-y-5 py-2 font-apple animate-fade-in px-1">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-4 right-4 z-50 apple-glass border border-emerald-500/40 bg-emerald-950/90 text-emerald-300 px-3.5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO USER CARD */}
      <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <h1 className="text-base font-extrabold text-white truncate">{currentUser.full_name}</h1>
              {isProfileComplete && (
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 rounded-full shrink-0">
                  Onaylı
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-emerald-400">
              @{currentUser.username}<span className="text-emerald-300 font-extrabold">{currentUser.tag || '#1453'}</span>
            </p>
            <p className="text-[11px] text-zinc-400 font-medium truncate mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <button
          onClick={handleOpenEditPage}
          className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-2xl text-[11px] font-bold transition-all apple-press shrink-0 flex items-center gap-1.5 shadow-md"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Düzenle</span>
        </button>
      </div>

      {/* 2. PROFILE COMPLETION WIZARD CARD */}
      {!isProfileComplete && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-black border-2 border-emerald-500/40 space-y-3 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <h3 className="text-xs font-extrabold text-white">Hesabınızı Tamamlayın</h3>
            </div>
            <span className="text-xs font-extrabold font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              %{totalCompletedPercentage} Tamamlandı
            </span>
          </div>

          <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${totalCompletedPercentage}%` }}
            />
          </div>

          <div className="space-y-1.5 pt-1">
            {completionSteps.map((step) => (
              <div
                key={step.key}
                onClick={handleOpenEditPage}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer apple-press flex items-center justify-between gap-2 ${
                  step.isDone
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-zinc-300'
                    : 'bg-white/5 border-amber-500/40 text-amber-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {step.isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                  )}
                  <span className={`text-xs font-bold truncate ${step.isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {step.label}
                  </span>
                </div>

                {!step.isDone && (
                  <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-lg shrink-0 flex items-center gap-1">
                    <span>Ekle</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ACTIVITY STATS BAR */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
        <div>
          <span className="text-lg font-extrabold text-white">{expenses.length}</span>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Harcama</p>
        </div>
        <div>
          <span className="text-lg font-extrabold text-teal-300">{settlements.length}</span>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Hesaplaşma</p>
        </div>
        <div>
          <span className="text-lg font-extrabold text-emerald-400">{friends.length}</span>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Arkadaş</p>
        </div>
      </div>

      {/* 4. BANKA & IBAN BİLGİLERİ */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-1 block">
          Banka & Hesap Bilgileri
        </span>

        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Kayıtlı IBAN</span>
              <span className="text-xs font-mono font-bold text-white truncate block">
                {currentUser.iban || 'Henüz IBAN eklenmedi'}
              </span>
            </div>
          </div>

          {currentUser.iban ? (
            <button
              onClick={handleCopyIban}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/15 rounded-xl text-[11px] font-bold transition-all apple-press shrink-0 flex items-center gap-1"
            >
              {copiedIban ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIban ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          ) : (
            <button
              onClick={handleOpenEditPage}
              className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-[11px] font-bold transition-all apple-press shrink-0 flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>IBAN Ekle</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. DEDICATED SETTINGS & PRIVACY NAVIGATION BUTTON */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-1 block">
          Uygulama Ayarları
        </span>

        <button
          onClick={() => setSubView('settings')}
          className="w-full p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-all apple-press group shadow-xl"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="block text-xs font-extrabold text-white truncate">Uygulama & Hesap Ayarları</span>
              <span className="block text-[10px] text-zinc-400 font-medium truncate">Para birimi, 2FA şifreleme, gizlilik ve KVKK</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-xs shrink-0">
            <span>Ayarlara Git</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* 6. OTURUMU KAPAT */}
      <div className="pt-2">
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-white/10 hover:border-rose-500/30 rounded-2xl text-xs font-extrabold transition-all apple-press flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </div>
  );
};
