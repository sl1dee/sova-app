import { memo, useCallback, useState } from 'react';
import FeedbackModal from '@entities/modal/feedback/feedback-modal';
import type { IFeedbackModalData } from '@entities/modal/feedback/feedback-modal/ui/feedback-modal.tsx';
import FeedbackResponse from '@entities/modal/feedback/feedback-response';
// import cl from './feedback.module.scss';

const Feedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<IFeedbackModalData>();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCloseResponse = useCallback(() => {
    setIsResponseOpen(false);
  }, []);

  const handleFormSubmit = useCallback((data: IFeedbackModalData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsModalOpen(false);
    setIsResponseOpen(true);
  }, []);

  return (
    <>
      <button onClick={handleOpenModal}>Feedback</button>
      {isModalOpen && <FeedbackModal onSubmit={handleFormSubmit} onClose={handleCloseModal} />}
      {submittedData && <FeedbackResponse data={submittedData} isOpen={isResponseOpen} onClose={handleCloseResponse} />}
    </>
  );
};

export default memo(Feedback);