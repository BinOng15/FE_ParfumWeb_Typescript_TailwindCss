import { useState } from "react";
import { UserOutlined, SettingOutlined, LogoutOutlined, GiftOutlined, PhoneOutlined, QuestionCircleOutlined, CreditCardOutlined, HomeOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("Thông tin");

    const menuItems = [
        { name: "Tài khoản của tôi", icon: <UserOutlined /> },
        { name: "Thông tin", icon: <UserOutlined />, active: true },
        { name: "Thanh toán", icon: <CreditCardOutlined /> },
        { name: "Địa chỉ", icon: <HomeOutlined /> },
        { name: "Thay đổi mật khẩu", icon: <SettingOutlined /> },
        { name: "Cài đặt", icon: <SettingOutlined /> },
        { name: "Giúp đỡ", icon: <QuestionCircleOutlined /> },
        { name: "Liên hệ", icon: <PhoneOutlined /> },
        { name: "Mã khuyến mãi", icon: <GiftOutlined /> },
        { name: "Đăng xuất", icon: <LogoutOutlined /> },
    ];

    return (
        <div className="w-64 bg-gray-100 h-screen p-4">
            {/* Avatar và tên */}
            <div className="flex flex-col items-center mb-6">
                <Avatar size={64} src="https://i.pravatar.cc/150?img=3" />
                <h3 className="mt-2 font-semibold">Dư Trần Vĩnh Hưng</h3>
            </div>
            {/* Danh sách menu */}
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${activeItem === item.name ? "bg-red-500 text-white" : "hover:bg-gray-200"
                            }`}
                        onClick={() => setActiveItem(item.name)}
                    >
                        <span className="mr-2 text-lg">{item.icon}</span>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
