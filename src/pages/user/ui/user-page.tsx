import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/lib/use-auth.ts';
import cl from './user-page.module.scss';

const UserPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    signOut();
    navigate('/', { replace: true });
  }, [signOut, navigate]);

  return (
    <div className={cl.wrapper}>
      <h2>User information</h2>
      <div className={cl.info}>
        <div>Lastname: {user?.lastname}</div>
        <div>Firstname: {user?.firstname}</div>
        <div>Email: {user?.email}</div>
        <div>Phone: {user?.phone}</div>
        <div>Website: {user?.website}</div>
        <div>Gender: {user?.gender}</div>
      </div>
      <button onClick={handleSignOut} className={cl.btn}>
        Sign out
      </button>
    </div>
  );
};

export default UserPage;