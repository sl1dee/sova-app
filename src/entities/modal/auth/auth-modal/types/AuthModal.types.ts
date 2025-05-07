export interface IAuthFormData {
  phone: string;
  password: string;
}

export interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}