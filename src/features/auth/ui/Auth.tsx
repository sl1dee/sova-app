import { useState } from 'react';
import AuthModal from '@entities/modal/auth/auth-modal';
import { useAuth } from '@features/auth';

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      {!isAuthenticated && <button onClick={() => setIsAuthModalOpen(true)}>Sign In</button>}
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </>
  );
};

export default Auth;