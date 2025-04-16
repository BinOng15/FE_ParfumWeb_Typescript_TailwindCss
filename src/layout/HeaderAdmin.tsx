/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layout, Avatar, Dropdown, message } from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const { Header } = Layout;

interface AppHeaderProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const HeaderAdmin: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: any) => state.auth); // Lấy trạng thái từ Redux

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logout());
        message.success("Đăng xuất thành công!");
        navigate("/login");
    };

    const avatarMenuItems = [
        {
            key: "1",
            icon: <LogoutOutlined />,
            label: (
                <a
                    onClick={handleLogout}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    Đăng xuất
                </a>
            ),
        },
    ];

    const isHomePage = location.pathname === "/";

    return (
        <Layout>
            <Header
                className="header flex justify-between items-center bg-[#d9d9d9]"
                style={{ zIndex: 1001, position: "fixed", width: "100%" }}
            >
                <div className="flex-1 flex justify-start">
                    {!isHomePage &&
                        React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                style: { color: "black", fontSize: "20px", cursor: "pointer" },
                                onClick: () => setCollapsed(!collapsed),
                            }
                        )}
                </div>

                <div className="flex-1 flex justify-center">
                    <div
                        className="font-bold text-black"
                        style={{
                            fontFamily: "Pacifico",
                            fontWeight: 200,
                            fontSize: 40,
                        }}
                    >
                        Eun de Parfum
                    </div>
                </div>

                <div className="flex-1 flex justify-end items-center">
                    {isAuthenticated ? (
                        <Dropdown
                            menu={{ items: avatarMenuItems }}
                            trigger={["hover"]}
                            placement="bottomRight"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    marginLeft: "20px",
                                }}
                            >
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ color: "black", marginLeft: "10px" }}>
                                    Xin chào, Admin
                                </span>
                            </div>
                        </Dropdown>
                    ) : (
                        <button
                            className="bg-white text-[#102A83] py-2 px-4 rounded-full max-w-xs w-auto mr-4 hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => navigate("/login", { replace: true })}
                            style={{
                                padding: "6px 12px",
                                fontSize: "14px",
                                lineHeight: "20px",
                                fontWeight: "500",
                                borderRadius: "9999px",
                                marginRight: "10px",
                            }}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </Header>
        </Layout>
    );
};

export default HeaderAdmin;