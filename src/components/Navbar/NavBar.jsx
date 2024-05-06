import React, { useState } from "react";
import { FaRegUser, FaSearch, FaSignInAlt } from "react-icons/fa";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
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
              className="ml-4 pl-4 border-none outline-none w-full"
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
              <div className="flex flex-col absolute bg-white top-10 rounded border-gray-800 border-[1px]">
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
  );
};

export default NavBar;
