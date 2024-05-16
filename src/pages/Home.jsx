import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegUser, FaSearch, FaSignInAlt } from "react-icons/fa";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import Cloth1 from "../assets/images/img (1).jpg";
import data from "../data/data";
import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";
import ProductDetailsModal from "../components/ProductDetailsModal";

const Home = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isLogged = localStorage.getItem("access_token") ? true : false;

  console.log(isLogged);

  const categories = [
    "Electronics",
    "Home & Kitchen",
    "Accessories",
    "Fitness & Health",
    "Appliances",
    "Decorations",
    "Men Wear",
    "Baby Toys",
  ];
  return (
    <div className="w-full flex flex-col">
      {/* nav */}
      <nav>
        <div className="flex items-center">
          <div className="flex items-center justify-center bg-white w-[200px] text-red-900 font-bold ">
            Grimmerce
          </div>
          <div className="bg-red-900 p-2 md:p-8 w-full flex items-center justify-between gap-4">
            <div className="flex items-center bg-white rounded-md py-1 px-2 md:py-4 md:px-8 lg:w-1/2 w-full">
              <FaSearch />
              <input
                type="search"
                name=""
                id=""
                placeholder="Search item"
                className="ml-4 pl-4 border-none outline-none w-full "
              />
            </div>
            {/* large screensign up */}
            <div className="hidden lg:w-1/2 text-white lg:flex lg:items-center lg:justify-end lg:gap-8">
              <div
                className="flex items-end gap-1 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <FaRegUser color="#fff" size={20} />

                <p>Signup</p>
              </div>

              <div
                className="flex items-end gap-1 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <FaSignInAlt color="#fff" size={20} />
                <p>Login</p>
              </div>
            </div>

            <div className="flex items-center justify-end lg:hidden relative">
              <div className="cursor-pointer">
                {toggleMenu ? (
                  <RiCloseLine
                    color="#fff"
                    size={27}
                    onClick={() => setToggleMenu(false)}
                  />
                ) : (
                  <RiMenu3Line
                    color="#fff"
                    size={27}
                    onClick={() => setToggleMenu(true)}
                  />
                )}
              </div>

              {toggleMenu && (
                <div className="flex flex-col absolute bg-white top-10 rounded border-gray-800 border-[1px] text-sm">
                  <div
                    className="flex justify-end items-center cursor-pointer py-2 px-4 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded"
                    onClick={() => navigate("/signup")}
                  >
                    <p>Signup</p>
                  </div>

                  <div
                    className="flex items-center justify-end cursor-pointer py-2 px-4 hover:bg-red-50 rounded"
                    onClick={() => navigate("/login")}
                  >
                    <p>Login</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* end of nav */}

      {/* category */}
      <div className="bg-gray-800 py-1 px-2 ">
        <div className="hidden lg:flex items-center gap-8">
          {categories.map((item, index) => (
            <div key={index} className="cursor-pointer text-xl text-white">
              {item}
            </div>
          ))}
        </div>

        <div
          className="lg:hidden text-white text-xs flex items-center justify-center gap-8 overflow-x-auto max-w-full whitespace-nowrap px-4"
          style={{
            scrollbarWidth: "thin" /* For Firefox */,
            WebkitScrollbarWidth: "thin" /* For WebKit-based browsers */,
            scrollbarTrackColor:
              "#f1f1f1" /* Background color of the scrollbar track */,
            scrollbarColor:
              "#888 #f1f1f1" /* Color of the scrollbar thumb and track */,
            borderRadius: "4px" /* Radius of the scrollbar thumb */,
          }}
        >
          {/* 
          
          <div className="scrollmenu bg-gray-900 overflow-auto whitespace-nowrap">
      <a href="#home" className="inline-block text-white text-center px-4 py-2 no-underline hover:bg-gray-700">Home</a>
      <a href="#news" className="inline-block text-white text-center px-4 py-2 no-underline hover:bg-gray-700">News</a>
      <a href="#contact" className="inline-block text-white text-center px-4 py-2 no-underline hover:bg-gray-700">Contact</a>
      <a href="#about" className="inline-block text-white text-center px-4 py-2 no-underline hover:bg-gray-700">About</a>
      {/* Add more links here if needed 
    </div>
       */}
          {categories.map((item, index) => (
            <div key={index} className="cursor-pointer text-white ">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* main page */}
      <div className="px-12 py-8">
        <div className="mb-8">
          <p className="py-2 text-xl font-bold text-center">
            Top Selling Products
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-4">
            {data
              .slice(0, 4)
              .map(({ product_name, description, image, status }, index) => (
                <div
                  onClick={openModal}
                  key={index}
                  className="flex flex-col border-[1px] w-fit shadow-lg p-4 items-center justify-center cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <img
                      src={Cloth1}
                      alt={product_name}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-align text-sm py-2">{product_name}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-8">
          <p className="py-2 text-xl font-bold text-center">All Products</p>
          <div className="grid grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-4">
            {data.map(({ product_name, description, image, status }, index) => (
              <div
                onClick={openModal}
                key={index}
                className="flex flex-col border-[1px] w-fit shadow-lg p-4 items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                <div>
                  <img
                    src={Cloth1}
                    alt={product_name}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-align text-sm py-2">{product_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isLogged={isLogged}
      />
    </div>
  );
};

export default Home;
