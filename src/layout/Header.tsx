/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Avatar, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SignupModal from "../components/sigup/sigup";
import LoginModal from "../components/login/login";
import { logout } from "../redux/authSlice";
// import { axiosInstance } from "../services/axiosInstance";
// import { OrderResponse } from "../components/models/Order";

const CustomHeader: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  // const [cartCount, setCartCount] = useState(0); // State để lưu số lượng đơn hàng "Cart"
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  // Function to call API and fetch the number of "Cart" orders
  // const fetchCartCount = async () => {
  //   try {
  //     const user = localStorage.getItem("user"); // Retrieve user data from local storage
  //     if (!user) {
  //       console.error("User data not found in localStorage");
  //       //setCartCount(0); // Set cart count to 0 if user data is not found
  //       return;
  //     }
  //     const parsedUser = JSON.parse(user); // Parse the user data to extract customerId
  //     const customerId = parsedUser.customerId;
  //     if (!customerId) {
  //       console.error("Customer ID not found in user data");
  //       //setCartCount(0); // Set cart count to 0 if customer ID is not found
  //       return;
  //     }
  //     const response = await axiosInstance.get(`/order/cart/${customerId}`); // Updated endpoint to match expected API naming conventions
  //     const cartItems = response.data || [];
  //     //const count = cartItems.reduce((total: number, item: OrderResponse) => {
  //       if (item.status === "Cart") {
  //         return total + 1;
  //       }
  //       return total;
  //     }, 0);
  //     //setCartCount(count);
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error); // Log error message
  //     //setCartCount(0); // Set cart count to 0 in case of an error
  //   }
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchCartCount(); // Gọi API khi người dùng đã đăng nhập
  //   }
  // }, [isAuthenticated]);

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
    setIsSignupModalVisible(false);
  };

  const showSignupModal = () => {
    setIsSignupModalVisible(true);
    setIsLoginModalVisible(false);
  };

  const hideLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  const hideSignupModal = () => {
    setIsSignupModalVisible(false);
  };

  const handleLogin = () => {
    console.log("Đăng nhập thành công!");
    setIsLoginModalVisible(false);
  };

  const handleSignup = (values: { fullName: string; email: string; password: string }) => {
    console.log("Đăng ký thành công với thông tin:", values);
    setIsSignupModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login"); // Chuyển hướng về trang chủ sau khi đăng xuất
    message.success("Đăng xuất thành công!");
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-xl">
        <div className="flex items-center"></div>
        <div className="flex-1 flex justify-center w-full">
          <Link to={"/"}>
            <div
              className="font-bold text-black w-auto ml-64"
              style={{
                fontFamily: "Pacifico",
                fontWeight: 200,
                fontSize: 40,
              }}
            >
              Eun de Parfum
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Badge
            count={2} // Hiển thị số lượng đơn hàng "Cart"
            offset={[0, 0]}
            color="red"
            onClick={() => navigate(`/cart`)}
          >
            <ShoppingCartOutlined className="text-lg cursor-pointer" />
          </Badge>
          {!isAuthenticated ? (
            <>
              <Button
                className="border-gray-300"
                type="default"
                onClick={showSignupModal}
              >
                Đăng ký
              </Button>
              <Button
                className="border-gray-300"
                type="default"
                onClick={showLoginModal}
              >
                Đăng nhập
              </Button>
            </>
          ) : (
            <>
              <span title="Tài khoản">
                <Avatar
                  src="/default.png"
                  size={40}
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
              </span>
              <Button
                className="border-gray-300"
                type="default"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          )}
        </div>
      </header>
      <nav className="flex justify-center space-x-6 text-gray-800 font-medium bg-white shadow-xl border-b border-gray-200 py-3">
        <Link to="/" className="relative hover:text-pink-600 text-center">
          TRANG CHỦ
          {location.pathname === "/" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-md"></span>
          )}
        </Link>
        <Link
          to="/perfumeProduct"
          className="relative hover:text-pink-600 text-center"
        >
          NƯỚC HOA
          {location.pathname === "/perfumeProduct" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-md"></span>
          )}
        </Link>
        <Link to="/PerfumeIntroduction" className="relative hover:text-pink-600 text-center">
          GIỚI THIỆU
          {location.pathname === "/PerfumeIntroduction" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-md"></span>
          )}
        </Link>

        <Link to="/decant" className="relative hover:text-pink-600 text-center">
          NƯỚC HOA CHIẾT
          {location.pathname === "/decant" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-md"></span>
          )}
        </Link>
      </nav>
      <SignupModal
        isVisible={isSignupModalVisible}
        onClose={hideSignupModal}
        onSignup={handleSignup}
        onSwitchToSignin={showLoginModal}
      />
      <LoginModal
        isVisible={isLoginModalVisible}
        onClose={hideLoginModal}
        onLogin={handleLogin}
        onSwitchToSignup={showSignupModal}
      />
    </>
  );
};

export default CustomHeader;