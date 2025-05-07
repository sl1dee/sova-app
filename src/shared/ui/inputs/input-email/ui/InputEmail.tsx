import { FC, memo } from 'react';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import type { IInputEmailProps } from '../types';
import cl from './InputEmail.module.scss';

const InputEmail: FC<IInputEmailProps> = ({ value, onChange, error, isSubmitted, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={cl.container}>
      <InputBase value={value} onChange={handleChange} placeholder="example@domain.com" type="email" {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputEmail);
