import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "../pages/customer/Home";
import StaffDashboard from "../pages/staff/StaffDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PerfumeProduct from "../pages/customer/PerfumeProduct";
import PerfumeProductDetail from "../pages/customer/PerfumeProductDetail";
import Cart from "../pages/customer/Cart";
import ProfileEdit from "../pages/customer/Profile";
import OrderHistory from "../pages/customer/OrderHistory";
import PaymentHistory from "../pages/customer/PaymentHistory";

const AppRoutes: React.FC = () => {
  const PerfumeProductDetailWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy id từ URL params
    const productId = id ? parseInt(id, 10) : 0; // Chuyển id sang number, mặc định là 0 nếu không có id

    return <PerfumeProductDetail productId={productId} />;
  };
  return (
    <Routes>
      {/* Customer Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/perfumeProduct" element={<PerfumeProduct />} />
      <Route
        path="/perfumeProductDetail/:id"
        element={<PerfumeProductDetailWrapper />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profiles" element={<ProfileEdit />} />
      <Route path="/oderhistory" element={<OrderHistory />} />
      <Route path="/paymenthistory" element={<PaymentHistory />} />
      {/* Staff Pages */}
      <Route path="/staff" element={<StaffDashboard />} />

      {/* Admin Pages */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
