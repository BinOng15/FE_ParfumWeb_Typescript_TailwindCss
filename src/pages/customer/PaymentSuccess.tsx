import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Button, message, Spin } from "antd";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";

interface PaymentResponse {
    paymentId: number;
    orderId: number;
    customerId: number;
    amount: number;
    status: string;
    isDeleted: boolean;
    transactionId: string;
    paymentMethod: string;
    paymentDate: string;
    checkoutUrl: string;
}

interface OrderResponse {
    orderId: number;
    customerId: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    orderDetails?: {
        orderDetailId: number;
        productId: number;
        productName: string;
        quantity: number;
        unitPrice: number;
    }[];
}

const PaymentSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [loading, setLoading] = useState(true);
    const [paymentInfo] = useState<{
        code: string;
        id: string;
        cancel: string;
        status: string;
        orderCode: string;
    }>({
        code: searchParams.get("code") || "N/A",
        id: searchParams.get("id") || "N/A",
        cancel: searchParams.get("cancel") || "N/A",
        status: searchParams.get("status") || "N/A",
        orderCode: searchParams.get("orderCode") || "N/A",
    });
    const [orderInfo, setOrderInfo] = useState<OrderResponse | null>(null);

    useEffect(() => {
        const fetchPaymentAndOrder = async () => {
            setLoading(true);
            try {
                // Lấy Payment bằng transactionId
                const paymentResponse = await paymentService.getPaymentByTransactionId(paymentInfo.id);
                if (paymentResponse.success && paymentResponse.data) {
                    const payment: PaymentResponse = paymentResponse.data.Data;

                    // Lấy Order bằng orderId từ Payment
                    const orderResponse = await orderService.getOrderById(payment.orderId);
                    if (orderResponse.success && orderResponse.data) {
                        setOrderInfo(orderResponse.data.Data);
                    } else {
                        message.error("Không tìm thấy thông tin đơn hàng!");
                    }
                } else {
                    message.error("Không tìm thấy thông tin thanh toán!");
                }

                // Kiểm tra trạng thái thanh toán
                if (paymentInfo.status === "PAID" && paymentInfo.code === "00") {
                    message.success("Thanh toán thành công!");
                } else {
                    message.error("Thanh toán không thành công hoặc đã bị hủy!");
                }
            } catch (error) {
                console.error("Error fetching payment/order:", error);
                message.error("Lỗi khi tải thông tin thanh toán/đơn hàng!");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentAndOrder();

        // Đếm ngược để chuyển hướng
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, paymentInfo.id, paymentInfo.status, paymentInfo.code]);

    const handleRedirect = () => {
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card
                title="Kết quả thanh toán"
                style={{ width: 500 }}
                className="shadow-lg"
            >
                {loading ? (
                    <Spin tip="Đang tải thông tin..." />
                ) : (
                    <>
                        <h3>Thông tin thanh toán</h3>
                        <p><strong>Mã trạng thái:</strong> {paymentInfo.code}</p>
                        <p><strong>ID giao dịch:</strong> {paymentInfo.id}</p>
                        <p><strong>Hủy thanh toán:</strong> {paymentInfo.cancel}</p>
                        <p><strong>Trạng thái:</strong> {paymentInfo.status}</p>
                        <p><strong>Mã đơn hàng:</strong> {paymentInfo.orderCode}</p>

                        {orderInfo && (
                            <>
                                <h3 className="mt-4">Thông tin đơn hàng</h3>
                                <p><strong>ID đơn hàng:</strong> {orderInfo.orderId}</p>
                                <p><strong>Tổng tiền:</strong> {orderInfo.totalAmount.toLocaleString()}đ</p>
                                <p><strong>Trạng thái:</strong> {orderInfo.status}</p>
                                <p><strong>Ngày tạo:</strong> {new Date(orderInfo.createdAt).toLocaleString()}</p>
                                {orderInfo.orderDetails && orderInfo.orderDetails.length > 0 && (
                                    <>
                                        <h4>Sản phẩm:</h4>
                                        <ul>
                                            {orderInfo.orderDetails.map((detail) => (
                                                <li key={detail.orderDetailId}>
                                                    {detail.productName} (x{detail.quantity}) - {detail.unitPrice.toLocaleString()}đ
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}

                        <p className="mt-4">
                            Sẽ chuyển hướng về trang chủ sau <strong>{countdown}</strong> giây...
                        </p>
                        <Button
                            type="primary"
                            onClick={handleRedirect}
                            className="mt-4 w-full"
                        >
                            Về trang chủ ngay
                        </Button>
                    </>
                )}
            </Card>
        </div>
    );
};

export default PaymentSuccess;