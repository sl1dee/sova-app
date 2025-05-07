import type { FieldError } from 'react-hook-form';

export interface IInputEmailProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
}
