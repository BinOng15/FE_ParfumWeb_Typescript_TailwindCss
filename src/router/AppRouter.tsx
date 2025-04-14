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
import MainLayout from "../layout/MainLayout";

const AppRoutes: React.FC = () => {
  const PerfumeProductDetailWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy id từ URL params
    const productId = id ? parseInt(id, 10) : 0; // Chuyển id sang number, mặc định là 0 nếu không có id

    return <PerfumeProductDetail productId={productId} />;
  };

  return (
    <Routes>
      {/* Customer Pages - Sử dụng MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/perfumeProduct"
        element={
          <MainLayout>
            <PerfumeProduct />
          </MainLayout>
        }
      />
      <Route
        path="/perfumeProductDetail/:id"
        element={
          <MainLayout>
            <PerfumeProductDetailWrapper />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />
      <Route
        path="/profiles"
        element={
          <MainLayout>
            <ProfileEdit />
          </MainLayout>
        }
      />
      <Route
        path="/oderhistory"
        element={
          <MainLayout>
            <OrderHistory />
          </MainLayout>
        }
      />
      <Route
        path="/paymenthistory"
        element={
          <MainLayout>
            <PaymentHistory />
          </MainLayout>
        }
      />
      {/* Staff Pages - Có thể không dùng MainLayout nếu không cần header/footer */}
      <Route path="/staff" element={<StaffDashboard />} />
      {/* Admin Pages - Có thể không dùng MainLayout nếu không cần header/footer */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;