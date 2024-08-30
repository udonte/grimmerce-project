import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addCartItem,
  fetchCartItems,
  refetch,
} from "../Features/cart/cart.slice";

const ProductDetailsModal = ({ isOpen, onClose, isLogged, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prodQty, setProdQty] = useState(1);

  useEffect(() => {
    setProdQty(1); // Reset to default quantity when product changes
  }, [product]);

  const decrementQty = () => {
    if (isLogged) {
      setProdQty((prev) => (prev <= 1 ? 1 : prev - 1));
    } else {
      toast.error("Please Login");
    }
  };

  const incrementQty = () => {
    if (isLogged) {
      setProdQty((prev) =>
        prev < product.quantity ? prev + 1 : product.quantity
      );
    } else {
      toast.error("Please login");
    }
  };

  const handleAddToCart = (productId, quantity) => {
    dispatch(addCartItem({ productId, quantity }));
    dispatch(fetchCartItems());
    dispatch(refetch());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Product Details">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8 pr-4 md:pr-0">
        {/* Product Image */}
        <img
          src={`https://api.olumycosoft.com/file-service/file/${product.imageFilename}`}
          alt={product.name}
          className="w-full md:w-[250px] h-auto rounded-lg object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col gap-6 mt-4 md:mt-0">
          <p className="font-bold text-2xl text-gray-800">{product.name}</p>
          <p className="font-bold text-xl text-green-700">₦{product.amount}</p>

          <div>
            <p className="font-bold text-gray-800">Description:</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div>
            <p className="font-bold text-gray-800">
              Quantities: {product.quantity}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div>
                <Button
                  color={"secondary"}
                  onClick={decrementQty}
                  className="px-4 py-2"
                >
                  -
                </Button>
              </div>
              <div className="text-lg font-medium">{prodQty}</div>
              <div>
                <Button onClick={incrementQty} className="px-4 py-2">
                  +
                </Button>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-800">Status:</p>
            <p
              className={`font-medium ${
                product.outOfStock ? "text-red-500" : "text-green-500"
              }`}
            >
              {product.outOfStock ? "Unavailable" : "Available"}
            </p>
          </div>

          <div className="mt-6">
            {isLogged ? (
              <Button
                onClick={() => handleAddToCart(product.id, prodQty)}
                className="w-full px-4 py-2 rounded-lg"
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 rounded-lg"
              >
                Please Login to Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
