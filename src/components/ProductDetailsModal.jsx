import React from "react";
import Modal from "./Modal/Modal";
import Cloth1 from "../assets/images/img (1).jpg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ProductDetailsModal = ({ isOpen, onClose, isLogged }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="">
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            <img
              src={Cloth1}
              alt={"man"}
              className="w-[200px] h-auto rounded"
            />
            <div className="flex flex-col gap-4">
              <p className="font-bold text-xl">Open Toes Flat Sandal</p>

              <p className="font-bold">N15,000</p>
              <div>
                <p className="font-bold">Description:</p>
                <p>
                  Brown, 42, Made in a Nigeria, Controlled slingback strap, Our
                  Style No. AMUD-WZ79, Manufacturer Style No. ROSIE GLASS CL
                </p>
              </div>
              <div>
                <p className="font-bold">Quantity</p>
                <div className="flex items-center">
                  <div className="w-12">
                    <Button color={"secondary"}>-</Button>
                  </div>
                  <div className="text-center w-12">3</div>
                  <div className="w-12">
                    <Button>+</Button>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold">Status</p>
                <p className="text-green-500">Available</p>
              </div>
              <div className="w-full">
                {isLogged ? (
                  <Button>Add to cart</Button>
                ) : (
                  <Button onClick={() => navigate("/login")}>
                    Please Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetailsModal;
