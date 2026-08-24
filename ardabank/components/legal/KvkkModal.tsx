'use client';

import React from 'react';
import { Shield, X, Lock, EyeOff, Trash2, CheckCircle2 } from 'lucide-react';

export const KvkkModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-apple animate-fade-in">
      <div className="w-full max-w-lg bg-zinc-900 border border-white/15 rounded-[32px] p-5 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-extrabold text-white">KVKK Aydınlatma & Gizlilik Politikası</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white transition-colors apple-press"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KVKK Legal Document Content */}
        <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed font-sans">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] font-medium text-emerald-200">
              AradaPay, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca kişisel verilerinizi uçtan uca korur. Verileriniz üçüncü taraflarla asla satılmaz veya izinsiz paylaşılmaz.
            </p>
          </div>

          <section className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              1. Veri Sorumlusu ve Toplanan Veriler
            </h3>
            <p className="text-[11px] text-zinc-400">
              Uygulamamıza kaydolurken veya profilinizi güncellerken verdiğiniz <b>Ad Soyad</b>, <b>E-posta</b>, <b>Telefon Numarası</b> ve <b>Banka IBAN Adresi</b> verileriniz borç/alacak takibi ve ortak harcama hesaplaması amacıyla işlenmektedir.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              2. Kişisel Verilerin Güvenliği ve Şifreleme
            </h3>
            <p className="text-[11px] text-zinc-400">
              Telefon numaralarınız ve banka IBAN verileriniz 256-bit SSL şifrelemeyle Google Cloud & Firebase Firestore korumalı altyapısında saklanır. Yalnızca onay verdiğiniz arkadaşlarınız borç transferi yapabilmek için IBAN bilgilerinizi görebilir.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              3. KVKK Kapsamındaki Haklarınız (Madde 11)
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-400">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>Telefon ve IBAN bilginizi istediğiniz an gizleme veya güncelleme,</li>
              <li><b>Unutulma Hakkı (Right to be Forgotten):</b> Dilediğiniz zaman tüm verilerinizi ve hesabınızı sistemden kalıcı olarak silme hakkı.</li>
            </ul>
          </section>

          <section className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              4. Gizlilik Ayarları Yönetimi
            </h3>
            <p className="text-[11px] text-zinc-400">
              Profil sayfanızdaki <b>"Gizlilik ve KVKK Ayarları"</b> bölümünden telefon numaranızın rehber aramalarında görünürlüğünü veya IBAN gizliliğinizi anında kontrol edebilirsiniz.
            </p>
          </section>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-2xl transition-all apple-press flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Okudum, Anladım ve Kabul Ediyorum</span>
          </button>
        </div>
      </div>
    </div>
  );
};
