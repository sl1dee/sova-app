export interface IFeedbackModalData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  comment: string;
  id?: number;
  birthday?: string;
}

export interface IFeedbackModalProps {
  onSubmit?: (data: IFeedbackModalData) => void;
  onClose: () => void;
}