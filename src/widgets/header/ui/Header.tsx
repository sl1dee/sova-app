import { Link } from 'react-router-dom';
import { useAuth } from '@features/auth';
import Auth from '@features/auth/ui/Auth.tsx';
import Feedback from '@features/feedback/ui/Feedback.tsx';
import cl from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className={cl.container}>
      <div className={cl.wrapper}>
        <Link to="/" className={cl.link}>
          Product Catalog
        </Link>
        <Feedback />
        <Auth />
        {isAuthenticated && (
          <Link to="/user" className={cl.link}>
            {user?.lastname + ' ' + user?.firstname}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;