import React from "react";
import { Menu } from "antd";
import {
    DollarOutlined,
    CheckSquareOutlined,
    DashOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const StaffSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key: "/staff/dashboard", icon: <DashOutlined />, label: "Bảng chính" },

        {
            key: "/staff/order-management",
            icon: <CheckSquareOutlined />,
            label: "Đơn hàng",
        },
        {
            key: "/staff/payment-management",
            icon: <DollarOutlined />,
            label: "Thanh toán",
        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0, marginTop: "64px" }}
            items={menuItems.map((item) => ({
                ...item,
                onClick: () => navigate(item.key),
            }))}
        />
    );
};

export default StaffSidebar;
