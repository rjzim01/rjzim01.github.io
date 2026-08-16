import { Link } from 'react-router-dom';
import './UserHeader.css';

function UserHeader() {
  return (
    <header className="user-header">
      <Link to="/" className="app-title">
        Expense Tracker
      </Link>
      <Link to="/profile" className="btn-profile">
        ⚙️ Settings
      </Link>
    </header>
  );
}

export default UserHeader;
