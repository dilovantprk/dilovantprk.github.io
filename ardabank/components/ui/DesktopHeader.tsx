'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Currency, TabType } from '@/types';
import { 
  Bell, 
  Lock, 
  Unlock, 
  PlusCircle, 
  ShieldCheck,
  UserPlus
} from 'lucide-react';

const TAB_TITLES: Record<TabType, { title: string; subtitle: string }> = {
  dashboard: { title: 'Özet Paneli', subtitle: 'Canlı bakiye, onaylar ve anlık hareketler' },
  friends: { title: 'Arkadaşlar & Rehber', subtitle: 'Birlikte harcama ve borç ortaklarınız' },
  activity: { title: 'Hareket Akışı', subtitle: 'Tüm harcama ve ödemelerin kronolojik dökümü' },
  notifications: { title: 'Bildirim Merkezi', subtitle: 'Onay bekleyen işlemler ve çapraz borç dengelemeleri' },
  profile: { title: 'Profil & Ayarlar', subtitle: 'Hesap bilgileri, 2FA güvenlik ve gizlilik tercihleri' },
};

export const DesktopHeader: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currency, 
    setCurrency, 
    expenses, 
    settlements, 
    nudges, 
    crossSettlementOffers,
    currentUser,
    isFinancial2FAEnabled,
    isFinancialUnlocked,
    openPinModal,
    lockFinancialData,
    openAddExpenseModal,
    openAddFriendModal
  } = useAppStore();

  const pendingExpenses = expenses.filter((e) => {
    if (e.paid_by === currentUser.id) return false;
    const mySplit = e.splits.find((s) => s.user_id === currentUser.id);
    return mySplit && mySplit.status === 'pending';
  });

  const pendingSettlements = settlements.filter(
    (s) => s.receiver_id === currentUser.id && s.status === 'pending'
  );

  const pendingCrossOffers = crossSettlementOffers.filter(
    (o) => o.status === 'pending' && o.participants.some((p) => p.id === currentUser.id)
  );

  const myNudges = nudges.filter((n) => n.to_user_id === currentUser.id);
  const totalNotifications = pendingExpenses.length + pendingSettlements.length + myNudges.length + pendingCrossOffers.length;

  const currentTabInfo = TAB_TITLES[activeTab] || { title: 'AradaPay', subtitle: 'Sosyal Harcama Platformu' };

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl shrink-0 font-apple z-30">
      {/* 1. Active Page Title & Subtitle */}
      <div>
        <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>{currentTabInfo.title}</span>
        </h1>
        <p className="text-[11px] text-zinc-400 font-medium">
          {currentTabInfo.subtitle}
        </p>
      </div>

      {/* 2. Right Control Actions */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 text-[11px] font-extrabold">
          {(['TRY', 'USD', 'EUR'] as Currency[]).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 rounded-xl transition-all apple-press ${
                currency === curr
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {curr === 'TRY' ? '₺ TRY' : curr === 'USD' ? '$ USD' : '€ EUR'}
            </button>
          ))}
        </div>

        {/* 2FA Privacy Lock Button */}
        {isFinancial2FAEnabled ? (
          <button
            onClick={isFinancialUnlocked ? lockFinancialData : openPinModal}
            className={`px-3 py-1.5 rounded-2xl text-[11px] font-extrabold border transition-all apple-press flex items-center gap-1.5 shadow-sm ${
              isFinancialUnlocked
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30 animate-pulse'
            }`}
            title={isFinancialUnlocked ? 'Finansal verileri kilitle' : 'PIN ile verileri aç'}
          >
            {isFinancialUnlocked ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>2FA Açık</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Kilitli (PIN)</span>
              </>
            )}
          </button>
        ) : (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL</span>
          </div>
        )}

        {/* Friends Shortcut if on Friends tab, or Quick Expense */}
        {activeTab === 'friends' ? (
          <button
            onClick={() => openAddFriendModal()}
            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs font-extrabold rounded-2xl shadow-md shadow-emerald-500/20 transition-all apple-press flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Arkadaş Ekle</span>
          </button>
        ) : (
          <button
            onClick={() => openAddExpenseModal()}
            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs font-extrabold rounded-2xl shadow-md shadow-emerald-500/20 transition-all apple-press flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Harcama Ekle</span>
          </button>
        )}

        {/* Notifications Bell */}
        <button
          onClick={() => setActiveTab(activeTab === 'notifications' ? 'dashboard' : 'notifications')}
          className={`relative p-2.5 rounded-2xl border transition-all apple-press ${
            activeTab === 'notifications'
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
          }`}
          aria-label="Bildirimler"
          title="Bildirimler"
        >
          <Bell className="w-4 h-4" />
          {totalNotifications > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center border border-black shadow-md">
              {totalNotifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
