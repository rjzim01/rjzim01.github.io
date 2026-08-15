import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VerifyEmail.css';

function VerifyEmail() {
  const { user, resendVerificationEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [checkingVerification, setCheckingVerification] = useState(false);

  // Periodically check if email is verified
  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        setCheckingVerification(true);
        // Reload user to get latest verification status
        await user.reload();
        if (user.emailVerified) {
          // Email is verified, redirect to app
          navigate('/');
        }
        setCheckingVerification(false);
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [user, navigate]);

  const handleResendEmail = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await resendVerificationEmail();
      setMessage('✅ Verification email sent! Check your inbox.');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to send verification email');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <div className="email-icon">📧</div>

        <h1>Verify Your Email</h1>

        <p className="email-sent-to">
          Verification email sent to:<br />
          <strong>{user?.email}</strong>
        </p>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-text">Check your email inbox</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-text">Click the verification link</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">You'll be redirected automatically</div>
          </div>
        </div>

        {checkingVerification && (
          <div className="checking-message">
            ⟳ Checking verification status...
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="actions">
          <button
            className="btn-resend"
            onClick={handleResendEmail}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </div>

        <div className="help-text">
          <p>
            Don't see the email? Check your spam/junk folder.
            <br />
            Verification links expire in 24 hours.
          </p>
        </div>

        <button
          className="btn-logout-link"
          onClick={handleLogout}
        >
          Use different account
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
