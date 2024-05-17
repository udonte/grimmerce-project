import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowDown,
  FaLock,
  FaMoneyBill,
  FaRegUser,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { FaCartFlatbed } from "react-icons/fa6";
import Cloth1 from "../assets/images/img (1).jpg";
import data from "../data/data";
import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";
import { RiCloseLine, RiDeleteBack2Fill, RiMenu3Line } from "react-icons/ri";
import ProductDetailsModal from "../components/ProductDetailsModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleAcctmenu, setToggleAcctMenu] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Check if state exist before accessing them
  const firstName = state?.firstName; //

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);

  const isLogged = localStorage.getItem("access_token") ? true : false;

  console.log(isLogged);

  const handleLogout = () => {
    toast.warning("You are now logged out. Please log in again..");
    localStorage.removeItem("access_token");
    navigate("/login");
  };

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
          <div
            className="flex items-center justify-center bg-white w-[200px] text-red-900 font-bold "
            onClick={() => navigate("/")}
          >
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
                className="ml-4 pl-4 border-none outline-none w-full"
              />
            </div>
            {/* large screensign up */}
            <div className="hidden lg:w-1/2 text-white lg:flex lg:items-center lg:justify-end lg:gap-8">
              <div className="flex flex-col items-start relative">
                <div className="flex items-end gap-1">
                  <FaUser color="#fff" size={20} />
                  <p>Account</p>
                  <div className="cursor-pointer">
                    {toggleAcctmenu ? (
                      <MdKeyboardArrowDown
                        color="#fff"
                        size={27}
                        onClick={() => setToggleAcctMenu(false)}
                      />
                    ) : (
                      <MdKeyboardArrowRight
                        color="#fff"
                        size={27}
                        onClick={() => setToggleAcctMenu(true)}
                      />
                    )}
                  </div>
                </div>
                {toggleAcctmenu && (
                  <div className="flex flex-col absolute top-10 bg-white rounded border-gray-800 border-[1px] text-sm w-[150px] text-gray-800">
                    <div className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded">
                      <p className="flex items-center justify-between w-full">
                        Profile
                      </p>
                      <MdKeyboardArrowRight />
                    </div>
                    <div className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded">
                      <p className="flex items-center justify-between w-full">
                        Reset Password
                      </p>
                      <MdKeyboardArrowRight />
                    </div>
                    <div className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded">
                      <p className="flex items-center justify-between w-full">
                        Payment Method
                      </p>
                      <MdKeyboardArrowRight />
                    </div>
                    <div className="flex justify-between items-center cursor-pointer py-2 px-2 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded">
                      <p className="flex items-center justify-between w-full">
                        Delete Contact
                      </p>
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-end gap-1 ">
                <div className="relative cursor-pointer">
                  <p className="text-red-900 bg-white rounded-full h-4 w-4 p-1 absolute left-2 bottom-4 flex justify-center items-center text-xs">
                    5
                  </p>
                  <FaCartFlatbed color="#fff" size={20} />
                </div>
                <p>Cart</p>
              </div>
              <div
                className="flex items-end gap-1 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt color="#fff" size={20} />
                <p>Logout</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-end lg:hidden relative">
              <div className="flex items-end gap-1 ">
                <div className="relative cursor-pointer">
                  <p className="text-red-900 bg-white rounded-full h-4 w-4 p-1 absolute left-2 bottom-4 flex justify-center items-center text-xs">
                    5
                  </p>
                  <FaCartFlatbed color="#fff" size={20} />
                </div>
              </div>
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
                <div className="flex flex-col absolute top-10 bg-white rounded border-gray-800 border-[1px] text-sm w-[150px]">
                  <div className="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded">
                    <p className="flex items-center justify-between w-full">
                      Account
                      <span className="cursor-pointer">
                        {" "}
                        {toggleAcctmenu ? (
                          <MdKeyboardArrowDown
                            size={20}
                            onClick={() => setToggleAcctMenu(false)}
                          />
                        ) : (
                          <MdKeyboardArrowRight
                            size={20}
                            onClick={() => setToggleAcctMenu(true)}
                          />
                        )}
                      </span>
                    </p>
                  </div>
                  {toggleAcctmenu && (
                    <div>
                      <p className="flex items-centercursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                        Profile
                      </p>
                      <p className="flex items-centercursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                        Reset Password
                      </p>
                      <p className="flex items-centercursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                        Payment Method
                      </p>
                      <p className="flex items-centercursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                        Delete Account
                      </p>
                    </div>
                  )}
                  <div
                    className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 rounded"
                    onClick={handleLogout}
                  >
                    <p>Logout</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* end of nav */}

      {/* category */}
      <div className="bg-gray-800 py-2 px-4 ">
        <div className="hidden lg:flex items-center justify-center gap-8 cursor-pointer">
          {categories.map((item, index) => (
            <div key={index} className="cursor-pointer text-xl text-white">
              {item}
            </div>
          ))}
        </div>
        <div className="lg:hidden text-white flex justify-center item-center">
          <select className="bg-gray-800 text-white py-2 px-4 border-[1px] border-white rounded">
            <option defaultValue>Categories</option>
            {categories.map((item, index) => (
              <option key={index} className="py-2 px-2 hover:bg-red-400 ">
                {item}
              </option>
            ))}
          </select>
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
                  <img src={Cloth1} alt={product_name} />
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

export default Dashboard;