import React from "react";
import { Button, Input, Modal } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

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
  return (
    <Modal
      title={null}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      className="custom-login-modal"
    >
      <div className="flex flex-col ml-[80px] ">
        <h2 className="flex text-white text-3xl font-medium mb-4">Đăng nhập</h2>
        <h2 className="flex text-pink-500 text-sm py-1">Email</h2>
        <Input
          placeholder="Email"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
        />
        <h2 className="flex text-pink-500 text-sm py-1">Mật Khẩu ?</h2>
        <Input.Password
          placeholder="Mật khẩu"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
        />
        <div className="flex justify-between w-full text-sm text-gray-600">
          <a href="#" className="hover:text-pink-600">
            Quên mật khẩu?
          </a>
        </div>

        <div className="space-y-4 mt-4">
          {/* Dòng chứa các icon ở bên trái và nút Đăng nhập ở bên phải */}
          <div className="flex justify-between items-center">
            <div>
              <Button icon={<FacebookOutlined />} className="mr-2" />
              <Button icon={<GoogleOutlined />} />
            </div>
            <div>
              <Button
                type="primary"
                className="bg-pink-600 mr-[62px] "
                onClick={onLogin}
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
