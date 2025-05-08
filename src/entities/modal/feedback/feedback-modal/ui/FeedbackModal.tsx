import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@features/auth';
import InputCalendar from '@shared/ui/inputs/input-calendar/ui/InputCalendar.tsx';
import InputEmail from '@shared/ui/inputs/input-email/ui/InputEmail.tsx';
import InputPhone from '@shared/ui/inputs/input-phone/ui/InputPhone.tsx';
import InputText from '@shared/ui/inputs/input-text/ui/InputText.tsx';
import cl from './FeedbackModal.module.scss';

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

  const handleFormSubmit = (data: IFeedbackModalData) => {
    const enrichedData = {
      ...data,
      id: isAuthenticated ? user?.id : undefined,
      birthday: isAuthenticated ? user?.birthday : undefined,
    };

    if (onSubmit) {
      onSubmit(enrichedData);
    }
    reset();
  };

  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Форма обратной связи</h2>
      <form className={cl.form} onSubmit={handleSubmit(handleFormSubmit)}>
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
              placeholder={'ФИО'}
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
            <div className={cl.textareaContainer}>
              <textarea
                className={cl.textarea}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Комментарий"
                rows={4}
              />
              {fieldState.error && isSubmitted && <span className={cl.error}>{fieldState.error.message}</span>}
            </div>
          )}
        />

        <div className={cl.buttonContainer}>
          <button type="submit" className={cl.submitButton}>
            Отправить
          </button>
          <button type="button" className={cl.cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackModal;