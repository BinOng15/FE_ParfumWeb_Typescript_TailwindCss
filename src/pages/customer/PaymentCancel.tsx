// src/pages/PaymentCancel.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const PaymentCancel: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        message.warning("Thanh toán đã bị hủy!");
        localStorage.removeItem("pendingOrderId");
        localStorage.removeItem("selectedOrderDetailIds");
        navigate("/cart");
    }, [navigate]);

    return <div>Đang xử lý...</div>;
};

export default PaymentCancel;