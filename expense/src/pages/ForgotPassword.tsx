import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    try {
      await resetPassword(email);
      setSuccess('✅ Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('user-not-found')) {
          setError('No account found with this email');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to send password reset email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>💰 Expense Tracker</h1>
        <h2>Reset Password</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
            <small>We'll send you a link to reset your password</small>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="auth-link">
          Remembered your password?{' '}
          <Link to="/login">Login here</Link>
        </p>

        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
