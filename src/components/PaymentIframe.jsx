import React from "react";
import Modal from "./Modal/Modal";

const PaymentIframe = ({ isOpen, onClose, payResults }) => {
  console.log(onClose);
  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Payment">
      {/* large and medium devices */}
      <div
        className=" w-full p-6"
        style={{
          scrollbarWidth: "thin",
          WebkitScrollbarWidth: "thin",
          scrollbarTrackColor: "#f1f1f1",
          scrollbarColor: "#E2E4E8 #ffffff",
          borderRadius: "8px",
        }}
      >
        <iframe
          src={payResults?.data?.authorization_url}
          width="600"
          height="400"
          title="Example Site"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </Modal>
  );
};
export default PaymentIframe;
