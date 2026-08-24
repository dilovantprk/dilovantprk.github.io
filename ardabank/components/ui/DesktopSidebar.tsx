'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { TabType } from '@/types';
import { AradaPayLogo } from '@/components/ui/AradaPayLogo';
import { 
  LayoutDashboard, 
  Users, 
  History, 
  User, 
  Bell, 
  PlusCircle, 
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Unlock,
  LogOut
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    expenses, 
    settlements, 
    nudges,
    crossSettlementOffers,
    isFinancial2FAEnabled,
    isFinancialUnlocked,
    openPinModal,
    lockFinancialData,
    openAddExpenseModal,
    openSettleUpModal,
    logoutUser
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

  const userTag = currentUser.tag || '#1453';

  const navItems: { id: TabType; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Özet Paneli', icon: LayoutDashboard },
    { id: 'friends', label: 'Arkadaşlar & Rehber', icon: Users },
    { id: 'activity', label: 'Hareket Akışı', icon: History },
    { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: totalNotifications },
    { id: 'profile', label: 'Profil & Ayarlar', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-zinc-950/95 border-r border-white/10 h-screen sticky top-0 p-5 justify-between font-apple z-40 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer apple-press py-1"
        >
          <AradaPayLogo size="md" />
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-white">
              Arada<span className="text-emerald-400">Pay</span>
            </h1>
            <span className="text-[10px] font-semibold text-zinc-400 block -mt-0.5">
              Sosyal Harcama Platformu
            </span>
          </div>
        </div>

        {/* Quick Actions (Desktop Primary Buttons) */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => openAddExpenseModal()}
            className="w-full py-2.5 px-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black text-xs font-extrabold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Harcama Ekle</span>
          </button>

          <button
            onClick={() => openSettleUpModal()}
            className="w-full py-2.5 px-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-extrabold rounded-2xl transition-all apple-press flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span>Hesap Kapat / Öde</span>
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="space-y-1 pt-2">
          <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block px-3 mb-2">
            Menü
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all apple-press ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 stroke-[2.5]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold shadow-sm">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer User Badge & Security Tag */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        {/* 2FA PIN Quick Status Switch */}
        {isFinancial2FAEnabled && (
          <div 
            onClick={isFinancialUnlocked ? lockFinancialData : openPinModal}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer apple-press flex items-center justify-between gap-2 ${
              isFinancialUnlocked
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {isFinancialUnlocked ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              )}
              <span className="text-[11px] font-bold truncate">
                {isFinancialUnlocked ? '2FA Finans Açık' : '2FA PIN Kilitli'}
              </span>
            </div>
            <span className="text-[10px] font-extrabold underline">
              {isFinancialUnlocked ? 'Kilitle' : 'Aç'}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer apple-press"
          >
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="w-9 h-9 rounded-full object-cover border border-emerald-400/40 shrink-0 shadow-sm"
            />
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-white truncate">{currentUser.full_name}</h3>
              <p className="text-[10px] text-emerald-400 font-mono truncate">
                @{currentUser.username}<span className="text-emerald-300">{userTag}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => logoutUser()}
            className="p-2 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors apple-press shrink-0"
            title="Çıkış Yap"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>KVKK Korumalı & 256-Bit SSL</span>
        </div>
      </div>
    </aside>
  );
};
