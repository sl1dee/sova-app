import { FC, memo, useCallback, useEffect, useState } from 'react';
import type { FieldError } from 'react-hook-form';
import InputBase from '@shared/ui/inputs/input-base/ui/input-base.tsx';
import { getRawPhoneFromParsedPhone, parseRawPhone } from '@shared/utils/phone-mask';
import cl from './input-phone.module.scss';

interface IInputPhoneProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, rawPhone: string) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
  minLength?: number;
}

const InputPhone: FC<IInputPhoneProps> = ({ value, onChange, error, ...props }) => {
  const [viewPhone, setViewPhone] = useState(() => (value ? parseRawPhone(value) : ''));

  useEffect(() => {
    if (value !== undefined) {
      const parsedValue = parseRawPhone(value);
      if (parsedValue !== viewPhone) {
        setViewPhone(parsedValue);
      }
    }
  }, [value, viewPhone]);

  const changePhoneHandler = useCallback(
    (inputValue: string) => {
      const rawPhone = getRawPhoneFromParsedPhone(inputValue, viewPhone); // Преобразует отформатированный номер в сырой
      const newViewPhone = parseRawPhone(rawPhone); // Преобразует сырой номер обратно в отформатированный для отображения

      setViewPhone(newViewPhone);

      if (onChange) {
        onChange({ target: { value: inputValue } } as React.ChangeEvent<HTMLInputElement>, rawPhone);
      }
    },
    [onChange, viewPhone],
  );

  return (
    <div className={cl.container}>
      <InputBase {...props} value={viewPhone} onChange={changePhoneHandler} placeholder="+7 (___) ___-__-__" />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputPhone);
