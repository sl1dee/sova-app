import { FC, memo, ReactNode } from 'react';
import Footer from '@widgets/footer/ui/footer.tsx';
import Header from '@widgets/header/ui/header.tsx';
import cl from './layout.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={cl.layout}>
      <Header />
      <main className={cl.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default memo(Layout);