import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/store/slices/auth-slice/auth-slice.ts';
import productsReducer from '@app/store/slices/products-slice/products-slice.ts';
import { authApi } from '@shared/api/auth/auth.ts';
import { productsApi } from '@shared/api/products/products.ts';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productsApi.middleware),
});
