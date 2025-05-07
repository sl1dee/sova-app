import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@features/auth/lib/useAuth.ts';
import InputPassword from '@shared/ui/inputs/input-password/ui/InputPassword.tsx';
import InputPhone from '@shared/ui/inputs/input-phone/ui/InputPhone.tsx';
import type { IAuthFormData, IAuthModalProps } from '../types';
import cl from './AuthModal.module.scss';

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

  const onSubmit = (data: IAuthFormData) => {
    const result = signIn(data.phone, data.password);
    if (!result.success) {
      setError('phone', { message: result.message });
    } else {
      reset();
      onClose();
    }
  };

  if (!isOpen || isAuthenticated) return null;

  return (
    <div className={cl.overlay} onClick={onClose}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
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
        <button className={cl.closeBtn} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default AuthModal;