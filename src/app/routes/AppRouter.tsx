import { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@features/protected-route';
import ProductsPage from '@pages/products';
import Layout from '@widgets/layout';

const ProductIdPage = lazy(() => import('@pages/product-id'));
const UserPage = lazy(() => import('@pages/user'));

export const AppRouter: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Spinner</div>}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductIdPage />} />
          <Route
            path="/user"
            element={
              /*
               * Проверка авторизации перед переход на страницу
               */
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};