import React, { useEffect, useState } from "react";

import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { FaCartFlatbed } from "react-icons/fa6";

import { RiCloseLine, RiDeleteBack2Fill, RiMenu3Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({ searchQuery }) => {
  return (
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
                  <div className="flex flex-col absolute top-10 bg-red-200 rounded border-gray-700 border-[1px] text-sm w-[150px] text-gray-800">
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
                    <div className="">
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
  );
};

export default NavBar;
