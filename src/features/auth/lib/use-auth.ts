import { useCallback } from 'react';
import { login, logout } from '@app/store/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@app/store/store.hooks.ts';
import { useGetPersonsQuery } from '@shared/api/auth/auth.ts';

export const useAuth = () => {
  const { data, isLoading, error } = useGetPersonsQuery(1);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const normalizePhone = (phone: string): string => {
    return `+${phone.replace(/\D/g, '')}`;
  };

  const signIn = useCallback(
    (phone: string, password: string) => {
      if (password.length < 8) {
        return { success: false, message: 'Пароль должен быть не менее 8 символов' };
      }
      const enteredPhone = normalizePhone(phone);
      const matchedUser = data?.data.find((user) => normalizePhone(user.phone) === enteredPhone);

      if (!matchedUser) {
        return { success: false, message: 'Пользователь не найден' };
      }

      dispatch(login(matchedUser));
      return { success: true };
    },
    [data, dispatch],
  );

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return { isAuthenticated, user, signIn, signOut, isLoading, error };
};
