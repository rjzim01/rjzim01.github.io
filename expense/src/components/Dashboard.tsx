import { useMemo } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Expense, CategoryTotal } from '../types';
import './Dashboard.css';

interface DashboardProps {
  expenses: Expense[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

function Dashboard({ expenses }: DashboardProps) {
  const stats = useMemo(() => {
    const totalIncome = expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalIncome - totalExpense;

    const byCategory: CategoryTotal[] = expenses.reduce((acc: CategoryTotal[], e) => {
      const existing = acc.find(c => c.category === e.category);
      if (existing) {
        existing.total += e.amount;
        existing.count += 1;
      } else {
        acc.push({ category: e.category, total: e.amount, count: 1 });
      }
      return acc;
    }, [])
      .sort((a, b) => b.total - a.total);

    const monthlyData = (() => {
      const data: Record<string, number> = {};
      expenses.forEach(e => {
        const month = e.date.substring(0, 7);
        data[month] = (data[month] || 0) + e.amount;
      });
      return Object.entries(data)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6)
        .map(([month, total]) => ({
          month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          total: Math.round(total * 100) / 100
        }));
    })();

    const avgExpense = expenses.filter(e => e.type === 'expense').length > 0
      ? Math.round((totalExpense / expenses.filter(e => e.type === 'expense').length) * 100) / 100
      : 0;
    const highestCategory = byCategory.find(c => expenses.some(e => e.category === c.category && e.type === 'expense')) || byCategory[0];

    return { totalIncome, totalExpense, balance, byCategory, monthlyData, avgExpense, highestCategory };
  }, [expenses]);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className={`stat-card balance-card ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
          <div className="stat-label">💰 Balance</div>
          <div className="stat-value">৳{stats.balance.toFixed(2)}</div>
        </div>
        <div className="stat-card income-card">
          <div className="stat-label">💵 Income</div>
          <div className="stat-value">৳{stats.totalIncome.toFixed(2)}</div>
        </div>
        <div className="stat-card expense-card">
          <div className="stat-label">💸 Expenses</div>
          <div className="stat-value">৳{stats.totalExpense.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transactions</div>
          <div className="stat-value">{expenses.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Expense</div>
          <div className="stat-value">৳{stats.avgExpense.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Top Category</div>
          <div className="stat-value">{stats.highestCategory?.category || 'N/A'}</div>
          <div className="stat-subtext">৳{stats.highestCategory?.total.toFixed(2) || '0.00'}</div>
        </div>
      </div>

      <div className="charts-grid">
        {stats.byCategory.length > 0 && (
          <div className="chart-container">
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.byCategory}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {stats.byCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => {
                  if (typeof value === 'number') return `৳${value.toFixed(2)}`;
                  return value;
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {stats.monthlyData.length > 0 && (
          <div className="chart-container">
            <h3>Monthly Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => {
                  if (typeof value === 'number') return `৳${value.toFixed(2)}`;
                  return value;
                }} />
                <Bar dataKey="total" fill="#4ECDC4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {stats.byCategory.length > 0 && (
        <div className="category-breakdown">
          <h3>Category Breakdown</h3>
          <div className="breakdown-list">
            {stats.byCategory.map((cat, idx) => (
              <div key={cat.category} className="breakdown-item">
                <div className="breakdown-color" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <div className="breakdown-info">
                  <div className="breakdown-category">{cat.category}</div>
                  <div className="breakdown-count">{cat.count} transaction{cat.count !== 1 ? 's' : ''}</div>
                </div>
                <div className="breakdown-amount">৳{cat.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
