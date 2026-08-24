'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Plus, UserPlus } from 'lucide-react';

export const FAB: React.FC = () => {
  const { 
    activeTab, 
    openAddExpenseModal, 
    openAddFriendModal 
  } = useAppStore();

  // Hide FAB completely on tabs where floating creation is irrelevant (Profile & Notifications)
  if (activeTab === 'profile' || activeTab === 'notifications') {
    return null;
  }

  // Dynamic Action per Active Tab
  const isFriendsTab = activeTab === 'friends';
  const handleAction = isFriendsTab ? openAddFriendModal : openAddExpenseModal;
  const label = isFriendsTab ? 'Arkadaş Ekle / QR Okut' : 'Harcama Ekle';

  return (
    <button
      onClick={() => handleAction()}
      className="absolute bottom-[88px] right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-400 text-black shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all apple-press border border-white/30 animate-fade-in"
      aria-label={label}
      title={label}
    >
      {isFriendsTab ? (
        <UserPlus className="w-5 h-5 stroke-[2.5]" />
      ) : (
        <Plus className="w-6 h-6 stroke-[3]" />
      )}
    </button>
  );
};
