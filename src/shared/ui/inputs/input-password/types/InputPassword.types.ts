import type { FieldError } from 'react-hook-form';

export interface IInputPasswordProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError;
  isSubmitted?: boolean;
  minLength?: number;
}
