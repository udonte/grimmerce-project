import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal/Modal";
import Button from "./Button";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, product: "Product 1", price: 10, quantity: 2 },
    { id: 2, product: "Product 2", price: 20, quantity: 1 },
    { id: 3, product: "Product 3", price: 15, quantity: 3 },
  ]);

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{item.product}</td>
                <td className="py-2 px-4 border">${item.price}</td>
                <td className="py-2 px-4 border text-center">
                  {item.quantity}
                </td>
                <td className="py-2 px-4 border">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-2 px-4 border text-center">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item.id)}
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
            <p className="font-bold">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <p>Subtotal:</p>
            <p className="font-bold">
              $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
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
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-4 gap-4">
            <Button color={"secondary"}>Clear cart</Button>
            <Button>Pay</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
