import React, { useState, useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeWithAnimation = () => {
    setShowModal(false);
    setTimeout(onClose, 300);
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      className={`transition-700 fixed inset-0 z-50 flex size-full items-center justify-center bg-dark/70 backdrop-blur ${
        showModal ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
      onClick={closeWithAnimation}
    >
      <div
        className={`transition-700 relative w-[90%] max-w-xl transform bg-white p-6 shadow-lg md:w-full md:p-10 ${
          showModal ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeWithAnimation}
          className="absolute right-5 top-5 text-xl text-dark"
          aria-label="Close"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
