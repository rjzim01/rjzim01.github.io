import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './EmailVerification.css';

function EmailVerification() {
  const { user, resendVerificationEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isEmailVerified = user?.emailVerified ?? false;

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

  return (
    <div className="email-verification">
      <div className={`verification-status ${isEmailVerified ? 'verified' : 'unverified'}`}>
        <div className="status-icon">
          {isEmailVerified ? '✅' : '⏳'}
        </div>
        <div className="status-content">
          <h3>{isEmailVerified ? 'Email Verified' : 'Email Verification Pending'}</h3>
          <p>{user?.email}</p>
          {!isEmailVerified && (
            <small>Please verify your email to unlock all features</small>
          )}
        </div>
      </div>

      {!isEmailVerified && (
        <div className="verification-actions">
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <p className="verification-help">
            We sent a verification link to your email. Click the link to verify your account.
          </p>

          <button
            className="btn-resend"
            onClick={handleResendEmail}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </div>
      )}

      {isEmailVerified && (
        <div className="verification-success">
          <p>Your email is verified. You have full access to all features! 🎉</p>
        </div>
      )}
    </div>
  );
}

export default EmailVerification;
