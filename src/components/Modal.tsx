'use client';

import type { ModalProps } from '@/types/Other';

const Modal = ({ isOpen, onCloseAction, children, title }: ModalProps) => {
  return (
    <>
      {
        isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  type="button"
                  onClick={onCloseAction}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              {children}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Modal;
