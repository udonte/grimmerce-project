import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Button from "../components/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../Features/cart/cart.slice";

const receiptData = [
  { id: 1, name: "Item 1", quantity: 2, price: 1000 },
  { id: 2, name: "Item 2", quantity: 1, price: 2500 },
  { id: 3, name: "Item 3", quantity: 3, price: 7800.5 },
];

const PaymentReceipt = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading" || status === "refetch") {
      dispatch(fetchCartItems());
    }
  }, [dispatch, status]);

  const subtotal = receiptData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.15; // assuming 15% VAT
  const total = subtotal + vat;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4  w-1/2 my-8">
        <div className="rounded-full p-4 bg-red-900/25">
          <FaCircleCheck className="text-red-900" size={25} />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">N{total.toFixed(2)}</p>
          <p className="text-3xl font-bold text-red-900">Payment Success</p>
          <p className="text font-bold">
            You have successfully paid for your cart items!!
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
          <p className=" text-red-900 font-bold cursor-pointer  w-full text-center">
            Grimmerce
          </p>
          <h1 className="text-2xl font-bold text-center mb-6">
            Payment Receipt
          </h1>

          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-4 text-center">
              Purchased Items
            </h2>
            <div className="space-y-4">
              {receiptData.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.quantity}pcs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      N{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      (N{item.price.toFixed(2)} each)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold">VAT (15%)</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-bold">N{total.toFixed(2)}</span>
            </div>
            <div className="text-center text-gray-500">
              <p>Thank you for shopping with us!</p>
              <p className="text-sm">
                If you have any questions, contact support.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button type="submit"> Download Receipt</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
