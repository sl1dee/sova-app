import { FC, memo } from 'react';
import cl from './InputBase.module.scss';

interface IInputBaseProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
}

const InputBase: FC<IInputBaseProps> = ({ value, onChange, type = 'text', placeholder, ...props }) => {
  return (
    <input className={cl.input} type={type} value={value} onChange={onChange} placeholder={placeholder} {...props} />
  );
};

export default memo(InputBase);
