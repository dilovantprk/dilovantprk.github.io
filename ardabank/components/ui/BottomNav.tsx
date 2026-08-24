'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { TabType } from '@/types';
import { LayoutDashboard, Users, History, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Özet', icon: LayoutDashboard },
    { id: 'friends', label: 'Arkadaşlar', icon: Users },
    { id: 'activity', label: 'Hareketler', icon: History },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="shrink-0 w-full apple-dock border-t border-white/10 pb-3 pt-2.5 px-4 z-40 bg-zinc-950/95 backdrop-blur-2xl">
      <div className="flex items-center justify-around max-w-xs mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 transition-all apple-press ${
                isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.5]' : 'stroke-1.5'
                }`}
              />
              <span className={`text-[10px] mt-1 ${isActive ? 'font-extrabold text-emerald-400 font-apple' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
    </nav>
  );
};
