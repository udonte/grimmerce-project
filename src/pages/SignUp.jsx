import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropDown";
import Button from "../components/Button";
import axiosInstance from "../helperFunctions/axios.utlil";
import Spinner from "../components/Spinner/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
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
      navigate("/account-created");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" h-screen flex">
      <div className="hidden lg:flex md:w-1/2 bg-red-900 h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className=" text-white text-[100px]">Grimmerce</p>
          <p className="text-white">The Best Market place</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-start justify-center py-4 px-4 lg:px-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[50%] h-full py-4"
        >
          <p className="text-2xl font-bold mb-8">Sign Up</p>

          {/* First Name */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">First Name</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter First Name"
              type="text"
              {...register("firstName", {
                required: "A first name is required",
              })}
            />
            <p className="text-red-500 text-xs">{errors.first_name?.message}</p>
          </div>

          {/* Last Name */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Last Name</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter Last Name"
              type="text"
              {...register("lastName", {
                required: "A last name is required",
              })}
            />
            <p className="text-red-500 text-xs">{errors.last_name?.message}</p>
          </div>

          {/* Email */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Email</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
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
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
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
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              {...register("userType", {
                required: "User Type is required",
              })}
            >
              <option value="">Select User Type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <p className="text-red-500 text-xs">{errors.user_type?.message}</p>
          </div>

          {/* Password */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Password</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
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
            <label className="text-gray-500 font-bold">Confirm Password</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
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

          <div
            className="text-red-700 cursor-pointer font-bold text-sm text-center mt-4"
            onClick={() => navigate("/")}
          >
            Go Back to Home
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
