import { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@features/auth';
import InputCalendar from '@shared/ui/inputs/input-calendar';
import InputEmail from '@shared/ui/inputs/input-email';
import InputPhone from '@shared/ui/inputs/input-phone';
import InputText from '@shared/ui/inputs/input-text';
import InputTextarea from '@shared/ui/inputs/input-textarea';
import cl from './feedback-modal.module.scss';

export interface IFeedbackModalData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  comment: string;
  id?: number;
  birthday?: string;
}

interface IFeedbackModalProps {
  onSubmit?: (data: IFeedbackModalData) => void;
  onClose: () => void;
}

const FeedbackModal: FC<IFeedbackModalProps> = ({ onSubmit, onClose }) => {
  const { user, isAuthenticated } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
    reset,
  } = useForm<IFeedbackModalData>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      date: '',
      comment: '',
    },
  });

  const handleFormSubmit = useCallback(
    (data: IFeedbackModalData) => {
      const enrichedData = {
        ...data,
        id: isAuthenticated ? user?.id : undefined,
        birthday: isAuthenticated ? user?.birthday : undefined,
      };

      onSubmit?.(enrichedData);
      reset();
    },
    [isAuthenticated, user, onSubmit, reset],
  );

  const handleCloseClick = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handleStopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={cl.overlay} onClick={handleCloseClick}>
      <div className={cl.modal} onClick={handleStopPropagation}>
        <form className={cl.form} onSubmit={handleSubmit(handleFormSubmit)}>
          <h2 className={cl.title}>Feedback form</h2>

          <Controller
            name="fullName"
            control={control}
            rules={{
              required: 'Поле является обязательным',
              minLength: {
                value: 2,
                message: 'Минимальная длина 2 символа',
              },
            }}
            render={({ field, fieldState }) => (
              <InputText
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                placeholder={'Full name'}
                isSubmitted={isSubmitted}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Поле является обязательным',
              minLength: {
                value: 11,
                message: 'Минимальная длина 11 символов',
              },
            }}
            render={({ field, fieldState }) => (
              <InputPhone
                value={field.value}
                onChange={(_, raw) => field.onChange(raw)}
                error={fieldState.error?.message}
                isSubmitted={isSubmitted}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Поле является обязательным',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес',
              },
            }}
            render={({ field, fieldState }) => (
              <InputEmail
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                isSubmitted={isSubmitted}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{
              required: 'Поле является обязательным',
            }}
            render={({ field, fieldState }) => (
              <InputCalendar
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                isSubmitted={isSubmitted}
              />
            )}
          />

          <Controller
            name="comment"
            control={control}
            rules={{
              required: 'Поле является обязательным',
              minLength: {
                value: 10,
                message: 'Комментарий должен содержать не менее 10 символов',
              },
            }}
            render={({ field, fieldState }) => (
              <InputTextarea
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                placeholder="Comment"
                isSubmitted={isSubmitted}
              />
            )}
          />

          <div className={cl.buttonContainer}>
            <button type="submit" className={cl.submitButton}>
              Submit
            </button>
            <button type="button" className={cl.cancelButton} onClick={handleCloseClick}>
              Cancel
            </button>
          </div>
        </form>
        <button type="button" className={cl.closeBtn} onClick={handleCloseClick}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;