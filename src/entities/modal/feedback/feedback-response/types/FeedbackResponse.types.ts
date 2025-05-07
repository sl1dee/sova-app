export interface IFeedbackResponseData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  comment: string;
  userId?: string;
  birthDate?: string;
}

export interface IFeedbackResponseProps {
  isOpen: boolean;
  onClose: () => void;
  data: IFeedbackResponseData;
}