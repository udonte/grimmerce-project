import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CustomDropdown = ({
  options,
  onSelect,
  placeHolder = "Select",
  label = "Label",
  ref,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue, optionLabel) => {
    setSelectedOption(optionLabel);
    setIsOpen(false);
    onSelect(optionValue);
  };

  return (
    <div className="relative">
      <p className=" text-gray-500 font-bold">{label}</p>
      <div
        ref={ref}
        onClick={toggleDropdown}
        className="h-[40px] flex items-center px-3 text-black border-2 bg-slate-50 rounded-md focus:outline-none focus:bg-blue-600"
      >
        {!selectedOption ? (
          <div className="flex justify-between items-center w-full">
            <p>{placeHolder} </p>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        ) : (
          <div className="flex justify-between items-center w-full">
            <p>{selectedOption}</p>{" "}
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full  max-h-[350px] overflow-auto  bg-white border border-gray-300 shadow-lg rounded-lg z-10">
          {options?.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option.value, option.label)}
              className="h-[40px] flex items-center w-full border-b-2 px-4 py-2 gap-x-6 hover:bg-gray-100 cursor-pointer"
            >
              <div>{option.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
