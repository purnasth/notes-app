import React from 'react';
import Modal from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div>
        <h3 className="text-base font-semibold md:text-xl">Are you sure?</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <hr className="my-8" />
        <div className="flex justify-start gap-3">
          <button
            type="button"
            aria-label="Cancel"
            onClick={onClose}
            className="transition-200 rounded-full border border-gray-300 bg-white px-5 py-2 text-base font-medium text-dark hover:bg-gray-100 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            aria-label="Confirm"
            onClick={onConfirm}
            className="transition-200 base-red-600 rounded-full border bg-red-600 px-5 py-2 text-base font-medium text-white hover:bg-red-500 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
