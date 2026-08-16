import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import type { Expense } from '../types';
import Dashboard from '../components/Dashboard';
import ExpenseList from '../components/ExpenseList';
import UserHeader from '../components/UserHeader';
import '../pages/ExpenseTracker.css';

function ExpenseTracker() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filtersExpanded, setFiltersExpanded] = useState(() => {
    const saved = localStorage.getItem('filtersExpanded');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('filtersExpanded', JSON.stringify(filtersExpanded));
  }, [filtersExpanded]);

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

      <div className="container">
        <div className="main-content">
          <div className="filters">
            <div className="filters-header">
              <h3>Filters</h3>
              <button
                className="btn-toggle"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
              >
                {filtersExpanded ? '▲ Collapse' : '▼ Expand'}
              </button>
            </div>

            {filtersExpanded && (
              <>
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
              </>
            )}
          </div>

          <div className="add-transaction">
            <button
              className="btn-primary"
              onClick={() => navigate('/add')}
            >
              + Add New Transaction
            </button>
          </div>

          <Dashboard expenses={filteredExpenses} />

          {loading ? (
            <div className="loading">Loading expenses...</div>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={deleteExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
