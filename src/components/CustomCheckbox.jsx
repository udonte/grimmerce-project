import React from "react";

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-red-600"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
