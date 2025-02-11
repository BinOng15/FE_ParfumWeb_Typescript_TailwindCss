import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import StaffDashboard from "../pages/staff/StaffDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PerfumeProduct from "../pages/customer/PerfumeProduct";
import PerfumeProductDetail from "../pages/customer/PerfumeProductDetail";
import Cart from "../pages/customer/Cart";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Customer Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/perfumeProduct" element={<PerfumeProduct />} />
      <Route
        path="/perfumeProductDetail/:id"
        element={<PerfumeProductDetail />}
      />
      <Route path="/cart" element={<Cart />} />
      {/* Staff Pages */}
      <Route path="/staff" element={<StaffDashboard />} />

      {/* Admin Pages */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
