import { login, logout } from '@app/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@app/store/store.hooks.ts';
import { useGetPersonsQuery } from '@shared/api/auth/auth.ts';

export const useAuth = () => {
  const { data, isLoading, error } = useGetPersonsQuery(1);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    return phone.startsWith('+') ? '+' + digits : '+' + digits;
  };

  const signIn = (phone: string, password: string) => {
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
  };

  const signOut = () => {
    dispatch(logout());
  };

  return { isAuthenticated, user, signIn, signOut, isLoading, error };
};
