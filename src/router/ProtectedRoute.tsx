import { Navigate, useLocation } from 'react-router-dom';

import { PATH } from '@constants/path';

import { useAuthStore } from '@stores/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={`${PATH.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
