import React from "react";

const Button = ({ size, color, children, onClick, className, icon, type }) => {
  const sizes = {
    icon: "px-2 py-2 flex justify-center items-center",
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const colors = {
    primary: "bg-red-800 text-white rounded",
    secondary: "bg-white border-2 rounded",
    icon: "bg-gurugeeks-dark-100 border-1 rounded-full",
  };

  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${sizeClass} ${colorClass} flex justify-center items-center gap-x-2 hover:bg-opacity-75 transition duration-300 w-full text-center font-bold`}
    >
      {icon && <p className="text-center">{icon}</p>} {children}
    </button>
  );
};

export default Button;
