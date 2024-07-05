import React from "react";
import { GiCancel } from "react-icons/gi";

const Modal = ({ isOpen, onClose, children, header = "" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto w-full">
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white w-full md:w-[700px] p-8 rounded-lg flex flex-col items-start">
          {/* header */}
          <div className="flex items-start justify-between w-full">
            {header && <p className="text-2xl font-bold">{header}</p>}
            <button
              onClick={onClose}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              <GiCancel size={25} />
            </button>
          </div>
          {/* children */}
          <div className="mt-8 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
