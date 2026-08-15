import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import type { Expense } from '../types';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import UserHeader from '../components/UserHeader';
import '../pages/ExpenseTracker.css';

function ExpenseTracker() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const q = query(
        collection(db, 'expenses'),
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const data: Expense[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Expense));
      setExpenses(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expense,
        userId: user.uid,
        createdAt: Date.now()
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      await updateDoc(doc(db, 'expenses', id), updates);
      fetchExpenses();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const getFilteredExpenses = () => {
    let filtered = expenses;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(e => e.category === filterCategory);
    }

    if (dateRange.start) {
      filtered = filtered.filter(e => e.date >= dateRange.start);
    }

    if (dateRange.end) {
      filtered = filtered.filter(e => e.date <= dateRange.end);
    }

    return filtered;
  };

  const filteredExpenses = getFilteredExpenses();
  const categories = Array.from(new Set(expenses.map(e => e.category)));

  return (
    <div className="app">
      <UserHeader />

      <div className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track and manage your expenses easily</p>
      </div>

      <div className="container">
        <div className="main-content">
          <Dashboard expenses={filteredExpenses} />

          <div className="form-section">
            <ExpenseForm
              onSubmit={editingId ?
                (data: Partial<Expense> & { amount: number; category: string; description: string; date: string }) => updateExpense(editingId, data) :
                addExpense
              }
              initialData={editingId ? expenses.find(e => e.id === editingId) : undefined}
              isEditing={!!editingId}
              onCancel={() => setEditingId(null)}
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="start-date">From:</label>
              <input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="end-date">To:</label>
              <input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>

            <button
              className="btn-secondary"
              onClick={() => {
                setFilterCategory('all');
                setDateRange({ start: '', end: '' });
              }}
            >
              Clear Filters
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading expenses...</div>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={setEditingId}
              onDelete={deleteExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
