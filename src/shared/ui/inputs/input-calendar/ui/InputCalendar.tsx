import { FC, memo, useCallback } from 'react';
import InputBase from '@shared/ui/inputs/input-base';
import cl from './InputCalendar.module.scss';

interface IInputCalendarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  isSubmitted?: boolean;
}

const InputCalendar: FC<IInputCalendarProps> = ({
  value,
  onChange,
  placeholder = 'Выберите дату',
  error,
  isSubmitted,
}) => {
  const handleChange = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange],
  );
  return (
    <div className={cl.calendar}>
      <InputBase type="date" value={value} onChange={handleChange} placeholder={placeholder} />
      {error && isSubmitted && <span className={cl.error}>{error}</span>}
    </div>
  );
};

export default memo(InputCalendar);