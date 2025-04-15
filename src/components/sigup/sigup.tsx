/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Input, Modal, notification, Select } from "antd";
//import { GoogleOutlined } from "@ant-design/icons";
import customerService from "../../services/customerService";

const { Option } = Select;

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !gender || !phone || !address) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin!",
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        name: fullName,
        email,
        password,
        gender,
        phone,
        address,
      };
      await customerService.registerCustomer(data);
      notification.success({
        message: "Thành công",
        description: "Đăng ký thành công! Vui lòng chờ nhân viên xác minh tài khoản.",
      });
      onSignup({ fullName, email, password });
      onClose();
      setFullName("");
      setEmail("");
      setPassword("");
      setGender("");
      setPhone("");
      setAddress("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Không thể đăng ký!";
      notification.error({
        message: "Lỗi",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignup = async () => {
  //   setLoading(true);
  //   try {
  //     const googleId = "mock-google-id-12345";
  //     await customerService.registerWithGoogle(googleId);
  //     notification.success({
  //       message: "Thành công",
  //       description: "Đăng ký bằng Google thành công! Vui lòng đăng nhập.",
  //     });
  //     onClose();
  //   } catch (error: any) {
  //     const errorMessage = error.response?.data?.message || "Không thể đăng ký bằng Google!";
  //     notification.error({
  //       message: "Lỗi",
  //       description: errorMessage,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Modal
      title={null}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      className="custom-login-modal"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />
      <div
        className="flex flex-col ml-[80px]"
        style={{ position: "relative", zIndex: 2 }}
      >
        <h2 className="flex text-white text-3xl font-medium mb-4">Đăng ký</h2>
        <h2 className="flex text-white text-sm py-1">Tên đầy đủ</h2>
        <Input
          placeholder="Tên đầy đủ"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <h2 className="flex text-white text-sm py-1">Email</h2>
        <Input
          placeholder="Email"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2 className="flex text-white text-sm py-1">Mật khẩu</h2>
        <Input.Password
          placeholder="Mật khẩu"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h2 className="flex text-pink-500 text-sm py-1">Giới tính</h2>
        <Select
          placeholder="Chọn giới tính"
          className="w-4/5 h-10 mb-3"
          value={gender}
          onChange={(value) => setGender(value)}
        >
          <Option value="Male">Nam</Option>
          <Option value="Female">Nữ</Option>
          <Option value="Other">Khác</Option>
        </Select>
        <h2 className="flex text-pink-500 mentale text-sm py-1">Số điện thoại</h2>
        <Input
          placeholder="Số điện thoại"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <h2 className="flex text-pink-500 text-sm py-1">Địa chỉ</h2>
        <Input
          placeholder="Địa chỉ"
          className="w-4/5 h-10 px-4 rounded-lg border border-gray-300 text-sm mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            {/* <div>
              <Button
                icon={<GoogleOutlined />}
                onClick={handleGoogleSignup}
                loading={loading}
              />
            </div> */}
            <div>
              <Button
                type="primary"
                className="bg-pink-600 mr-[74px]"
                onClick={handleSignup}
                loading={loading}
              >
                Đăng ký
              </Button>
            </div>
          </div>
          <button
            onClick={onSwitchToSignin}
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