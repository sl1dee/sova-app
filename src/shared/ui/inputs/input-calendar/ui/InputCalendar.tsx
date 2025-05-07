import { FC, memo } from 'react';
import type { IInputCalendarProps } from '../types';
import cl from './InputCalendar.module.scss';

const InputCalendar: FC<IInputCalendarProps> = ({
  value,
  onChange,
  placeholder = 'Выберите дату',
  error,
  isSubmitted,
}) => {
  return (
    <div className={cl.calendar}>
      <input
        className={cl.input}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && isSubmitted && <span className={cl.error}>{error}</span>}
    </div>
  );
};

export default memo(InputCalendar);