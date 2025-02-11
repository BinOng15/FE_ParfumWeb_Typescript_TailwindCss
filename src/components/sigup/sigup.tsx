import React from "react";
import { Button, Input, Modal } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

interface SignupModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSignup: (values: {
    fullName: string;
    email: string;
    password: string;
  }) => void;
  onSwitchToSignin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isVisible,
  onClose,
  onSignup,
  onSwitchToSignin,
}) => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignup = () => {
    if (fullName && email && password) {
      onSignup({ fullName, email, password });
    } else {
      alert("Vui lòng điền đầy đủ thông tin.");
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
        <h2 className="flex text-white text-3xl font-medium mb-4">Đăng ký</h2>
        <h2 className="flex text-pink-500 text-sm py-1">Tên đầy đủ</h2>
        <Input
          placeholder="Tên đầy đủ"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <h2 className="flex text-pink-500 text-sm py-1">Email</h2>
        <Input
          placeholder="Email"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2 className="flex text-pink-500 text-sm py-1">Mật khẩu</h2>
        <Input.Password
          placeholder="Mật khẩu"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <Button icon={<FacebookOutlined />} className="mr-2" />
              <Button icon={<GoogleOutlined />} />
            </div>
            <div>
              <Button
                type="primary"
                className="bg-pink-600 mr-[74px]"
                onClick={handleSignup}
              >
                Đăng ký
              </Button>
            </div>
          </div>
          <button
            onClick={onSwitchToSignin} // Gọi đúng hàm chuyển đổi modal
            className="flex text-sm hover:text-pink-600 text-center border-0 bg-transparent cursor-pointer"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignupModal;
