import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="py-20 text-center">Checking authentication…</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
