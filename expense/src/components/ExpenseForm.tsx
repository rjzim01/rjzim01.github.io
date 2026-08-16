import { useState, useEffect } from 'react';
import type { Expense } from '../types';
import './ExpenseForm.css';

interface ExpenseFormProps {
  onSubmit: (expense: Partial<Expense> & { amount: number; category: string; description: string; date: string; type: 'income' | 'expense' }) => void;
  initialData?: Expense;
  isEditing: boolean;
  onCancel: () => void;
}

const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Education', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Other Income'];

function ExpenseForm({ onSubmit, initialData, isEditing, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: EXPENSE_CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description,
        date: initialData.date
      });
    }
  }, [initialData]);

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType: 'income' | 'expense') => {
    setFormData({
      ...formData,
      type: newType,
      category: newType === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.description || !formData.date) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit({
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      type: formData.type
    });

    setFormData({
      type: 'expense',
      amount: '',
      category: EXPENSE_CATEGORIES[0],
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{isEditing ? `Edit ${formData.type === 'income' ? 'Income' : 'Expense'}` : 'Add New Transaction'}</h2>
        {!isEditing && (
          <div className="type-toggle">
            <button
              type="button"
              className={`toggle-btn ${formData.type === 'expense' ? 'active' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >
              💸 Expense
            </button>
            <button
              type="button"
              className={`toggle-btn ${formData.type === 'income' ? 'active' : ''}`}
              onClick={() => handleTypeChange('income')}
            >
              💵 Income
            </button>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount (৳)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="e.g., Lunch at restaurant"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className={`btn-primary ${formData.type === 'income' ? 'income-btn' : 'expense-btn'}`}>
          {isEditing ? `Update ${formData.type === 'income' ? 'Income' : 'Expense'}` : `Add ${formData.type === 'income' ? 'Income' : 'Expense'}`}
        </button>
        {isEditing && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
