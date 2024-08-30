import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal/Modal";
import Button from "./Button";
import {
  clearCart,
  fetchCartItems,
  removeCartItem,
  removeItem,
} from "../Features/cart/cart.slice";
import { BsCartX } from "react-icons/bs";

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === "loading" || status === "refetch") {
      dispatch(fetchCartItems());
    }
  }, [dispatch, status]);

  const handleDelete = (item) => {
    dispatch(removeCartItem(item.id));
    dispatch(removeItem(item.id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Cart">
      <div className="p-6 space-y-6 ">
        {items.length > 0 ? (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 bg-white p-4 shadow-md rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://api.olumycosoft.com/file-service/file/${item.product.imageFilename}`}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="text-sm md:text-lg">
                      <h3 className=" font-semibold text-red-800">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-500">
                        ${item.product.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-fit md:justify-start space-x-4">
                    <p className="text-lg font-semibold">
                      ${(item.product.amount * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Number of Items:</span>
                <span className="font-bold">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-bold">
                  $
                  {items
                    .reduce(
                      (total, item) =>
                        total + item.product.amount * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vat:</span>
                <span className="font-bold">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-bold">
                  $
                  {items
                    .reduce(
                      (total, item) =>
                        total + item.product.amount * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <Button color={"secondary"} onClick={handleClearCart}>
                  Clear cart
                </Button>
                <Button>Pay</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <BsCartX className="text-[100px] mb-12 text-red-800" />

            <p className="text-lg font-semibold mb-4">Your cart is empty</p>
            <div className="w-full md:w-[200px]">
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
