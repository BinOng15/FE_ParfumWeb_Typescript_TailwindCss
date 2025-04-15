import React, { useState } from "react";
import { Button, Input, Modal, message } from "antd";
//import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { login } from "../../redux/authSlice";

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  onLogin,
  onSwitchToSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await authService.userLogin(email, password);
      const user = await authService.getCurrentUser(token);
      const userData = {
        customerId: user.customerId,
        email: user.email,
        roleName: user.roleName,
      };
      dispatch(login(userData));
      onLogin();
      onClose();
      message.success("Đăng nhập thành công!");

      // Điều hướng dựa trên vai trò
      switch (user.roleName) {
        case "User":
          navigate("/home");
          break;
        case "Staff":
          navigate("/staff");
          break;
        case "Admin":
          navigate("/admin/dashboard");
          break;
        default:
          message.warning("Vai trò không hợp lệ, chuyển về trang mặc định!");
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu!");
    }
  };

  // Hàm xử lý nhấn Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Modal
      title={null}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      className="custom-login-modal"
    >
      <div className="flex flex-col ml-[80px]">
        <h2 className="flex text-white text-3xl font-medium mb-4">Đăng nhập</h2>
        <h2 className="flex text-pink-500 text-sm py-1">Email</h2>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onPressEnter={handleKeyPress} // Thêm sự kiện Enter
          placeholder="Email"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
        />
        <h2 className="flex text-pink-500 text-sm py-1">Mật Khẩu</h2>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={handleKeyPress} // Thêm sự kiện Enter
          placeholder="Mật khẩu"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
        />
        <div className="flex justify-between w-full text-sm text-gray-600">
          <a href="#" className="hover:text-pink-600">
            Quên mật khẩu?
          </a>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            {/* <div>
              <Button icon={<FacebookOutlined />} className="mr-2" />
              <Button icon={<GoogleOutlined />} />
            </div> */}
            <div>
              <Button
                type="primary"
                className="bg-pink-600 mr-[62px]"
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
          <button
            onClick={onSwitchToSignup}
            className="flex text-sm hover:text-pink-600 text-center border-0 bg-transparent cursor-pointer"
          >
            Đăng ký ngay?
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;