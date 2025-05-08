import { FC, memo, useCallback } from 'react';
import type { FieldError } from 'react-hook-form';
import InputBase from '@shared/ui/inputs/input-base/ui/input-base.tsx';
import cl from './input-text.module.scss';

interface IInputTextProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | FieldError;
  placeholder: string;
  isSubmitted?: boolean;
}

const TextInput: FC<IInputTextProps> = ({ error, onChange, placeholder, ...props }) => {
  const handleChange = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <div className={cl.container}>
      <InputBase type="text" placeholder={placeholder} onChange={handleChange} {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error?.message}</span>}
    </div>
  );
};

export default memo(TextInput);
