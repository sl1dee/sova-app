import { FC, memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@features/auth/lib/useAuth.ts';
import InputPassword from '@shared/ui/inputs/input-password/ui/InputPassword.tsx';
import InputPhone from '@shared/ui/inputs/input-phone/ui/InputPhone.tsx';
import cl from './AuthModal.module.scss';

interface IAuthFormData {
  phone: string;
  password: string;
}

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: FC<IAuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, isAuthenticated } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitted },
    reset,
  } = useForm<IAuthFormData>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    (data: IAuthFormData) => {
      const result = signIn(data.phone, data.password);
      if (!result.success) {
        setError('phone', { message: result.message });
      } else {
        reset();
        onClose();
      }
    },
    [signIn, setError, reset, onClose],
  );

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleStopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isOpen || isAuthenticated) return null;

  return (
    <div className={cl.overlay} onClick={handleCloseClick}>
      <div className={cl.modal} onClick={handleStopPropagation}>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
          <h2 className={cl.title}>Вход</h2>

          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Поле является обязательным',
              minLength: {
                value: 11,
                message: 'Минимальная длина 11 символов',
              },
            }}
            render={({ field, fieldState }) => (
              <InputPhone
                value={field.value}
                onChange={(_, raw) => field.onChange(raw)}
                error={fieldState.error?.message}
                isSubmitted={isSubmitted}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Поле является обязательным',
              minLength: {
                value: 8,
                message: 'Минимальная длина 8 символов',
              },
            }}
            render={({ field, fieldState }) => (
              <InputPassword
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                isSubmitted={isSubmitted}
              />
            )}
          />

          <button type="submit">Войти</button>
        </form>
        <button type="button" className={cl.closeBtn} onClick={handleCloseClick}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default memo(AuthModal);