import React from "react";
import { GiCancel } from "react-icons/gi";

const Modal = ({ isOpen, onClose, children, header = "", size = "md" }) => {
  if (!isOpen) return null;

  // Define size classes for different modal widths
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-2xl", // Default size
    lg: "max-w-4xl",
  };

  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto"
      style={{
        scrollbarWidth: "thin" /* For Firefox */,
        WebkitScrollbarWidth: "thin" /* For WebKit-based browsers */,
        scrollbarTrackColor: "#f1f1f1",
        scrollbarColor: "#E2E4E8 #ffffff",
        borderRadius: "4px",
      }}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative bg-white w-full ${sizeClasses[size]} p-6 md:p-8 rounded-lg shadow-lg mx-4 sm:mx-6 md:mx-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
          {header && <p className="text-xl md:text-2xl font-bold">{header}</p>}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <GiCancel size={25} />
          </button>
        </div>

        {/* Content */}
        <div
          className="w-full overflow-y-auto max-h-[70vh]"
          style={{
            scrollbarWidth: "thin",
            WebkitScrollbarWidth: "thin",
            scrollbarTrackColor: "#f1f1f1",
            scrollbarColor: "#E2E4E8 #ffffff",
            borderRadius: "4px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
