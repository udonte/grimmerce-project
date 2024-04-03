import React from "react";

const CustomInput = ({
  label,
  type,
  placeholder,
  name,
  value,
  ref,
  onChange,
}) => {
  return (
    <div>
      <label className=" text-gray-500 font-bold">{label}</label>
      <input
        className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
};

export default CustomInput;
