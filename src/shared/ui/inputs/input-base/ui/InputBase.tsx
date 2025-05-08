import { FC, memo, useCallback } from 'react';
import cl from './InputBase.module.scss';

interface IInputBaseProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder: string;
}

const InputBase: FC<IInputBaseProps> = ({ value, onChange, type = 'text', placeholder, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      className={cl.input}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default memo(InputBase);
