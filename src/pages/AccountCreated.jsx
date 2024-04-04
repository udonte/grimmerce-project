import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AccountCreated = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-3xl font-bold mb-2">Account created successfully</p>
        <p className="mb-2">You can proceed to log in</p>
        <div className="w-[300px] mt-4">
          <Button size={"lg"} onClick={() => navigate("/login")}>
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
