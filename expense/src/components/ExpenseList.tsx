import { useNavigate } from 'react-router-dom';
import type { Expense } from '../types';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  'Food': '🍔',
  'Transport': '🚗',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Shopping': '🛍️',
  'Health': '🏥',
  'Education': '📚',
  'Other': '📌',
  'Salary': '💼',
  'Freelance': '💻',
  'Investment': '📈',
  'Bonus': '🎁',
  'Gift': '🎀',
  'Other Income': '💸'
};

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const navigate = useNavigate();

  if (expenses.length === 0) {
    return (
      <div className="expense-list empty">
        <p>No transactions yet. Add income or expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Transaction History</h2>
      <div className="expenses-container">
        {expenses.map((expense) => (
          <div key={expense.id} className={`expense-item ${expense.type}`}>
            <div className="expense-emoji">
              {CATEGORY_EMOJI[expense.category] || '📌'}
            </div>
            <div className="expense-details">
              <div className="expense-header">
                <div>
                  <h4 className="expense-description">{expense.description}</h4>
                  <p className="expense-category">
                    {expense.category}
                    <span className="expense-type-badge">{expense.type === 'income' ? '💵 Income' : '💸 Expense'}</span>
                  </p>
                </div>
              </div>
              <p className="expense-date">
                {new Date(expense.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className={`expense-amount ${expense.type}`}>
              {expense.type === 'income' ? '+' : '-'}৳{expense.amount.toFixed(2)}
            </div>
            <div className="expense-actions">
              <button
                className="btn-edit"
                onClick={() => navigate(`/add?id=${expense.id}`)}
                title="Edit expense"
                aria-label={`Edit ${expense.description}`}
              >
                ✏️
              </button>
              <button
                className="btn-delete"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this expense?')) {
                    onDelete(expense.id);
                  }
                }}
                title="Delete expense"
                aria-label={`Delete ${expense.description}`}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
