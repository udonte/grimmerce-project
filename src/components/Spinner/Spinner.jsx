import React from "react";
import { ImSpinner6 } from "react-icons/im";

const Spinner = ({ className }) => {
  return (
    <div>
      <ImSpinner6 className={`animate-spin ${className}`} />
    </div>
  );
};

export default Spinner;
