import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import CustomCheckbox from "../components/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helperFunctions/axios.utlil";

const LogIn = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    console.log(data); // You can handle form submission here
    try {
      const response = axiosInstance.post("", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <pre>{JSON.stringify(formData, undefined, 2)}</pre>
      <div className="w-full h-screen flex items-start">
        <div className="w-1/2 bg-red-900 h-screen"></div>
        <div className="w-1/2 flex items-start justify-center py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[50%]">
            <p className="text-2xl font-bold mb-8">Log in</p>
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
            <div className="mb-2 w-full">
              <label className=" text-gray-500 font-bold">Password</label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                placeholder="Enter Password"
                type="password"
                {...register("password", {
                  required: "A password is required",
                  minLength: {
                    value: 8,
                    message: "The minimum characters is 8",
                  },
                })}
              />
              <p className="text-red-500 text-xs">{errors.password?.message}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <input
                  className="border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                  type="checkbox"
                  {...register("remember_me")}
                />
                <p className="text-xs font-bold text-gray-600">Remember me</p>
              </div>

              <p
                className="text-red-700 font-bold cursor-pointer"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgotten Password?
              </p>
            </div>
            <div className="w-full text-center mb-6">
              <Button type="submit">Login</Button>
            </div>
            <div className="text-center">
              <p className=" font-bold text-sm">
                Dont't have an account?{" "}
                <span
                  className="text-red-700 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
