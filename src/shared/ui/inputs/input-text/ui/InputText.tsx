import { FC, memo } from 'react';
import type { FieldError } from 'react-hook-form';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import cl from './InputText.module.scss';

interface IInputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError;
  placeholder: string;
  isSubmitted?: boolean;
}

const TextInput: FC<IInputTextProps> = ({ error, placeholder, ...props }) => {
  return (
    <div className={cl.container}>
      <InputBase type="text" placeholder={placeholder} {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error?.message}</span>}
    </div>
  );
};

export default memo(TextInput);
