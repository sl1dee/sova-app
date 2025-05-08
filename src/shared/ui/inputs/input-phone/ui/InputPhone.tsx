import { FC, memo, useCallback, useState } from 'react';
import type { FieldError } from 'react-hook-form';
import { getRawPhoneFromParsedPhone, parseRawPhone } from '@shared/lib/phone-mask';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import cl from './InputPhone.module.scss';

interface IInputPhoneProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, rawPhone: string) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
  minLength?: number;
}

const InputPhone: FC<IInputPhoneProps> = ({ value, onChange, error, ...props }) => {
  const [viewPhone, setViewPhone] = useState(value || '');

  const changePhoneHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawPhone = getRawPhoneFromParsedPhone(e.target.value, viewPhone);
      const newViewPhone = parseRawPhone(rawPhone);

      setViewPhone(newViewPhone);
      if (onChange) {
        onChange(e, rawPhone);
      }
    },
    [viewPhone, onChange],
  );

  return (
    <div className={cl.container}>
      <InputBase {...props} value={viewPhone} onChange={changePhoneHandler} placeholder="+7 (___) ___-__-__" />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputPhone);
