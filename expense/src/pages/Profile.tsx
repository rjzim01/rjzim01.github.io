import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../components/PasswordInput';
import EmailVerification from '../components/EmailVerification';
import ThemeSwitcher from '../components/ThemeSwitcher';
import './Profile.css';

function Profile() {
  const { user, logout, updateUserProfile, updateUserPassword } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameSuccess, setNameSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setNameSuccess('');

    if (!displayName.trim()) {
      setNameError('Name cannot be empty');
      return;
    }

    setNameLoading(true);
    try {
      await updateUserProfile(displayName);
      setNameSuccess('✅ Name updated successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setNameError(err.message);
      } else {
        setNameError('Failed to update name');
      }
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All password fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    setPasswordLoading(true);
    try {
      await updateUserPassword(currentPassword, newPassword);
      setPasswordSuccess('✅ Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('wrong-password')) {
          setPasswordError('Current password is incorrect');
        } else {
          setPasswordError(err.message);
        }
      } else {
        setPasswordError('Failed to update password');
      }
    } finally {
      setPasswordLoading(false);
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
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 Profile</h1>
        <Link to="/" className="back-link">← Back to Expenses</Link>
      </div>

      <div className="profile-content">
        {/* Email Section */}
        <section className="profile-section">
          <h2>Account Information</h2>
          <div className="info-group">
            <label>Email</label>
            <div className="email-display">
              {user?.email}
              <span className="read-only-badge">Read-only</span>
            </div>
            <small>Your email cannot be changed</small>
          </div>
        </section>

        {/* Email Verification Section */}
        <section className="profile-section">
          <EmailVerification />
        </section>

        {/* Update Name Section */}
        <section className="profile-section">
          <h2>Update Name</h2>

          {nameError && <div className="error-message">{nameError}</div>}
          {nameSuccess && <div className="success-message">{nameSuccess}</div>}

          <form onSubmit={handleUpdateName} className="profile-form">
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                disabled={nameLoading}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={nameLoading}>
              {nameLoading ? 'Updating...' : 'Update Name'}
            </button>
          </form>
        </section>

        {/* Update Password Section */}
        <section className="profile-section">
          <h2>Update Password</h2>

          {passwordError && <div className="error-message">{passwordError}</div>}
          {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

          <form onSubmit={handleUpdatePassword} className="profile-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <PasswordInput
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                disabled={passwordLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <PasswordInput
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                disabled={passwordLoading}
              />
              <small>At least 6 characters</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={passwordLoading}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={passwordLoading}>
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </section>

        {/* Theme Customization Section */}
        <section className="profile-section">
          <ThemeSwitcher />
        </section>

        {/* Logout Section */}
        <section className="profile-section danger-section">
          <h2>Logout</h2>
          <p>Sign out from your account</p>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}

export default Profile;
