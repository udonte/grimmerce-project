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
import { GiHamburgerMenu } from "react-icons/gi";
import axiosInstance from "../helperFunctions/axios.utlil";

const Home = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});

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

  const handleProductClick = (product) => {
    setSingleProduct(product);
    openModal();
  };

  // get product and their categories
  useEffect(() => {
    getProducts();
  }, []);

  const isLogged = localStorage.getItem("access_token") ? true : false;

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
      {/* nav */}
      <nav>
        <div className="flex items-center bg-red-900">
          <div className="px-2 md:px-8 md:py-4 w-full flex items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full gap-2 py-2 md:py-0">
              <div className="flex items-center justify-center bg-white w-fit text-red-900 font-bold px-2 cursor-pointer">
                Grimmerce
              </div>
              <div className="flex items-center bg-white rounded-md py-1 px-2 md:py-2 md:px-8 lg:w-[50%] w-full">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Search Item"
                  className="ml-4 pl-4 border-none outline-none w-full"
                />
              </div>
              {/* large screen sign up */}
              <div className="hidden lg:flex items-center justify-end text-white gap-8">
                {isLogged ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FaSignInAlt color="#fff" size={15} />
                    <p>Logout</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-8">
                    <div
                      className="flex items-end gap-1 cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      <FaSignInAlt color="#fff" size={20} />
                      <p>Login</p>
                    </div>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      <FaRegUser color="#fff" size={15} />
                      <p>Signup</p>
                    </div>
                  </div>
                )}
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
                    <GiHamburgerMenu
                      color="#fff"
                      size={27}
                      onClick={() => setToggleMenu(true)}
                    />
                  )}
                </div>
                {toggleMenu && (
                  <div className="flex flex-col absolute bg-white top-10 rounded border-gray-800 border-[1px] text-sm">
                    <div
                      className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 border-b-[1px] border-b-gray-200 rounded"
                      onClick={() => navigate("/signup")}
                    >
                      <p>Signup</p>
                    </div>
                    <div
                      className="flex items-center cursor-pointer py-2 px-4 hover:bg-red-50 rounded"
                      onClick={() => navigate("/login")}
                    >
                      <p>Login</p>
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
      <div className="bg-gray-800 py-1 px-2 ">
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
                <div className="flex flex-col overflow-hidden">
                  <div
                    style={{ width: "200px", height: "200px" }}
                    className="overflow-hidden"
                  >
                    <img
                      src={`http://216.158.239.94:5100/file/${product.imageFilename}`}
                      alt={product.name}
                      className="w-full"
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
                <div className="flex flex-col ">
                  <div
                    style={{ width: "200px", height: "200px" }}
                    className="overflow-hidden"
                  >
                    <img
                      src={`http://216.158.239.94:5100/file/${product.imageFilename}`}
                      alt={product.name}
                      className="w-full"
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

export default Home;
