import React from "react";
import { Layout, Input, Button, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
  return (
    <Footer className="bg-[#2C2C2C] text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-6">
        {/* Cột 1: Thông tin thương hiệu */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <div className="flex items-center mb-3">
            <img
              src="/logo.webp"
              alt="Eun de Parfum"
              className="w-12 h-12 mr-2 rounded-full"
            />
            <h2 className="text-xl font-bold text-[#FF8787]">EUN DE PARFUM</h2>
          </div>
          <p className="text-gray-300">
            Thế giới nước hoa dành cho học sinh, sinh viên và những người có thu
            nhập trung bình, nơi hương thơm thể hiện cá tính và phong cách riêng
            của bạn.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-300">
              <PhoneOutlined /> <strong>Hotline:</strong> +84 987654321
            </p>
            <p className="text-gray-300">
              <MailOutlined /> <strong>Email:</strong> support@eundeparfum.com
            </p>
            <p className="text-gray-300">
              <EnvironmentOutlined /> <strong>Địa chỉ:</strong> 123 Perfume
              Street, Quận 1, TP. HCM
            </p>
          </div>
        </div>

        {/* Cột 2: Menu điều hướng + Logo Bộ Công Thương */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-white mb-3">
            Về chúng tôi
          </h3>
          <ul className="text-gray-300 space-y-2">
            <li>
              <a href="/about" className="hover:text-[#FF8787]">
                Giới thiệu thương hiệu
              </a>
            </li>
            <li>
              <a href="/policy" className="hover:text-[#FF8787]">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#FF8787]">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-[#FF8787]">
                Chính sách vận chuyển
              </a>
            </li>
          </ul>
          {/* Logo "Đã Thông Báo Bộ Công Thương" */}
          <div className="mt-4">
            <img
              src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
              alt="Đã Thông Báo Bộ Công Thương"
              className="w-36"
            />
          </div>
        </div>

        {/* Cột 3: Đăng ký nhận tin */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold text-white mb-3">
            Đăng ký nhận tin mới
          </h3>
          <p className="text-gray-300 mb-3">
            Nhận thông tin về các dòng nước hoa mới nhất và ưu đãi độc quyền.
          </p>
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="Nhập email của bạn" prefix={<MailOutlined />} />
            <Button type="primary">Đăng ký</Button>
          </Space.Compact>
          <div className="flex space-x-4 mt-4">
            {/* Facebook Logo */}
            <a href="https://facebook.com">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            {/* Instagram Logo */}
            <a href="https://instagram.com">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6">
        &copy; 2024 <span className="text-[#FF8787]">EUN DE PARFUM</span>. All
        Rights Reserved · Design by{" "}
        <a href="#" className="text-[#FF8787]">
          Your Team
        </a>
      </div>
    </Footer>
  );
};

export default CustomFooter;
