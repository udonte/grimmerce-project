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
      {/* large and medium devices */}
      <div
        className="overflow-x-auto w-full p-6 hidden md:block"
        style={{
          scrollbarWidth: "thin",
          WebkitScrollbarWidth: "thin",
          scrollbarTrackColor: "#f1f1f1",
          scrollbarColor: "#E2E4E8 #ffffff",
          borderRadius: "8px",
        }}
      >
        {items.length > 0 ? (
          <>
            <table
              className="min-w-full bg-white border-collapse w-full table-auto"
              style={{
                scrollbarWidth: "thin",
                WebkitScrollbarWidth: "thin",
                scrollbarTrackColor: "#f1f1f1",
                scrollbarColor: "#E2E4E8 #ffffff",
                borderRadius: "8px",
              }}
            >
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
                      (total, item) =>
                        total + item.product.amount * item.quantity,
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
                      (total, item) =>
                        total + item.product.amount * item.quantity,
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

      {/* mobile devices */}
      <div className="p-6 space-y-6 md:hidden">
        {items.length > 0 ? (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 bg-white py-2 px-3 shadow-md rounded-lg"
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
