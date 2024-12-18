import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AccountCreated from "./pages/AccountCreated";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import SellerDashboard from "./pages/SellerDashboard";
import PaymentReceipt from "./pages/PaymentReceipt";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account-created" element={<AccountCreated />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/payment-receipt" element={<PaymentReceipt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
