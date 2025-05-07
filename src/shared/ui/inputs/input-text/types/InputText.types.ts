import type { FieldError } from 'react-hook-form';

export interface IInputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError;
  placeholder: string;
  isSubmitted?: boolean;
}
