import { FC, memo, useCallback } from 'react';
import type { FieldError } from 'react-hook-form';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import cl from './InputPassword.module.scss';

interface IInputPasswordProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
  minLength?: number;
}

const InputPassword: FC<IInputPasswordProps> = ({ value, onChange, error, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    },
    [onChange],
  );

  return (
    <div className={cl.container}>
      <InputBase value={value} onChange={handleChange} placeholder="Введите пароль" type="password" {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputPassword);
