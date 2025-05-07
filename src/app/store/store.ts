import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@shared/api/auth/auth.ts';
import { productsApi } from '@shared/api/products/products.ts';
import authReducer from './slices/authSlice/authSlice.ts';
import productsReducer from './slices/productsSlice/productsSlice.ts';

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
