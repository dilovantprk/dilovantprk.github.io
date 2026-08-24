// Client-side rate limit map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function sanitizeInput(input: string): string {
  if (!input) return '';
  const sanitized = input.replace(/<[^>]*>/g, '').trim();
  return sanitized.slice(0, 500);
}

export function sanitizeEmail(email: string): string {
  if (!email) return '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? email.trim().toLowerCase() : '';
}

export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d+\s]/g, '').trim();
}

export function sanitizeIBAN(iban: string): string {
  if (!iban) return '';
  return iban.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 34);
}

export function sanitizeAmount(amount: string): number | null {
  if (!amount) return null;
  const num = Number(amount);
  if (isNaN(num) || num <= 0 || num > 999999) {
    return null;
  }
  return num;
}

export function isValidExpenseDescription(desc: string): boolean {
  if (!desc) return false;
  const trimmed = desc.trim();
  return trimmed.length >= 2 && trimmed.length <= 200;
}

export function rateLimiter(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count += 1;
  return true;
}

/**
 * 2-Factor Financial Data Masking & Encryption Helper
 */
export function maskFinancialData(value: string | number, isUnlocked: boolean): string {
  if (isUnlocked) {
    return typeof value === 'number'
      ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : value;
  }
  return '••••••••';
}

export function hashPinCode(pin: string): string {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `pin_hash_${Math.abs(hash)}`;
}
