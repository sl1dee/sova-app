import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson } from '@shared/api/auth/auth.types.ts';
import { IAuthState } from './auth-slice.types.ts';

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

/**
 * При успешной аутентификации, сохраняем данные в localStorage, чтобы при обновлении страницы пользователь был авторизован
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IPerson>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userPhone', action.payload.phone);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userPhone');
      localStorage.removeItem('user');
    },
    setAuth: (state, action: PayloadAction<IPerson | null>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { login, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;