import { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { setAuth } from '@app/store/slices/auth-slice';
import ProtectedRoute from '@features/protected-route';
import ProductsPage from '@pages/products';
import type { IPerson } from '@shared/api/auth/auth.types.ts';
import Layout from '@widgets/layout';

const ProductIdPage = lazy(() => import('@pages/product-id'));
const UserPage = lazy(() => import('@pages/user'));

export const AppRouter: FC = () => {
  const dispatch = useDispatch();

  /**
   * Функция для проверки состояния авторизации при старте приложения
   */
  const checkAuth = (dispatch: ReturnType<typeof useDispatch>) => {
    try {
      const userPhone = localStorage.getItem('userPhone');
      const userRaw = localStorage.getItem('user');

      if (!userPhone || !userRaw) {
        throw new Error('No auth data');
      }

      const user: IPerson = JSON.parse(userRaw); // Преобразуем строку из localStorage в объект пользователя
      dispatch(setAuth(user)); // Устанавливаем пользователя в Redux через setAuth
    } catch {
      // При ошибке — сбрасываем состояние авторизации и чистим localStorage
      dispatch(setAuth(null));
      localStorage.removeItem('userPhone');
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

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