export interface IInputCalendarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  isSubmitted?: boolean;
}