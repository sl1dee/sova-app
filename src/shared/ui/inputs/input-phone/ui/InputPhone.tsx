import { FC, memo, useState } from 'react';
import { getRawPhoneFromParsedPhone, parseRawPhone } from '@shared/lib/phone-mask';
import InputBase from '@shared/ui/inputs/input-base/ui/InputBase.tsx';
import type { IInputPhoneProps } from '../types';
import cl from './InputPhone.module.scss';

const InputPhone: FC<IInputPhoneProps> = ({ value, onChange, error, ...props }) => {
  const [viewPhone, setViewPhone] = useState(value || '');

  const changePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPhone = getRawPhoneFromParsedPhone(e.target.value, viewPhone);
    const newViewPhone = parseRawPhone(rawPhone);

    setViewPhone(newViewPhone);
    if (onChange) {
      onChange(e, rawPhone);
    }
  };

  return (
    <div className={cl.container}>
      <InputBase {...props} value={viewPhone} onChange={changePhoneHandler} placeholder="+7 (___) ___-__-__" />
      {error && <span className={cl.error}>{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
};

export default memo(InputPhone);
