import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { FaCartFlatbed } from "react-icons/fa6";
import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";
import { RiCloseLine, RiDeleteBack2Fill, RiMenu3Line } from "react-icons/ri";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { GiHamburgerMenu } from "react-icons/gi";
import axiosInstance from "../helperFunctions/axios.utlil";
import CartModal from "../components/CartModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../Features/cart/cart.slice";
import { CgClose } from "react-icons/cg";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const userToken = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleAcctmenu, setToggleAcctMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);

  const { items, status } = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === "loading" || status === "refetch") {
      dispatch(fetchCartItems());
    }
  }, [dispatch, status]);

  // get products
  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("product");
      const fetchedProducts = response.data.data.data;
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
      // console.log(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // get filtered products
  const getFilteredProducts = async (category) => {
    try {
      const response = await axiosInstance.get(`product?category=${category}`);
      const fetchedProducts = response.data.data.data;
      setIsCategoryEmpty(fetchedProducts.length === 0);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
      setIsCategoryEmpty(false);
      setShowDropDown(false);
    } else {
      getFilteredProducts(category);
      setShowDropDown(false);
    }
  };

  const handleAddtoCartClick = () => {
    openCartModal();
  };

  const handleProductClick = (product) => {
    setSingleProduct(product);
    openProductModal();
  };

  useEffect(() => {
    getProducts();
    fetchCartItems();
    dispatch(fetchCartItems());
  }, []);

  const openProductModal = () => setIsProductModalOpen(true);
  const closeProductModal = () => setIsProductModalOpen(false);
  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  // Check if state exist before accessing them
  const firstName = state?.firstName; //

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);

  const isLogged = localStorage.getItem("access_token") ? true : false;

  const handleLogout = () => {
    toast.warning("You are now logged out. Please log in again..");
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsCategoryEmpty(filtered.length === 0);
    }
  };

  const categories = [
    {
      id: 1,
      name: "All",
      value: "all",
    },
    {
      id: 2,
      name: "Electronics",
      value: "electronics",
    },
    {
      id: 3,
      name: "Home Appliances",
      value: "home_appliances",
    },
    {
      id: 4,
      name: "Fashion",
      value: "fashion",
    },
    {
      id: 5,
      name: "Beauty & Personal Care",
      value: "beauty_personal_care",
    },

    {
      id: 6,
      name: "Sports & Outdoors",
      value: "sports_outdoors",
    },

    {
      id: 7,
      name: "Books",
      value: "books",
    },
    {
      id: 8,
      name: "Toys & Games",
      value: "toys_games",
    },

    {
      id: 9,
      name: " Health & Wellness",
      value: "health_wellness",
    },
    {
      id: 10,
      name: "Automotive",
      value: "automotive",
    },

    {
      id: 11,
      name: "Furniture & Home Decor",
      value: "furniture_home_decor",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* nav */}
      <nav>
        <div className="flex items-center bg-red-900">
          <div className=" px-2 md:px-8 md:py-4 w-full flex items-center justify-between gap-4">
            {/* nav */}
            <div className="flex items-center justify-between w-full gap-2 py-2 md:py-0">
              <div
                className="flex items-center justify-center bg-white w-fit text-red-900 font-bold cursor-pointer"
                onClick={() => navigate("/")}
              >
                Grimmerce
              </div>
              <div className="flex items-center bg-white rounded-md py-1 px-2 md:py-2 md:px-8 lg:w-[50%] w-full">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Search Item"
                  value={searchQuery}
                  className="ml-4 pl-4 border-none outline-none w-full"
                  onChange={handleSearch}
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
                  {/* web view */}
                  {toggleAcctmenu && (
                    <div
                      onMouseLeave={() => setToggleAcctMenu(false)}
                      className="absolute z-50 left-0 top-[35px] text-deskit-blue-300 w-fit min-w-max border rounded-xl overflow-hidden bg-white text-gray-500 shadow-lg"
                    >
                      <div className="px-3 py-3 gap-x-3 w-full text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                        <p className="text-left">Profile</p>
                      </div>
                      <div className="px-3 py-3 gap-x-3 w-full  text-sm hover:bg-gray-100 cursor-pointer">
                        <p className="text-left">Reset Password</p>
                      </div>
                      <div className="px-3 py-3 gap-x-3 w-full  text-sm hover:bg-gray-100 cursor-pointer">
                        <p className="text-left">Payment Method</p>
                      </div>
                      <div className="px-3 py-3 gap-x-3 w-full  text-sm hover:bg-gray-100 cursor-pointer">
                        <p className="text-left">Delete Account</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* cart items */}
                <div
                  className="flex items-end gap-1 cursor-pointer"
                  onClick={handleAddtoCartClick}
                >
                  <div className="relative ">
                    <p className="text-red-900 bg-white rounded-full h-4 w-4 p-1 absolute left-2 bottom-4 flex justify-center items-center text-xs">
                      {items.length}
                    </p>
                    <FaCartFlatbed color="#fff" size={20} />
                  </div>
                </div>
                {/* end of cart items */}

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
                  {/* cart items mobile */}
                  <div
                    className="relative cursor-pointer"
                    onClick={handleAddtoCartClick}
                  >
                    <p className="text-red-900 bg-white rounded-full h-4 w-4 p-1 absolute left-2 bottom-4 flex justify-center items-center text-xs">
                      {items.length}
                    </p>
                    <FaCartFlatbed color="#fff" size={20} />
                  </div>
                  {/* end of cart items mobile */}
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
                {/* mobile */}
                {toggleMenu && (
                  <div
                    onMouseLeave={() => setToggleMenu(false)}
                    className="absolute z-50 top-10 text-deskit-blue-300 w-[200px] min-w-max border rounded-xl overflow-hidden bg-white shadow-lg "
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer py-3 px-3 hover:bg-gray-100 border-b-[1px] border-b-gray-200 rounded"
                      onClick={() => setToggleAcctMenu((prev) => !prev)}
                    >
                      <p className="flex items-center justify-between w-full">
                        Account
                        <span className="cursor-pointer">
                          {toggleAcctmenu ? (
                            <MdKeyboardArrowDown size={15} />
                          ) : (
                            <MdKeyboardArrowRight size={15} />
                          )}
                        </span>
                      </p>
                    </div>

                    {toggleAcctmenu && (
                      <div
                        onMouseLeave={() => setToggleAcctMenu(false)}
                        className="text-deskit-blue-300 w-full  overflow-hidden bg-white "
                      >
                        <div className="px-3 py-3 gap-x-3 w-full  hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                          <p className="text-left">Profile</p>
                        </div>
                        <div className="px-3 py-3 gap-x-3 w-full  hover:bg-gray-100 cursor-pointer">
                          <p className="text-left">Reset Password</p>
                        </div>
                        <div className="px-3 py-3 gap-x-3 w-full  hover:bg-gray-100 cursor-pointer">
                          <p className="text-left">Payment Method</p>
                        </div>
                        <div className="px-3 py-3 gap-x-3 w-full  hover:bg-gray-100 cursor-pointer">
                          <p className="text-left">Delete Account</p>
                        </div>
                      </div>
                    )}
                    <div
                      className="flex items-center cursor-pointer px-3 py-3 hover:bg-gray-100"
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

      {/* desktop category */}
      <div className="bg-gray-800 py-1 px-2 ">
        <div className="hidden lg:flex items-center justify-center gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer text-sm text-white ${
                currentCategory === category.value
                  ? "font-bold underline text-lg"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end w-full">
          {showDropDown ? (
            <CgClose
              className="text-white lg:hidden cursor-pointer"
              onClick={() => setShowDropDown((prev) => !prev)}
            />
          ) : (
            <div
              className="flex items-center gap-2 lg:hidden cursor-pointer"
              onClick={() => setShowDropDown((prev) => !prev)}
            >
              <p className="text-white">Categories</p>
              <RiMenu3Line className="text-white " />
            </div>
          )}
        </div>

        {/* mobile category */}
        <div
          className="lg:hidden relative"
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
          {showDropDown && (
            <div
              onMouseLeave={() => {
                setShowDropDown((prev) => !prev);
              }}
              className=" absolute top-[-5px] z-50 left-0  text-deskit-blue-300 w-[200px] overflow-hidden  right-[1px] top rounded-lg bg-white shadow-lg"
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`px-3 py-3 gap-x-3 w-full min-w-max text-sm hover:bg-[#7F1D1D] hover:text-white  flex items-center shrink-0  cursor-pointer hover:border-y hover:border-gray-300 ${
                    currentCategory === category.value
                      ? "bg-[#7F1D1D] text-white"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.value)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* end of category */}

      {/* main page */}
      <div className="px-4 md:px-8 lg:px-12 py-8">
        {isCategoryEmpty ? (
          <div className="h-screen text-center font-bodl">
            <p className="text-xl text-red-500">
              No products available in this category.
            </p>
            <p>Click another category</p>
          </div>
        ) : (
          <>
            {/* top selling products */}

            {currentCategory === "all" && (
              <div className="mb-8">
                <p className="py-2 text-xl font-bold text-center mb-4">
                  Top Selling Products
                </p>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {filteredProducts.slice(0, 4).map((product, index) => (
                    <div
                      onClick={() => handleProductClick(product)}
                      key={index}
                      className="flex flex-col border rounded-lg shadow-lg p-4 items-center cursor-pointer relative overflow-hidden transition-transform transform hover:scale-105 w-full max-w-xs mx-auto md:max-w-sm"
                    >
                      {/* Decorative Background Circles */}
                      <div className="rounded-full h-14 w-14 bg-red-900/20 absolute left-[-28px] top-[-40px] transition-colors duration-300 hover:bg-[#7F1D1D]"></div>
                      <div className="rounded-full h-32 w-32 bg-red-900/20 absolute bottom-[-110px] right-[-80px] transition-colors duration-300 hover:bg-[#7F1D1D]"></div>

                      {/* Product Image */}
                      <div className="w-full h-48 md:h-36 lg:h-48 flex justify-center overflow-hidden">
                        <img
                          src={`https://api.olumycosoft.com/file-service/file/${product.imageFilename}`}
                          alt={product.name}
                          className="rounded-lg object-cover w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="w-full text-center">
                        <p className="text-lg font-bold text-gray-800 truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {product.brand}
                          </p>
                          <p className="text-lg font-medium text-red-600">
                            ₦{product.amount}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div>{product.category.name}</div>
                          <div className="text-green-700">Available</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <p className="py-2 text-xl font-bold text-center mb-4">
                {currentCategory === "all"
                  ? "All Products"
                  : `${currentCategory
                      .split("_")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")} Products`}
              </p>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {filteredProducts.map((product, index) => (
                  <div
                    onClick={() => handleProductClick(product)}
                    key={index}
                    className="flex flex-col border rounded-lg shadow-lg p-4 items-center cursor-pointer relative overflow-hidden transition-transform transform hover:scale-105 w-full max-w-xs mx-auto md:max-w-sm"
                  >
                    {/* Decorative Background Circles */}
                    <div className="rounded-full h-14 w-14 bg-red-900/20 absolute left-[-28px] top-[-40px] transition-colors duration-300 hover:bg-[#7F1D1D]"></div>
                    <div className="rounded-full h-32 w-32 bg-red-900/20 absolute bottom-[-110px] right-[-80px] transition-colors duration-300 hover:bg-[#7F1D1D]"></div>

                    {/* Product Image */}
                    <div className="w-full h-48 md:h-36 lg:h-48 flex justify-center overflow-hidden">
                      <img
                        src={`https://api.olumycosoft.com/file-service/file/${product.imageFilename}`}
                        alt={product.name}
                        className="rounded-lg object-cover w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="w-full text-center">
                      <p className="text-lg font-bold text-gray-800 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <p className="text-lg font-medium text-red-600">
                          ₦{product.amount}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div>{product.category.name}</div>
                        <div className="text-green-700">Available</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
      <ProductDetailsModal
        product={singleProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        isLogged={isLogged}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        items={items}
      />
    </div>
  );
};

export default SellerDashboard;
