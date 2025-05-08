import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth';

interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;