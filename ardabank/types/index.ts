export type Currency = 'TRY' | 'USD' | 'EUR';

export type SplitMethod = 'equal' | 'exact' | 'percentage';

export type ExpenseCategory =
  | 'dining'
  | 'groceries'
  | 'travel'
  | 'housing'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'other';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string;
  phone?: string;
  iban?: string;
  tag?: string;
  default_currency: Currency;
  created_at: string;
}

export interface FriendRequest {
  id: string;
  from_user_id: string;
  from_user_name: string;
  from_user_avatar: string;
  from_user_tag: string;
  to_user_id: string;
  created_at: string;
  status: ApprovalStatus;
}

export interface CrossSettlementStep {
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amount: number;
}

export interface CrossSettlementOffer {
  id: string;
  cycleAmount: number;
  participants: { id: string; name: string; avatar: string; username: string }[];
  steps: CrossSettlementStep[];
  approvals: Record<string, boolean>;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar_url?: string;
  isRegistered: boolean;
  registeredUserId?: string;
  inviteSent?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  category?: string;
  created_by: string;
  created_at: string;
  image_url?: string;
  members_count?: number;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
}

export interface ExpenseSplit {
  id: string;
  expense_id: string;
  user_id: string;
  amount_owed: number;
  percentage?: number;
  status: ApprovalStatus;
  approved_at?: string;
}

export interface Expense {
  id: string;
  group_id?: string | null;
  paid_by: string;
  amount: number;
  currency: Currency;
  description: string;
  category: ExpenseCategory;
  split_method: SplitMethod;
  due_date?: string;
  status: ApprovalStatus;
  created_at: string;
  date?: string;
  splits: ExpenseSplit[];
}

export interface Settlement {
  id: string;
  payer_id: string;
  receiver_id: string;
  amount: number;
  currency: Currency;
  created_at: string;
  status: ApprovalStatus;
  note?: string;
}

export interface Nudge {
  id: string;
  from_user_id: string;
  to_user_id: string;
  expense_id?: string;
  amount?: number;
  currency?: Currency;
  created_at: string;
  message: string;
  isRead?: boolean;
}

export interface PairwiseDebt {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export type TabType = 'dashboard' | 'notifications' | 'friends' | 'activity' | 'profile';

export interface ActivityItem {
  id: string;
  type: 'expense' | 'settlement';
  title: string;
  subtitle: string;
  amount: number;
  currency: Currency;
  date: string;
  category?: ExpenseCategory;
  userBadge?: string;
  isPositive?: boolean;
  status: ApprovalStatus;
  canApprove?: boolean;
  requiresActionFromUserId?: string;
  dueDate?: string;
}

export interface ContactPropertyOptions {
  multiple?: boolean;
}

export interface ContactsManager {
  select(
    properties: string[],
    options?: ContactPropertyOptions
  ): Promise<Array<{ name?: string[]; tel?: string[]; email?: string[] }>>;
}

declare global {
  interface Navigator {
    contacts?: ContactsManager;
  }
}
