import { FC, useEffect } from 'react';
import { useAuth } from '@features/auth';
import cl from './FeedbackResponse.module.scss';

interface IFeedbackResponseData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  comment: string;
  userId?: string;
  birthDate?: string;
}

interface IFeedbackResponseProps {
  isOpen: boolean;
  onClose: () => void;
  data: IFeedbackResponseData;
}

const FeedbackResponse: FC<IFeedbackResponseProps> = ({ isOpen, onClose, data }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={cl.overlay} onClick={onClose}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={cl.title}>Спасибо за обращение!</h2>
        <div className={cl.formData}>
          <div className={cl.dataRow}>
            <span className={cl.label}>Full name:</span>
            <span className={cl.value}>{data.fullName}</span>
          </div>
          <div className={cl.dataRow}>
            <span className={cl.label}>Phone number:</span>
            <span className={cl.value}>{data.phone}</span>
          </div>
          <div className={cl.dataRow}>
            <span className={cl.label}>Email:</span>
            <span className={cl.value}>{data.email}</span>
          </div>
          <div className={cl.dataRow}>
            <span className={cl.label}>Date: </span>
            <span className={cl.value}>{new Date(data.date).toLocaleDateString('ru-RU')}</span>
          </div>
          <div className={cl.dataRow}>
            <span className={cl.label}>Comment:</span>
            <span className={cl.value}>{data.comment}</span>
          </div>
          {user?.id && (
            <div className={cl.dataRow}>
              <span className={cl.label}>User Id:</span>
              <span className={cl.value}>{user.id}</span>
            </div>
          )}
          {user?.birthday && (
            <div className={cl.dataRow}>
              <span className={cl.label}>Birthday date:</span>
              <span className={cl.value}>{new Date(user.birthday).toLocaleDateString('ru-RU')}</span>
            </div>
          )}
        </div>
        <button className={cl.closeBtn} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default FeedbackResponse;