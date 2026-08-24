'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ShieldCheck, Lock, Unlock, KeyRound, X, AlertCircle } from 'lucide-react';

interface PinVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'verify' | 'setup';
}

export const PinVerificationModal: React.FC<PinVerificationModalProps> = ({
  isOpen,
  onClose,
  mode = 'verify',
}) => {
  const { 
    isFinancial2FAEnabled, 
    enableFinancial2FA, 
    unlockFinancialData,
    closePinModal 
  } = useAppStore();

  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isSetupMode = mode === 'setup' || !isFinancial2FAEnabled;

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setErrorMsg(null);

      if (nextPin.length === 4) {
        setTimeout(() => submitPin(nextPin), 150);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const submitPin = (val: string) => {
    if (isSetupMode) {
      enableFinancial2FA(val);
      setPin('');
      onClose();
    } else {
      const success = unlockFinancialData(val);
      if (success) {
        setPin('');
        onClose();
      } else {
        setPin('');
        setErrorMsg('Hatalı PIN Kodu! Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xs p-5 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-emerald-500/40 shadow-2xl text-center space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="w-6" />
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            {isSetupMode ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h2 className="text-sm font-extrabold text-white">
            {isSetupMode ? '2FA Finansal PIN Belirleyin' : 'Borç Detaylarını Kilidini Açın'}
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {isSetupMode
              ? 'Tüm tutar ve açıklamaları gizlemek için 4 haneli PIN girin'
              : 'Tutar ve harcama açıklamalarını görmek için PIN girin'}
          </p>
        </div>

        {/* PIN Indicators */}
        <div className="flex items-center justify-center gap-3 py-2">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full transition-all border ${
                pin.length > idx
                  ? 'bg-emerald-400 border-emerald-400 scale-110 shadow-md shadow-emerald-500/50'
                  : 'bg-white/10 border-white/20'
              }`}
            />
          ))}
        </div>

        {errorMsg && (
          <div className="text-[11px] text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 p-2 rounded-xl flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="py-3 text-sm font-mono font-extrabold text-white bg-white/5 hover:bg-emerald-500/20 border border-white/10 rounded-2xl transition-all apple-press active:scale-95"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleKeyPress('0')}
            className="py-3 text-sm font-mono font-extrabold text-white bg-white/5 hover:bg-emerald-500/20 border border-white/10 rounded-2xl transition-all apple-press active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="py-3 text-xs font-bold text-zinc-400 hover:text-white bg-white/5 border border-white/10 rounded-2xl transition-all apple-press active:scale-95 flex items-center justify-center"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};
