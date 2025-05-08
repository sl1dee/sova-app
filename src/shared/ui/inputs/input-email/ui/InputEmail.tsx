import { FC, memo, useCallback } from 'react';
import type { FieldError } from 'react-hook-form';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import cl from './InputEmail.module.scss';

interface IInputEmailProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
}

const InputEmail: FC<IInputEmailProps> = ({ value, onChange, error, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    },
    [onChange],
  );

  return (
    <div className={cl.container}>
      <InputBase value={value} onChange={handleChange} placeholder="example@domain.com" type="email" {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputEmail);
