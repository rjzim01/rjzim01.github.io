import type { Expense } from '../types';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (id: string) => void;
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
  'Other': '📌'
};

function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="expense-list empty">
        <p>No expenses yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Expense History</h2>
      <div className="expenses-container">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-emoji">
              {CATEGORY_EMOJI[expense.category] || '📌'}
            </div>
            <div className="expense-details">
              <div className="expense-header">
                <div>
                  <h4 className="expense-description">{expense.description}</h4>
                  <p className="expense-category">{expense.category}</p>
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
            <div className="expense-amount">
              ${expense.amount.toFixed(2)}
            </div>
            <div className="expense-actions">
              <button
                className="btn-edit"
                onClick={() => onEdit(expense.id)}
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
