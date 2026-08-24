'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { auth, onAuthStateChanged, db, doc, getDoc } from '@/lib/firebase';

// UI Components
import { Header } from '@/components/ui/Header';
import { DesktopHeader } from '@/components/ui/DesktopHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { DesktopSidebar } from '@/components/ui/DesktopSidebar';
import { FAB } from '@/components/ui/FAB';

// View Components
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { FriendStatusCards } from '@/components/dashboard/FriendStatusCards';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { NudgeWidget } from '@/components/dashboard/NudgeWidget';
import { PendingApprovalsWidget } from '@/components/dashboard/PendingApprovalsWidget';

import { NotificationsView } from '@/components/notifications/NotificationsView';
import { FriendsView } from '@/components/friends/FriendsView';
import { ActivityView } from '@/components/activity/ActivityView';
import { ProfileView } from '@/components/profile/ProfileView';

// Auth Screen & Modals
import { AuthScreen } from '@/components/auth/AuthScreen';
import { AddExpenseModal } from '@/components/modals/AddExpenseModal';
import { SettleUpModal } from '@/components/modals/SettleUpModal';
import { AddFriendModal } from '@/components/modals/AddFriendModal';
import { UserProfileModal } from '@/components/modals/UserProfileModal';
import { PinVerificationModal } from '@/components/modals/PinVerificationModal';

export default function Home() {
  const { isAuthenticated, activeTab, setCurrentUser, isPinModalOpen, closePinModal } = useAppStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Safety fallback: Never lock user in loading state for more than 1 second
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 1000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(timer);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setCurrentUser({
              id: user.uid,
              email: data.email || user.email || '',
              username: data.username || (user.email?.split('@')[0] || 'user').toLowerCase(),
              full_name: data.full_name || user.displayName || 'Kullanıcı',
              avatar_url: data.avatar_url || user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              phone: data.phone || user.phoneNumber || '',
              iban: data.iban || '',
              default_currency: data.default_currency || 'TRY',
              created_at: data.created_at || new Date().toISOString(),
            });
          } else {
            setCurrentUser({
              id: user.uid,
              email: user.email || '',
              username: (user.email?.split('@')[0] || 'user').toLowerCase(),
              full_name: user.displayName || 'Kullanıcı',
              avatar_url: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              phone: user.phoneNumber || '',
              iban: '',
              default_currency: 'TRY' as const,
              created_at: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.warn('Auth state sync notice:', err);
        }
      }
      setCheckingAuth(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [setCurrentUser]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-emerald-400 font-apple font-bold text-xs">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mb-3" />
        <span>AradaPay Doğrulanıyor...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="app-viewport ardabank-bg-glow">
      {/* 1. DESKTOP SIDEBAR (Visible only on md screens >=768px) */}
      <DesktopSidebar />

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 max-w-6xl mx-auto relative h-screen overflow-hidden">
        {/* Mobile Top Header (Hidden on Desktop >=768px) */}
        <div className="md:hidden">
          <Header />
        </div>

        {/* Desktop Top Header (Visible on Desktop >=768px) */}
        <DesktopHeader />

        {/* Central Content Canvas */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-4 no-scrollbar">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Central Main Stream (2 Columns on Desktop) */}
              <div className="lg:col-span-2 space-y-4">
                <DashboardHero />
                <NudgeWidget />
                <PendingApprovalsWidget />
                <FriendStatusCards />
              </div>

              {/* Desktop Side Summary Column (1 Column on Desktop) */}
              <div className="hidden lg:block space-y-4">
                <ActivityFeed />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-3xl mx-auto">
              <NotificationsView />
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="max-w-4xl mx-auto">
              <FriendsView />
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="max-w-4xl mx-auto">
              <ActivityView />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto">
              <ProfileView />
            </div>
          )}
        </main>

        {/* Mobile Floating Action Button (FAB) */}
        <div className="md:hidden">
          <FAB />
        </div>

        {/* Mobile Bottom Navigation Bar (Hidden on Desktop >=768px) */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>

      {/* Global Sheet Modals */}
      <AddExpenseModal />
      <SettleUpModal />
      <AddFriendModal />
      <UserProfileModal />
      <PinVerificationModal isOpen={isPinModalOpen} onClose={closePinModal} />
    </div>
  );
}
