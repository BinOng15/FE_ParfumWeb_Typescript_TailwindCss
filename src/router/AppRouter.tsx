/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";

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
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import UserManagementPage from "../pages/admin/customer/UserManagementPage";
import LoginPage from "../pages/LoginPage";
import StaffManagementPage from "../pages/admin/customer/StaffManagementPage";
import SignUpPage from "../pages/SignUpPage";
import VerifyAccountManagementPage from "../pages/admin/customer/VerifyAccountManagementPage";

import PerfumeIntroduction from "../pages/customer/PerfumeIntroduction";

import ProductManagementPage from "../pages/admin/product/ProductManagementPage";
import CategoryManagementPage from "../pages/admin/category/CategoryManagementPage";
import ProductCategoryManagementPage from "../pages/admin/product-category/ProductCategoryManagementPage";
import OrderManagementPage from "../pages/staff/order/OrderManagementPage";
import PaymentSuccess from "../pages/customer/PaymentSuccess";
import UserProfile from "../pages/customer/UserProfile";
import OrderTransactionPage from "../pages/customer/order/OrderTransactionPage";
import ChangePasswordPage from "../pages/customer/password/ChangePasswordPage";
import PaymentManagementPage from "../pages/staff/payment/PaymentManagementPage";


interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRouter = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const storedUser = localStorage.getItem("user");
  console.log("Stored user:", storedUser); // Debug

  if (!storedUser) {
    console.log("No stored user, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(storedUser);
    console.log("Parsed user:", user); // Debug
  } catch (error) {
    console.error("Error parsing user from sessionStorage:", error);
    return <Navigate to="/login" replace />;
  }

  if (!user || !user.roleName) {
    console.log("No user or roleName, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    console.log(`Role ${user.roleName} not allowed, redirecting to /`);
    return <Navigate to="/" replace />;
  }

  return element;
};

const AppRoutes: React.FC = () => {
  const PerfumeProductDetailWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id, 10) : 0;

    return <PerfumeProductDetail productId={productId} />;
  };

  return (
    <AuthProvider>
      <Routes>
        {/* Public Pages */}
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpPage />
          }
        />
        <Route
          path="/PerfumeIntroduction"
          element={
            <MainLayout>
              < PerfumeIntroduction />
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
        {/* Customer Pages */}
        <Route
          path="/"
          element={
            <MainLayout>
              <ProtectedRouter
                element={<Home />}
                allowedRoles={["User"]}
              />
            </MainLayout>
          }
        />
        <Route
          path="/payment/success"
          element={
            <MainLayout>
              <PaymentSuccess />
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
          path="/profile/edit"
          element={
            <MainLayout>
              <ProtectedRouter
                element={<ProfileEdit />}
                allowedRoles={["User"]}
              />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProtectedRouter
                element={<UserProfile />}
                allowedRoles={["User"]}
              />
            </MainLayout>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRouter
              element={<OrderTransactionPage />}
              allowedRoles={["User"]}
            />
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRouter
              element={<ChangePasswordPage />}
              allowedRoles={["User"]}
            />
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
        {/* Staff Pages */}
        <Route
          path="/staff"
          element={
            <ProtectedRouter
              element={<StaffDashboard />}
              allowedRoles={["Staff"]}
            />
          }
        />
        <Route
          path="/staff/order-management"
          element={
            <ProtectedRouter
              element={<OrderManagementPage />}
              allowedRoles={["Staff"]}
            />
          }
        />
        <Route
          path="/staff/payment-management"
          element={
            <ProtectedRouter
              element={<PaymentManagementPage />}
              allowedRoles={["Staff"]}
            />
          }
        />
        {/* Admin Pages */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouter
              element={<AdminDashboard />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/user-management"
          element={
            <ProtectedRouter
              element={<UserManagementPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/verify-account"
          element={
            <ProtectedRouter
              element={<VerifyAccountManagementPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/staff-management"
          element={
            <ProtectedRouter
              element={<StaffManagementPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/product-management"
          element={
            <ProtectedRouter
              element={<ProductManagementPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/category-management"
          element={
            <ProtectedRouter
              element={<CategoryManagementPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/product-category"
          element={
            <ProtectedRouter
              element={<ProductCategoryManagementPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;