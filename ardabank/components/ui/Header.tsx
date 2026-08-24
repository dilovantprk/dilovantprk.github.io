'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { AradaPayLogo } from '@/components/ui/AradaPayLogo';
import { Wifi, Signal, Battery, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, activeTab, setActiveTab, expenses, settlements, nudges, crossSettlementOffers } = useAppStore();
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const handleToggleNotifications = () => {
    if (activeTab === 'notifications') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('notifications');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full apple-glass border-b border-white/10 shrink-0">
      {/* iOS Top Status Bar Simulator */}
      <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-bold text-zinc-300 font-apple tracking-tight">
        <span>{time}</span>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Signal className="w-3 h-3 fill-current" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* iOS Navigation Bar */}
      <div className="px-5 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer apple-press"
        >
          <AradaPayLogo size="md" />
          <span className="font-extrabold text-lg tracking-tight text-white font-apple">
            Arada<span className="text-emerald-400">Pay</span>
          </span>
        </div>

        {/* Right Action: Notification Bell button */}
        <button
          onClick={handleToggleNotifications}
          className={`relative p-2 rounded-full border transition-all apple-press ${
            activeTab === 'notifications'
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
              : 'bg-white/10 border-white/15 text-zinc-300 hover:text-white'
          }`}
          aria-label="Bildirimler"
        >
          <Bell className="w-4 h-4" />
          {totalNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center border border-black shadow-md">
              {totalNotifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
