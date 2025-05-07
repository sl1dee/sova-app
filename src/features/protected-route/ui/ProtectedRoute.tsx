import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth';
import type { ProtectedRouteProps } from '../types';

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;