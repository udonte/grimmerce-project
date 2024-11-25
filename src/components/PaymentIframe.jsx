import React from "react";
import Modal from "./Modal/Modal";

const PaymentIframe = ({ isOpen, onClose, payResults }) => {
  console.log(onClose);
  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Payment" size="sm">
      {/* large and medium devices */}
      <div className=" w-full p-6">
        <iframe
          // src={"/payment-receipt"}
          src={payResults?.data?.authorization_url}
          width="600"
          height="400"
          title="Payment Modal"
        ></iframe>
      </div>
    </Modal>
  );
};
export default PaymentIframe;
