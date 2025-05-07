import { FC, memo } from 'react';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import type { IInputTextProps } from '../types';
import cl from './InputText.module.scss';

const TextInput: FC<IInputTextProps> = ({ error, placeholder, isSubmitted, ...props }) => {
  return (
    <div className={cl.container}>
      <InputBase type="text" placeholder={placeholder} {...props} />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error?.message}</span>}
    </div>
  );
};

export default memo(TextInput);
