import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserHeader.css';

function UserHeader() {
  const { user } = useAuth();

  return (
    <header className="user-header">
      <div className="user-info">
        <div className="user-avatar">
          {user?.displayName ? user.displayName[0].toUpperCase() : user?.email?.[0].toUpperCase()}
        </div>
        <div className="user-details">
          <div className="user-name">{user?.displayName || 'User'}</div>
          <div className="user-email">{user?.email}</div>
        </div>
      </div>
      <Link to="/profile" className="btn-profile">
        ⚙️ Settings
      </Link>
    </header>
  );
}

export default UserHeader;
