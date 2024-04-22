import React, { useEffect } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  // Check if state exist before accessing them
  const firstName = state?.firstName; //

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    toast.warning("You are now logged out. Please log in again..");
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="w-full text-center">
        {firstName
          ? `Welcome ${firstName}. You register as ${state.userType}.`
          : "Welcome to the Home Page!!"}
      </p>
      <div className="w-[100px]">
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  );
};

export default Home;
