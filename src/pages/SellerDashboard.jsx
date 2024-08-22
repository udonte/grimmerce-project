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

const SellerDashboard = () => {
  const dispatch = useDispatch();
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
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const [cart, setCart] = useState([]);

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
    if (category === "All") {
      setFilteredProducts(products);
      setIsCategoryEmpty(false);
    } else {
      getFilteredProducts(category);
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

                <div
                  className="flex items-end gap-1 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt color="#fff" size={20} />
                  <p>Logout</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-end lg:hidden relative">
                <div className="flex items-end gap-1 "></div>
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
      <div className="bg-gray-800 py-1 px-2 ">
        <div className="hidden lg:flex items-center justify-center gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer text-sm text-white ${
                currentCategory === category.name ? "font-bold underline" : ""
              }`}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.name}
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
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer text-white ${
                currentCategory === category.name ? "font-bold underline" : ""
              }`}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

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
            <div className="mb-8">
              <p className="py-2 text-xl font-bold text-center mb-4">
                Top Selling Products
              </p>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {filteredProducts.slice(0, 4).map((product, index) => (
                  <div
                    onClick={() => handleProductClick(product)}
                    key={index}
                    className="flex flex-col border-[1px] w-full rounded-md shadow-lg p-4 items-center cursor-pointer hover:bg-gray-100 relative overflow-hidden"
                  >
                    <div className="rounded-full h-14 w-14 bg-red-900/20 absolute left-[-28px] top-[-40px] "></div>
                    <div className="rounded-full h-32 w-32 bg-red-900/20 absolute bottom-[-110px] right-[-80px] "></div>
                    <div className="flex flex-col overflow-hidden">
                      <div className="w-full h-48 md:h-36 lg:h-48 overflow-hidden">
                        <img
                          src={`https://api.olumycosoft.com/file-service/file/${product.imageFilename}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-center text-sm py-2 font-bold">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <p>{product.brand}</p>
                        <p className="text-red-500">₦{product.amount}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs w-full mt-2">
                        <div className="">{product.category.name}</div>
                        <div className="text-green-700">Available</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <p className="py-2 text-xl font-bold text-center mb-4">
                All Products
              </p>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {filteredProducts.map((product, index) => (
                  <div
                    onClick={() => handleProductClick(product)}
                    key={index}
                    className="flex flex-col border-[1px] w-full rounded-md shadow-lg p-4 items-center cursor-pointer hover:bg-gray-100 relative overflow-hidden"
                  >
                    <div className="rounded-full h-14 w-14 bg-red-900/20 absolute left-[-28px] top-[-40px] "></div>
                    <div className="rounded-full h-32 w-32 bg-red-900/20 absolute bottom-[-110px] right-[-80px] "></div>
                    <div className="flex flex-col overflow-hidden">
                      <div className="w-full h-48 md:h-36 lg:h-48 overflow-hidden">
                        <img
                          src={`https://api.olumycosoft.com/file-service/file/${product.imageFilename}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-center text-sm py-2 font-bold">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <p>{product.brand}</p>
                        <p className="font-medium text-red-500">
                          ₦{product.amount}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs w-full mt-2">
                        <div className="">{product.category.name}</div>
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
