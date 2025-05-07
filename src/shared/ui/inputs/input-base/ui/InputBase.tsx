import { FC, memo } from 'react';
import type { IInputBaseProps } from '../types';
import cl from './InputBase.module.scss';

const InputBase: FC<IInputBaseProps> = ({ value, onChange, type = 'text', placeholder, ...props }) => {
  return (
    <input className={cl.input} type={type} value={value} onChange={onChange} placeholder={placeholder} {...props} />
  );
};

export default memo(InputBase);
