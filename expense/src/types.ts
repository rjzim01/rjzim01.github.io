export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO date format
  type: 'income' | 'expense';
  createdAt: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
  count: number;
}

export interface MonthlyData {
  month: string;
  total: number;
}
