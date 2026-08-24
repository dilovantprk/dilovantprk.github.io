'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { BellRing, X, ArrowUpRight } from 'lucide-react';

export const NudgeWidget: React.FC = () => {
  const { currentUser, nudges, friends, openSettleUpModal, dismissNudge } = useAppStore();

  const myNudges = nudges.filter((n) => n.to_user_id === currentUser.id);

  if (myNudges.length === 0) return null;

  return (
    <div className="space-y-2">
      {myNudges.map((nudge) => {
        const sender = friends.find((f) => f.id === nudge.from_user_id);

        return (
          <div
            key={nudge.id}
            className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 animate-fade-in"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <BellRing className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-amber-300 font-apple">Borç Hatırlatması</h4>
                <p className="text-[11px] text-zinc-300 font-medium truncate mt-0.5">
                  {sender?.full_name.split(' ')[0] || 'Arkadaşın'} borcunu hatırlattı.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => openSettleUpModal(nudge.from_user_id)}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-extrabold rounded-lg transition-all apple-press flex items-center gap-1 shadow-sm"
              >
                <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                <span>Öde</span>
              </button>
              <button
                onClick={() => dismissNudge(nudge.id)}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                aria-label="Kapat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
