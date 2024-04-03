import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import CustomCheckbox from "../components/CustomCheckbox";

const ForgotPassword = () => {
  const [formData, setFormData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    console.log(data); // You can handle form submission here
  };

  return (
    <div>
      <div className="w-full h-screen flex items-start">
        <div className="w-1/2 bg-red-900 h-screen"></div>
        <div className="w-1/2 flex items-start justify-center py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[50%]">
            <p className="text-2xl font-bold mb-8">Forgot Password?</p>
            <div className="mb-2 w-full">
              <label className=" text-gray-500 font-bold">Email</label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                placeholder="Enter Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="text-red-500 text-xs">{errors.email?.message}</p>
            </div>
            <div className="w-full text-center mb-6">
              <Button type="submit">Submit Email</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
