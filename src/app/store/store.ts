import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/store/slices/auth-slice/auth-slice.ts';
import productsReducer from '@app/store/slices/products-slice/products-slice.ts';
import { authApi } from '@shared/api/auth/auth.ts';
import { productsApi } from '@shared/api/products/products.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productsApi.middleware),
});
