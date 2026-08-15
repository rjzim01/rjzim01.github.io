import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

function ProtectedRoute({ children, requireVerified = true }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if email needs to be verified
  if (requireVerified && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
