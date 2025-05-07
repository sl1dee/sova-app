import { FC, memo } from 'react';
import Footer from '@widgets/footer/ui/Footer.tsx';
import Header from '@widgets/header/ui/Header.tsx';
import type { ILayoutProps } from '../types';
import cl from './Layout.module.scss';

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