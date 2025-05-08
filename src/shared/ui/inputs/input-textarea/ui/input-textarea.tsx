import { FC, memo, useCallback } from 'react';
import type { FieldError } from 'react-hook-form';
import cl from './input-textarea.module.scss';

interface IInputTextareaProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | FieldError;
  placeholder: string;
  isSubmitted?: boolean;
  rows?: number;
}

const InputTextarea: FC<IInputTextareaProps> = ({ value, onChange, error, placeholder, isSubmitted, rows = 4 }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={cl.container}>
      <textarea className={cl.textarea} value={value} onChange={handleChange} placeholder={placeholder} rows={rows} />
      {error && isSubmitted && <span className={cl.error}>{typeof error === 'string' ? error : error?.message}</span>}
    </div>
  );
};

export default memo(InputTextarea);