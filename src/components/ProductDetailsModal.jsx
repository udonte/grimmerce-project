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

  // Reset prodQty whenever product changes
  useEffect(() => {
    setProdQty(1); // Reset to default quantity
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
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Product Details">
      <div className="">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          <img
            src={`http://216.158.239.94:5100/file/${product.imageFilename}`}
            alt={product.name}
            className="w-[200px] h-auto rounded"
          />
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">{product.name}</p>

            <p className="font-bold">₦{product.amount}</p>
            <div>
              <p className="font-bold">Description:</p>
              <p>{product.description}</p>
            </div>
            <div>
              <p className="mb-4">
                <span className="font-bold ">Quantities:</span>{" "}
                {product.quantity}
              </p>
              <div className="flex items-center">
                <div className="w-12">
                  <Button color={"secondary"} onClick={decrementQty}>
                    -
                  </Button>
                </div>
                <div className="text-center w-12">{prodQty}</div>
                <div className="w-12">
                  <Button onClick={incrementQty}>+</Button>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold">Status</p>
              <p className="text-green-500">
                {product.outOfStock ? "Unavailable" : "Available"}
              </p>
            </div>
            <div className="w-full">
              {isLogged ? (
                <Button onClick={() => handleAddToCart(product.id, prodQty)}>
                  Add to cart
                </Button>
              ) : (
                <Button onClick={() => navigate("/login")}>
                  Please Login to continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
