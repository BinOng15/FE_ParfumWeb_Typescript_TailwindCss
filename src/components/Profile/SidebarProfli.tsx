import { useState } from "react";
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Thêm Link và useLocation
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Sidebar = () => {
    const location = useLocation(); // Lấy URL hiện tại
    const [activeItem, setActiveItem] = useState("Thông tin cá nhân"); // Mặc định
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Thêm useNavigate để điều hướng

    const menuItems = [
        { name: "Tài khoản của tôi", icon: <UserOutlined />, link: "/profile" },
        { name: "Thông tin", icon: <UserOutlined />, link: "/profile/edit" },
        { name: "Đơn hàng", icon: <ShoppingOutlined />, link: "/order-history" },
        { name: "Thay đổi mật khẩu", icon: <SettingOutlined />, link: "/change-password" },
        { name: "Đăng xuất", icon: <LogoutOutlined />, link: "#" }, // Không cần link thật
    ];

    // Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/login"); // Điều hướng về trang đăng nhập
        message.success("Đăng xuất thành công!");
    };

    return (
        <div className="w-64 bg-gray-100 h-screen p-4">
            {/* Avatar và tên */}
            <div className="flex flex-col items-center mb-6">
                <Avatar size={64} src="/default.png" />
                <h3 className="mt-2 font-semibold">Dư Trần Vĩnh Hưng</h3>
            </div>
            {/* Danh sách menu */}
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        {item.name === "Đăng xuất" ? (
                            // Xử lý Đăng xuất riêng
                            <div
                                className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${activeItem === item.name ? "bg-red-500 text-white" : "hover:bg-gray-200"
                                    }`}
                                onClick={handleLogout}
                            >
                                <span className="mr-2 text-lg">{item.icon}</span>
                                {item.name}
                            </div>
                        ) : (
                            // Các mục khác dùng Link
                            <Link
                                to={item.link}
                                className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${location.pathname === item.link ? "bg-red-500 text-white" : "hover:bg-gray-200"
                                    }`}
                                onClick={() => setActiveItem(item.name)}
                            >
                                <span className="mr-2 text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;