import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Currency, ExpenseCategory } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: Currency = 'TRY'): string {
  const rounded = Math.abs(amount).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const symbols: Record<Currency, string> = {
    TRY: '₺',
    USD: '$',
    EUR: '€',
  };

  const symbol = symbols[currency] || '₺';

  return `${amount < 0 ? '-' : ''}${rounded} ${symbol}`;
}

export const CATEGORY_DETAILS: Record<ExpenseCategory, { label: string; iconName: string; bg: string; text: string }> = {
  dining: { label: 'Yeme & İçme', iconName: 'Utensils', bg: 'bg-orange-500/10', text: 'text-orange-400' },
  groceries: { label: 'Market', iconName: 'ShoppingCart', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  travel: { label: 'Seyahat', iconName: 'Plane', bg: 'bg-sky-500/10', text: 'text-sky-400' },
  housing: { label: 'Kira & Ev', iconName: 'Home', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  entertainment: { label: 'Eğlence', iconName: 'Film', bg: 'bg-pink-500/10', text: 'text-pink-400' },
  utilities: { label: 'Fatura & Aidat', iconName: 'Zap', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  shopping: { label: 'Alışveriş', iconName: 'ShoppingBag', bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
  other: { label: 'Diğer', iconName: 'Receipt', bg: 'bg-zinc-500/10', text: 'text-zinc-400' },
};

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    return dateString;
  }
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

