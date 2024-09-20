import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import Button from "./Button";
import CustomRadioButton from "./CustomRadioButton";
import { toast } from "react-toastify";

const PaymentMethodModal = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSave = () => {
    console.log(paymentMethod);
    AddPaymentMethod();
    onClose();
  };

  const AddPaymentMethod = async () => {
    try {
      const userToken = localStorage.getItem("access_token");
      const apiResponse = await fetch(
        "https://api.olumycosoft.com/emart/api/v1/payment/add-payment-method",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            name: paymentMethod,
          }),
        }
      );
      const result = await apiResponse.json();
      console.log(result);
      toast.success(result.message);
      return result;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return error;
    }
  };

  const fetchPaymentMethod = async () => {
    try {
      const userToken = localStorage.getItem("access_token");
      const apiResponse = await fetch(
        "https://api.olumycosoft.com/emart/api/v1/payment/payment-method",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const result = await apiResponse.json();
      console.log(result.data);
      setPaymentMethod(result.data.name);
      toast.success(result.message);
      return result;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return error;
    }
  };

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Payment method">
      <p className="text-sm text-red-800 font-bold text-center">
        Kindly choose your preferred payment method:
      </p>
      <div className="w-full flex items-center justify-center ">
        <div className="mt-8 w-full lg:w-1/2 p-1  flex flex-col gap-8 items-start justify-center py-4">
          <div
            className={`flex items-center justify-between shadow-md px-6 py-4 w-full rounded-2xl hover:bg-gray-100 border-2 border-gray-100 ${
              paymentMethod === "card"
                ? "bg-gray-100 text-red-800 font-bold"
                : ""
            }`}
          >
            <p>Payment with Card</p>
            <CustomRadioButton
              id="card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={handleMethodChange}
              label=""
              size="sm" // 'sm', 'md', or 'lg'
            />
          </div>
          <div
            className={`flex items-center justify-between shadow-md px-6 py-4 w-full rounded-2xl hover:bg-gray-100 border-2 border-gray-100 ${
              paymentMethod === "ussd"
                ? "bg-gray-100  text-red-800 font-bold"
                : ""
            }`}
          >
            <p>Payment with USSD</p>
            <CustomRadioButton
              id="ussd"
              name="paymentMethod"
              value="ussd"
              checked={paymentMethod === "ussd"}
              onChange={handleMethodChange}
              label=""
              size="sm" // 'sm', 'md', or 'lg'
            />
          </div>
          <div
            className={`flex items-center justify-between shadow-md px-6 py-4 w-full rounded-2xl hover:bg-gray-100 border-2 border-gray-100 ${
              paymentMethod === "bank-transfer"
                ? "bg-gray-100  text-red-800 font-bold"
                : ""
            }`}
          >
            <p>Bank Transfer</p>
            <CustomRadioButton
              id="bank"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={handleMethodChange}
              label=""
              size="sm" // 'sm', 'md', or 'lg'
            />
          </div>
          <div className="flex items-center justify-between shadow-md px-6 py-4 w-full rounded-2xl border-2 border-gray-100">
            <p className="text-gray-300">Wallet</p>
            <CustomRadioButton
              id="wallet"
              name="paymentMethod"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={handleMethodChange}
              label=""
              size="sm" // 'sm', 'md', or 'lg'
              disabled={true} // Disabled state example
            />
          </div>

          <div className="w-full">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;

/* 
        
        1. modal to load new url from iframe after cart modal (loads paystack web ui)

2. call backend to verify payment success/failure, then display success after payment

3. payment method modal
        */
