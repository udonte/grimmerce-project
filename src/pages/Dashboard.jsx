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
import { GiHamburgerMenu } from "react-icons/gi";
import axiosInstance from "../helperFunctions/axios.utlil";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleAcctmenu, setToggleAcctMenu] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("product");
      console.log(response);
      const fetchedProducts = response.data.data.data;
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleProductClick = (product) => {
    setSingleProduct(product);
    openModal();
  };

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

  return (
    <div className="w-full flex flex-col">
      <nav>
        <div className="flex items-center bg-red-900">
          <div className=" px-2 md:px-8 md:py-4 w-full flex items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full gap-2 py-2 md:py-0">
              <div
                className="flex items-center justify-center bg-white w-fit text-red-900 font-bold cursor-pointer"
                onClick={() => navigate("/")}
              >
                Grimmerce
              </div>
              <div className="flex items-center bg-white rounded-md py-1 px-2 md:py-2 md:px-8 lg:w-[50%] w-full mx-4">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Search item"
                  className="ml-4 pl-4 border-none outline-none w-full"
                />
              </div>
              {/* large screen sign up */}
              <div className="hidden lg:flex items-start justify-end text-white gap-8">
                <div className="flex flex-col items-start relative">
                  <div className="flex items-center gap-1">
                    <p className="flex items-center gap-2">
                      <FaUser color="#fff" size={15} />
                      Account
                    </p>
                    <div className=" flex items-center cursor-pointer">
                      {toggleAcctmenu ? (
                        <MdKeyboardArrowDown
                          color="#fff"
                          size={20}
                          onClick={() => setToggleAcctMenu(false)}
                        />
                      ) : (
                        <MdKeyboardArrowRight
                          color="#fff"
                          size={20}
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
                    <GiHamburgerMenu
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
                          {toggleAcctmenu ? (
                            <MdKeyboardArrowDown
                              size={15}
                              onClick={() => setToggleAcctMenu(false)}
                            />
                          ) : (
                            <MdKeyboardArrowRight
                              size={15}
                              onClick={() => setToggleAcctMenu(true)}
                            />
                          )}
                        </span>
                      </p>
                    </div>
                    {toggleAcctmenu && (
                      <div>
                        <p className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                          Profile
                        </p>
                        <p className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                          Reset Password
                        </p>
                        <p className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
                          Payment Method
                        </p>
                        <p className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 rounded pl-6 border-b-[1px] border-b-gray-100">
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
        </div>
      </nav>

      {/* end of nav */}

      {/* category */}
      <div className="bg-gray-800 py-2 px-4 ">
        <div className="hidden lg:flex items-center justify-center gap-8">
          {categories.map((item, index) => (
            <div key={index} className="cursor-pointer text-sm text-white">
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
            {products.slice(0, 4).map((product, index) => (
              <div
                onClick={() => handleProductClick(product)}
                key={index}
                className="flex flex-col border-[1px] w-fit rounded-md shadow-lg p-4 items-center cursor-pointer hover:bg-gray-100"
              >
                <div className="flex flex-col">
                  <div
                    style={{ width: "200px", height: "200px" }}
                    className="overflow-hidden"
                  >
                    <img
                      src={`http://216.158.239.94:5100/file/${product.imageFilename}`}
                      alt={product.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-align text-sm py-2 font-bold">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p>{product.brand}</p>
                      <p className="text-red-500">₦{product.amount}</p>
                    </div>
                    <div className="flex flex-col text-xs w-full mt-2">
                      <div className="text-green-700">Available</div>
                      <div className="">{product.category}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <p className="py-2 text-xl font-bold text-center">All Products</p>
          <div className="grid grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-4">
            {products.map((product, index) => (
              <div
                onClick={() => handleProductClick(product)}
                key={index}
                className="flex flex-col border-[1px] w-fit rounded-md shadow-lg p-4 items-center cursor-pointer hover:bg-gray-100"
              >
                <div className="flex flex-col">
                  <div
                    style={{ width: "200px", height: "200px" }}
                    className="overflow-hidden"
                  >
                    <img
                      src={`http://216.158.239.94:5100/file/${product.imageFilename}`}
                      alt={product.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-align text-sm py-2 font-bold">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p>{product.brand}</p>
                      <p className="text-red-500">₦{product.amount}</p>
                    </div>
                    <div className="flex flex-col text-xs w-full mt-2">
                      <div className="text-green-700">Available</div>
                      <div className="">{product.category}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ProductDetailsModal
        product={singleProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        isLogged={isLogged}
      />
    </div>
  );
};

export default Dashboard;
