import React from "react";
import { FaFacebook, FaInstagram, FaMailBulk, FaTwitter } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" bg-gray-800 w-full">
      <div className="flex-col gap-8 item-center justify-center flex md:flex-row md:items-start md:justify-between text-white py-12 px-8 w-full">
        <div className="flex flex-col justify-start gap-2">
          <h3 className="mb-4 font-bold">USEFUL LINKS</h3>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
        <div className="flex flex-col justify-start gap-2">
          <h3 className="mb-4 font-bold">CONTACT</h3>
          <div className="flex items-center gap-2 text-center">
            <FaPhone color="#fff" />
            <p>23456565543</p>
          </div>
          <div className="flex items-center gap-2">
            <FaMailBulk color="#fff" />
            <p>grimmerce@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-2">
          <h3 className="mb-4 font-bold">FOLLOW US</h3>
          <div className="flex items-center gap-2">
            <FaFacebook color="#fff" />
            <FaTwitter color="#fff" />
            <FaInstagram color="#fff" />
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-t-white py-4 px-8 text-center text-gray-300">
        <p>2023, E-Commerce. All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
