'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { 
    currentUser, 
    expenses, 
    settlements, 
    nudges, 
    friends, 
    currency, 
    approveExpense, 
    rejectExpense, 
    approveSettlement, 
    rejectSettlement,
    dismissNudge,
    openSettleUpModal,
    crossSettlementOffers,
    approveCrossSettlement,
    rejectCrossSettlement,
    scanForCrossSettlements
  } = useAppStore();

  const [scanMessage, setScanMessage] = useState<string | null>(null);

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

  const handleApproveSettlement = (id: string) => {
    approveSettlement(id);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#30d158', '#64d2ff'],
      });
    } catch {}
  };

  const handleApproveCrossOffer = (id: string) => {
    approveCrossSettlement(id);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#30d158', '#10b981', '#64d2ff'],
      });
    } catch {}
  };

  const handleRunScan = () => {
    const res = scanForCrossSettlements();
    setScanMessage(res.message || 'Çapraz dengeleme taraması tamamlandı.');
    setTimeout(() => setScanMessage(null), 4000);
  };

  return (
    <div className="space-y-4 py-1 font-apple animate-fade-in">
      {/* Header with Quick Scan Action */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div>
          <h1 className="text-base font-extrabold text-white">Bildirimler</h1>
          <p className="text-[10px] text-zinc-400">Onay ve çapraz borç dengeleme bildirimleri</p>
        </div>

        <button
          onClick={handleRunScan}
          className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-[11px] font-bold transition-all apple-press flex items-center gap-1.5 shrink-0 shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Dengeleme Tara</span>
        </button>
      </div>

      {/* Toast Notification */}
      {scanMessage && (
        <div className="p-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {totalNotifications === 0 ? (
        <div className="text-center py-10 px-4 bg-white/5 rounded-3xl border border-white/10 my-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-white">Yeni bildiriminiz bulunmuyor 🎉</p>
          <p className="text-[10px] text-zinc-400 font-medium mt-1">Tüm borçlar ve hesaplaşmalar dengede.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* 1. CROSS SETTLEMENT OFFERS (ÇAPRAZ BORÇ DENGELEME) */}
          {pendingCrossOffers.map((offer) => {
            const myApproval = offer.approvals[currentUser.id];
            const approvedCount = Object.values(offer.approvals).filter(Boolean).length;
            const totalCount = offer.participants.length;

            return (
              <div
                key={offer.id}
                className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-black border-2 border-emerald-400/50 space-y-3 shadow-2xl animate-fade-in"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <h3 className="text-xs font-extrabold text-white">Çapraz Borç Dengelemesi Bulundu!</h3>
                  </div>
                  <span className="text-[10px] font-extrabold font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {approvedCount}/{totalCount} Ortak Onayladı
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  <b className="text-emerald-400 font-bold">{offer.participants.map((p) => p.name.split(' ')[0]).join(', ')}</b> arasında döngüsel borç tespit edildi. Onaylarsanız üçünüzün de borcu{' '}
                  <b className="text-emerald-400 font-extrabold">{formatCurrency(offer.cycleAmount, currency)}</b> düşürülerek sıfırlanacaktır!
                </p>

                {/* Steps Cycle Visualizer */}
                <div className="p-2.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                  {offer.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-zinc-300 font-mono">
                      <span>{step.fromUserName.split(' ')[0]}</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{step.toUserName.split(' ')[0]}</span>
                      <span className="font-extrabold text-emerald-400">{formatCurrency(step.amount, currency)}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => rejectCrossSettlement(offer.id)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-zinc-300 rounded-xl text-xs font-bold transition-all apple-press"
                  >
                    Reddet
                  </button>

                  <button
                    onClick={() => handleApproveCrossOffer(offer.id)}
                    disabled={myApproval}
                    className={`px-4 py-1.5 text-xs font-extrabold rounded-xl transition-all apple-press flex items-center gap-1.5 shadow-md ${
                      myApproval
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-300 hover:to-teal-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{myApproval ? 'Onayladınız (Bekleniyor)' : 'Dengelemeyi Onayla'}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* 2. STANDARD NOTIFICATIONS LIST */}
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {/* Nudges */}
            {myNudges.map((nudge) => {
              const sender = friends.find((f) => f.id === nudge.from_user_id);

              return (
                <div key={nudge.id} className="py-3 px-1 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={sender?.avatar_url}
                      alt={sender?.full_name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{sender?.full_name}</h4>
                      <p className="text-[11px] text-amber-400 font-medium truncate">
                        Borç hatırlatması gönderdi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => openSettleUpModal(nudge.from_user_id)}
                      className="px-3 py-1 bg-emerald-400 text-black text-[11px] font-extrabold rounded-lg transition-all apple-press shadow-sm"
                    >
                      Öde
                    </button>
                    <button
                      onClick={() => dismissNudge(nudge.id)}
                      className="px-2 py-1 text-zinc-400 hover:text-white text-[11px] font-medium"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Pending Settlements */}
            {pendingSettlements.map((s) => {
              const payer = friends.find((f) => f.id === s.payer_id);

              return (
                <div key={s.id} className="py-3 px-1 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={payer?.avatar_url}
                      alt={payer?.full_name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{payer?.full_name}</h4>
                      <p className="text-[11px] text-teal-300 font-medium truncate">
                        {formatCurrency(s.amount, s.currency)} ödeme gönderdi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => rejectSettlement(s.id)}
                      className="px-2.5 py-1 bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[10px] font-bold transition-all apple-press"
                    >
                      Reddet
                    </button>
                    <button
                      onClick={() => handleApproveSettlement(s.id)}
                      className="px-3 py-1 bg-emerald-400 text-black text-[10px] font-extrabold rounded-lg transition-all apple-press shadow-sm"
                    >
                      Onayla
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Pending Expenses */}
            {pendingExpenses.map((exp) => {
              const payer = friends.find((f) => f.id === exp.paid_by);
              const mySplit = exp.splits.find((s) => s.user_id === currentUser.id);

              return (
                <div key={exp.id} className="py-3 px-1 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={payer?.avatar_url}
                      alt={payer?.full_name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{exp.description}</h4>
                      <p className="text-[11px] text-zinc-400 font-medium truncate">
                        {payer?.full_name.split(' ')[0]} • Payın: {formatCurrency(mySplit?.amount_owed || 0, exp.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => rejectExpense(exp.id)}
                      className="px-2.5 py-1 bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[10px] font-bold transition-all apple-press"
                    >
                      Reddet
                    </button>
                    <button
                      onClick={() => approveExpense(exp.id)}
                      className="px-3 py-1 bg-emerald-400 text-black text-[10px] font-extrabold rounded-lg transition-all apple-press shadow-sm"
                    >
                      Onayla
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
