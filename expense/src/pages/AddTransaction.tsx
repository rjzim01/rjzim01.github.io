import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import type { Expense } from '../types';
import ExpenseForm from '../components/ExpenseForm';
import UserHeader from '../components/UserHeader';
import '../pages/ExpenseTracker.css';

function AddTransaction() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      fetchExpense(editId);
    }
  }, [editId]);

  const fetchExpense = async (id: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'expenses', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEditingExpense({
          id: docSnap.id,
          ...docSnap.data()
        } as Expense);
      }
    } catch (error) {
      console.error('Error fetching expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (expense: Omit<Expense, 'id' | 'createdAt' | 'userId'> & { type: 'income' | 'expense' }) => {
    if (!user) return;
    try {
      if (editId) {
        await updateDoc(doc(db, 'expenses', editId), expense);
      } else {
        await addDoc(collection(db, 'expenses'), {
          ...expense,
          userId: user.uid,
          createdAt: Date.now()
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <UserHeader />
        <div className="container">
          <div className="main-content">
            <div className="loading">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <UserHeader />
      <div className="container">
        <div className="main-content">
          <div className="form-section">
            <ExpenseForm
              onSubmit={handleSubmit}
              initialData={editingExpense}
              isEditing={!!editId}
              onCancel={() => navigate('/')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
