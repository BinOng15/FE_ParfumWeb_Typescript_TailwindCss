import React, { useState } from "react";
import { Pagination } from "antd";

import { DownOutlined, UpOutlined } from "@ant-design/icons";

// Fake dữ liệu lịch sử đơn hàng
const fakeOrders = [
    {
        id: "ORD1001",
        date: "2024-02-13",
        status: "Đã giao",
        total: "1.500.000 VNĐ",
        items: [
            {
                name: "Nước hoa Chanel No5",
                quantity: 1,
                price: "1.000.000 VNĐ",
                img: "https://th.bing.com/th/id/OIP.KlmxDxwCYtUAXnYBRcJ6owHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            },
            {
                name: "Nước hoa Dior Sauvage",
                quantity: 1,
                price: "500.000 VNĐ",
                img: "https://th.bing.com/th/id/OIP.SxRhNuXQd6-lfWXKuSgFUwHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
        ]
    },
    {
        id: "ORD1002",
        date: "2024-02-14",
        status: "Đang xử lý",
        total: "700.000 VNĐ",
        items: [
            {
                name: "Nước hoa Gucci Bloom",
                quantity: 1,
                price: "700.000 VNĐ",
                img: "https://th.bing.com/th/id/OIP.RhqQc-EIKgr-QsRv6lyqtQHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
        ]
    }
];

const OrderHistory: React.FC = () => {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);


    const toggleOrderDetails = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (

        <div className="p-6 bg-white">
            <header className="w-full p-4 text-center">
                <h1 className="text-3xl font-[500]">Lịch sử đơn hàng</h1>
            </header>
            <div className="border p-6 border-gray-200 rounded-lg shadow">
                {fakeOrders.map((order) => (
                    <div key={order.id} className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                            <div className="flex space-x-6 text-lg">
                                <span className="font-bold">Mã đơn: {order.id}</span>
                                <span className="text-gray-600">Ngày đặt: {order.date}</span>
                                <span className={`font-semibold ${order.status === "Đã hủy" ? "text-red-500" : "text-green-600"}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="text-xl">{expandedOrder === order.id ? <UpOutlined /> : <DownOutlined />}</div>
                        </div>
                        {expandedOrder === order.id && (
                            <div className="mt-4 bg-gray-100 p-6 rounded-lg">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-gray-700 border-b pb-4 mb-4">
                                        <img src={item.img} alt={item.name} className="w-24 h-24 rounded-lg" />
                                        <span className="text-lg font-medium">{item.name}</span>
                                        <span className="text-lg">x{item.quantity}</span>
                                        <span className="text-lg font-semibold text-red-500">{item.price}</span>
                                    </div>
                                ))}
                                <div className="text-right font-bold text-xl mt-4">Tổng cộng: {order.total}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <Pagination

                />
            </div>
        </div>

    );
};

export default OrderHistory;