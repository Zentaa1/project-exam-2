import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Success</h2>
        <p className="text-xl mb-6 text-center">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-customOrange text-white px-6 py-2 rounded-md font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
