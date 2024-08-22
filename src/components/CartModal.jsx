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

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, status, itemNumber } = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === "loading" || status === "refetch") {
      dispatch(fetchCartItems());
    }
  }, [dispatch, status]);

  const handleDelete = (item) => {
    dispatch(removeCartItem(item.id));
    dispatch(removeItem(item.id));
    // dispatch(fetchCartItems());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Cart">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border-collapse w-full table-auto">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="py-2 px-4 border">Product</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{item.product.name}</td>
                <td className="py-2 px-4 border">${item.product.amount}</td>
                <td className="py-2 px-4 border text-center">
                  {item.quantity}
                </td>
                <td className="py-2 px-4 border">
                  ${(item.product.amount * item.quantity).toFixed(2)}
                </td>
                <td className="py-2 px-4 border text-center">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Cost Section */}
        <div className="flex flex-col items-end text-xs mt-12 gap-2 w-full">
          <div className="flex items-center justify-between w-full px-4">
            <p>Number of Items:</p>
            <p className="font-bold">{items.length}</p>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <p>Subtotal:</p>
            <p className="font-bold">
              $
              {items
                .reduce(
                  (total, item) => total + item.product.amount * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <p>Vat:</p>
            <p className="font-bold">$0.00</p>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <p>Total:</p>
            <p className="font-bold">
              $
              {items
                .reduce(
                  (total, item) => total + item.product.amount * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-4 gap-4">
            <Button color={"secondary"} onClick={handleClearCart}>
              Clear cart
            </Button>
            <Button>Pay</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
