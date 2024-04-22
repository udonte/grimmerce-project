import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropDown";
import Button from "../components/Button";
import axiosInstance from "../helperFunctions/axios.utlil";
import Spinner from "../components/Spinner/Spinner";
import { toast } from "react-toastify";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data); // You can handle form submission here
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/user/register", data);
      console.log(response);
      setIsLoading(false);

      console.log("signup Successful");
      toast.success("signup Successful");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex items-start">
        <div className="w-1/2 bg-red-900 h-screen"></div>
        <div className="w-1/2 flex items-start justify-center py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[50%]">
            <p className="text-2xl font-bold mb-8">Sign Up</p>
            {/* First Name */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">First Name</label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                placeholder="Enter First Name"
                type="text"
                {...register("firstName", {
                  required: "A first name is required",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.first_name?.message}
              </p>
            </div>
            {/* Last Name */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">Last Name</label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                placeholder="Enter Last Name"
                type="text"
                {...register("lastName", {
                  required: "A last name is required",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.last_name?.message}
              </p>
            </div>
            {/* Email */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">Email</label>
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
            {/* Phone Number */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">Phone Number</label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                placeholder="Enter Phone Number"
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.phone_number?.message}
              </p>
            </div>
            {/* User Type */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">User Type</label>
              <select
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                {...register("userType", {
                  required: "User Type is required",
                })}
              >
                <option value="">Select User Type</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              <p className="text-red-500 text-xs">
                {errors.user_type?.message}
              </p>
            </div>
            {/* Password */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">Password</label>
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
            {/* Confirm Password */}
            <div className="mb-2 w-full">
              <label className="text-gray-500 font-bold">
                Confirm Password
              </label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2"
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.confirm_password?.message}
              </p>
            </div>
            {/* Submit Button */}
            <div className="w-full text-center">
              <Button type="submit">
                {isLoading ? <Spinner /> : "Create Account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
