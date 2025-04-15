import React from "react";
import { Menu } from "antd";
import { ExperimentOutlined, MinusCircleOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key: "/admin/dashboard", icon: <SettingOutlined />, label: "Bảng chính" },
        { key: "/admin/user-management", icon: <UserOutlined />, label: "Người dùng" },
        { key: "/admin/verify-account", icon: <UserOutlined />, label: "Xác minh tài khoản" },
        { key: "/admin/staff-management", icon: <UserOutlined />, label: "Nhân viên" },
        {
            key: "/admin/manage-vaccine",
            icon: <ExperimentOutlined />,
            label: "Nước hoa",
        },
        {
            key: "/admin/manage-vaccine-disease",
            icon: <MinusCircleOutlined />,
            label: "Loại nước hoa",
        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{
                height: "100%",
                borderRight: 0,
                marginTop: "64px",
            }}
            items={menuItems.map((item) => ({
                ...item,
                onClick: () => navigate(item.key),
            }))}
        />
    );
};

export default AdminSidebar;
