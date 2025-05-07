import { FC, memo } from 'react';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import type { IInputPasswordProps } from '../types';
import cl from './InputPassword.module.scss';

const InputPassword: FC<IInputPasswordProps> = ({ value, onChange, error, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={cl.container}>
      <InputBase value={value} onChange={handleChange} placeholder="Введите пароль" type="password" {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputPassword);
