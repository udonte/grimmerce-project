import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import CustomCheckbox from "../components/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helperFunctions/axios.utlil";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";

const LogIn = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/login", data);

      setIsLoading(false);
      toast.success("Login successful");
      //use effect to check if token is in the local storage
      localStorage.setItem("access_token", `${response.data.data.accessToken}`);
      console.log(response.data.data);
      response.data.data.userType === "seller"
        ? navigate("/admin")
        : navigate("/dashboard", { state: response.data.data });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" h-screen flex">
      <div className="w-full h-screen flex item-start lg:items-center">
        <div className="hidden lg:flex md:w-1/2 bg-red-900 h-screen">
          <div className="flex flex-col items-center justify-center w-full">
            <p className=" text-white text-[100px]">Grimmerce</p>
            <p className="text-white">The Best Market place</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-start justify-center py-4 px-4 lg:px-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[50%] "
          >
            <p className="text-2xl font-bold mb-8">Log in</p>
            <div className="mb-2 w-full">
              <label className=" text-gray-500 font-bold">Email</label>
              <input
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 placeholder:text-sm placeholder:text-gray-200"
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
                className="h-[40px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 placeholder:text-sm placeholder:text-gray-200"
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
                <p className="text-xs text-gray-600">Remember me</p>
              </div>

              <p
                className="text-red-700 text-xs font-bold cursor-pointer"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgotten Password?
              </p>
            </div>
            <div className="w-full text-center mb-6">
              <Button type="submit">
                {" "}
                {isLoading ? <Spinner /> : "Login"}
              </Button>
            </div>
            <div className="text-center">
              <p className=" font-bold text-sm">
                Dont't have an account?{" "}
                <span
                  className="text-red-700 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
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
    </div>
  );
};

export default LogIn;
