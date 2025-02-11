import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Badge, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignupModal from "../components/sigup/sigup";
import LoginModal from "../components/login/login";

// Import LoginModal

const CustomHeader: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng trang
  const location = useLocation();
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

  const handleSignup = (values: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    console.log("Đăng ký thành công với thông tin:", values);
    setIsSignupModalVisible(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-xl">
        <div className="flex items-center">
          {/* <select className="border border-gray-300 rounded-md px-2 py-1">
                        <option>Vietnamese</option>
                        <option>English</option>
                    </select> */}
        </div>
        <div className="ml-[250px]">
          <img
            src="/Screenshot 2024-12-20 150332.png"
            alt="EundeParfum"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Badge count={9} offset={[0, 0]} color="red">
            <HeartOutlined className="text-lg cursor-pointer" />
          </Badge>
          <Badge count={9} offset={[0, 0]} color="red"
            onClick={() => navigate(`/cart`)}>
            <ShoppingCartOutlined className="text-lg cursor-pointer" />
          </Badge>
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
        <Link to="/about" className="relative hover:text-pink-600 text-center">
          GIỚI THIỆU
          {location.pathname === "/about" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-md"></span>
          )}
        </Link>
        <Link to="/brands" className="relative hover:text-pink-600 text-center">
          THƯƠNG HIỆU
          {location.pathname === "/brands" && (
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

      {/* Modal Đăng nhập */}
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
