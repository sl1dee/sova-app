import type { FieldError } from 'react-hook-form';

export interface IInputPhoneProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, rawPhone: string) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
  minLength?: number;
}
