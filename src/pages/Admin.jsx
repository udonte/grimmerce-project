import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropDown";
import Button from "../components/Button";
import axiosInstance from "../helperFunctions/axios.utlil";
import Spinner from "../components/Spinner/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFilename, setImageFilename] = useState("");
  const CurrencyFormat = require("react-currency-format");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const categories = [
    "Electronics",
    "Home Appliances",
    "Fashion",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Wellness",
    "Automotive",
    "Furniture & Home Decor",
  ];

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();

    console.log(e.target.files[0]);
    formData.append("image", imageFile);

    try {
      const response = await axiosInstance.post(
        "http://216.158.239.94:5100/api/v1/files/upload",
        formData
      );
      setImageFilename(response.data.data.image);
      console.log("image response", response.data.data.image);
      console.log(imageFile);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const productData = { ...data, imageFilename };
      console.log(productData);
      const response = await axiosInstance.post("product", productData);
      console.log(response.data.data);
      toast.success("Product Created");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Product creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="hidden md:block md:w-1/2 bg-red-900 h-full"></div>
      <div className="w-full md:w-1/2 flex items-start justify-center md:px-0 h-full px-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[50%] h-full py-4"
        >
          <p className="text-2xl font-bold">Create Product</p>
          <p className="mb-8 text-xs">Kindly fill the product details</p>

          {/* Image File */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Product Image</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              type="file"
              onChange={handleImageUpload}
            />
            <p className="text-red-500 text-xs">
              {errors.imageFilename?.message}
            </p>
          </div>

          {/* Product Name */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Product Name</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter Product Name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            <p className="text-red-500 text-xs">{errors.name?.message}</p>
          </div>

          {/* Brand Name */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Brand</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter Brand Name"
              type="text"
              {...register("brand", { required: "Brand is required" })}
            />
            <p className="text-red-500 text-xs">{errors.brand?.message}</p>
          </div>

          {/* Amount */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Amount</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter Amount"
              type="number"
              {...register("amount", { required: "An amount is required" })}
            />
            <p className="text-red-500 text-xs">{errors.amount?.message}</p>
          </div>

          {/* Description */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Description</label>
            <textarea
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <p className="text-red-500 text-xs">
              {errors.description?.message}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Quantity</label>
            <input
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              placeholder="Enter Quantity"
              type="number"
              {...register("quantity", { required: "Quantity is required" })}
            />
            <p className="text-red-500 text-xs">{errors.quantity?.message}</p>
          </div>

          {/* Category */}
          <div className="mb-2 w-full">
            <label className="text-gray-500 font-bold">Category</label>
            <select
              className="h-[30px] outline-none w-full border-[1px] focus:border-red-700 rounded-lg shadow-sm my-2 py-1 px-2 text-xs placeholder:text-xs placeholder:text-gray-200"
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.toLowerCase()}>
                    {category}
                  </option>
                );
              })}
            </select>
            <p className="text-red-500 text-xs">{errors.category?.message}</p>
          </div>

          {/* Submit Button */}
          <div className="w-full text-center">
            <Button type="submit">
              {isLoading ? <Spinner /> : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
