/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions, notification, Select } from "antd";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import orderService from "../../services/orderService";
import authService from "../../services/authService";
import Sidebar from "../../components/Profile/SidebarProfli";
import { OrderResponse } from "../models/Order";
import productService from "../../services/productService";

const generateRandomCode = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 6;
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
};

const { Search } = Input;
const { Option } = Select;

const OrderTransaction: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>("");

    const statusOptions = [
        { value: "", label: "Tất cả" },
        { value: "Cart", label: "Giỏ hàng" },
        { value: "Paid", label: "Đã thanh toán" },
        { value: "Confirmed", label: "Đã xác nhận" },
        { value: "Processing", label: "Đang xử lý" },
        { value: "Completed", label: "Hoàn thành" },
        { value: "Cancelled", label: "Đã hủy" },
        { value: "Rejected", label: "Đã từ chối" },
    ];

    // Chuẩn hóa trạng thái từ API
    const normalizeStatus = (status: string | undefined): string => {
        if (!status) return "Unknown";
        const statusMap: { [key: string]: string } = {
            cart: "Cart",
            paid: "Paid",
            confirmed: "Confirmed",
            processing: "Processing",
            completed: "Completed",
            cancelled: "Cancelled",
            rejected: "Rejected",
            waitingforpaid: "Cart",
        };
        return statusMap[status.toLowerCase()] || "Unknown";
    };

    // Lấy customerId từ getCurrentUser
    useEffect(() => {
        const fetchCustomerId = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Vui lòng đăng nhập!");
                }
                const user = await authService.getCurrentUser(token);
                setCustomerId(user.customerId);
            } catch (error: any) {
                console.error("Lỗi khi lấy thông tin khách hàng:", error);
                notification.error({
                    message: "Lỗi",
                    description: "Không thể lấy thông tin khách hàng.",
                });
            }
        };
        fetchCustomerId();
    }, []);

    // Lấy danh sách đơn hàng
    const fetchOrders = async (page = 1, pageSize = 5, statusFilter = filterStatus) => {
        if (!customerId) return;

        setLoading(true);
        try {
            const response = await orderService.getOrderByCustomerId(customerId);
            // API trả về object { code, success, message, data }, lấy trường data
            const orderData = response.data;
            // Xử lý orderData là object hoặc mảng
            const rawOrders = orderData ? (Array.isArray(orderData) ? orderData : [orderData]) : [];
            let normalizedOrders = rawOrders.map((order: OrderResponse) => ({
                ...order,
                status: normalizeStatus(order.status),
            }));

            console.log("Raw orders:", orderData);
            console.log("Normalized orders:", normalizedOrders);

            // Sắp xếp theo orderDate giảm dần (mới nhất lên trước)
            normalizedOrders.sort((a: OrderResponse, b: OrderResponse) => {
                const dateA = new Date(a.orderDate).getTime();
                const dateB = new Date(b.orderDate).getTime();
                return dateB - dateA; // Giảm dần
            });

            console.log("Sorted orders:", normalizedOrders);

            // Lọc phía client
            if (normalizedOrders.length > 0) {
                // Lọc theo trạng thái
                if (statusFilter) {
                    normalizedOrders = normalizedOrders.filter((order) => order.status === statusFilter);
                }

                // Lọc theo từ khóa (trạng thái)
                if (searchKeyword) {
                    const lowerKeyword = searchKeyword.toLowerCase();
                    normalizedOrders = normalizedOrders.filter((order) => {
                        const statusText = statusOptions.find((opt) => opt.value === order.status)?.label.toLowerCase() || "";
                        return statusText.includes(lowerKeyword);
                    });
                }
            }

            // Phân trang phía client
            const startIndex = (page - 1) * pageSize;
            const paginatedOrders = normalizedOrders.slice(startIndex, startIndex + pageSize);

            setOrders(paginatedOrders);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: normalizedOrders.length,
            });
        } catch (error: any) {
            console.error("Lỗi lấy đơn hàng:", error);
            setOrders([]);
            notification.error({
                message: "Lỗi",
                description: "Không thể tải danh sách đơn hàng.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchOrders khi customerId, filterStatus hoặc searchKeyword thay đổi
    useEffect(() => {
        if (customerId) {
            fetchOrders(1, pagination.pageSize, filterStatus);
        }
    }, [customerId, filterStatus, searchKeyword]);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchOrders(current, pageSize, filterStatus);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        setFilterStatus("");
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetchOrders(1, pagination.pageSize, "");
    };

    const showOrderDetails = async (order: OrderResponse) => {
        try {
            const updatedOrder = { ...order };
            // Lấy thông tin sản phẩm cho từng OrderDetail
            const productPromises = updatedOrder.orderDetails.map(async (detail: any) => {
                if (detail.productId) {
                    const product = await productService.getProductById(detail.productId);
                    return { ...detail, product };
                }
                return detail;
            });

            updatedOrder.orderDetails = await Promise.all(productPromises);
            console.log("Updated order details with products:", updatedOrder.orderDetails);
            setSelectedOrder(updatedOrder);
            setIsDetailModalVisible(true);
        } catch (error: any) {
            console.error("Error fetching product details:", error);
            notification.error({
                message: "Lỗi",
                description: "Không thể tải thông tin sản phẩm.",
            });
            setSelectedOrder(order);
            setIsDetailModalVisible(true);
        }
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedOrder(null);
    };

    // Hàm hiển thị trạng thái với text và style
    const getStatusStyle = (status: string) => {
        let text = "";
        let style = {};

        switch (status) {
            case "Cart":
                text = "Giỏ hàng";
                style = {
                    color: "#00474f",
                    backgroundColor: "#e6fffb",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Paid":
                text = "Đã thanh toán";
                style = {
                    color: "#1890ff",
                    backgroundColor: "#e6f7ff",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Confirmed":
                text = "Đã xác nhận";
                style = {
                    color: "#722ed1",
                    backgroundColor: "#f9f0ff",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Processing":
                text = "Đang xử lý";
                style = {
                    color: "#fa8c16",
                    backgroundColor: "#fff7e6",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Completed":
                text = "Hoàn thành";
                style = {
                    color: "#52c41a",
                    backgroundColor: "#f6ffed",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Cancelled":
                text = "Đã hủy";
                style = {
                    color: "#ff4d4f",
                    backgroundColor: "#fff1f0",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Rejected":
                text = "Đã từ chối";
                style = {
                    color: "#a8071a",
                    backgroundColor: "#fff1f0",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            default:
                text = "Không xác định";
                style = {
                    color: "#000",
                    backgroundColor: "#f5f5f5",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
        }

        return <span style={style}>{text}</span>;
    };

    const columns: ColumnType<OrderResponse>[] = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: OrderResponse, index: number) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
            width: 60,
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "orderId",
            key: "orderId",
            render: () => (
                <span
                    style={{
                        color: "#d48806",
                        backgroundColor: "#fffbe6",
                        padding: "2px 8px",
                        borderRadius: "4px",
                    }}
                >
                    {generateRandomCode()}
                </span>
            ),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (totalAmount: number) => <span>{totalAmount.toLocaleString("vi-VN")}đ</span>,
        },
        {
            title: "Ngày đặt hàng",
            dataIndex: "orderDate",
            key: "orderDate",
            render: (orderDate: string) => (
                <span>
                    {new Date(orderDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => getStatusStyle(status),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: OrderResponse) => (
                <Space>
                    <EyeOutlined
                        onClick={() => showOrderDetails(record)}
                        style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                        title="Xem chi tiết"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6">
                <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">LỊCH SỬ ĐƠN HÀNG</h2>
                <Row gutter={[16, 16]} style={{ marginBottom: 16, marginTop: 24 }}>
                    <Col xs={24} sm={12} md={6}>
                        <Search
                            placeholder="Tìm kiếm theo trạng thái"
                            onSearch={onSearch}
                            enterButton
                            allowClear
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Select
                            placeholder="Chọn trạng thái"
                            style={{ width: "100%" }}
                            value={filterStatus}
                            onChange={(value) => setFilterStatus(value)}
                        >
                            {statusOptions.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={2}>
                        <ReloadOutlined
                            onClick={handleReset}
                            style={{ fontSize: "24px", cursor: "pointer" }}
                            title="Xóa bộ lọc"
                        />
                    </Col>
                </Row>
                {orders.length === 0 && !loading ? (
                    <div className="text-center p-4">Bạn chưa có đơn hàng nào.</div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey="orderId"
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                )}
                <Modal
                    title="Chi tiết đơn hàng"
                    open={isDetailModalVisible}
                    onCancel={handleDetailModalClose}
                    footer={null}
                    width={800}
                    styles={{ body: { maxHeight: "60vh", overflowY: "auto" } }}
                >
                    {selectedOrder && (
                        <>
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label="Tổng tiền">
                                    {selectedOrder.totalAmount.toLocaleString("vi-VN")}đ
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày đặt hàng">
                                    {new Date(selectedOrder.orderDate).toLocaleDateString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">{getStatusStyle(selectedOrder.status)}</Descriptions.Item>
                            </Descriptions>
                            <h3 style={{ marginTop: 16, marginBottom: 8 }}>Chi tiết sản phẩm</h3>
                            <Table
                                dataSource={selectedOrder.orderDetails}
                                columns={[
                                    {
                                        title: "Ảnh sản phẩm",
                                        key: "imageUrl",
                                        render: (record: any) => (
                                            <img
                                                src={record.product?.imageUrl || "https://via.placeholder.com/50"}
                                                alt={record.productName || "Product"}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    borderRadius: "4px",
                                                }}
                                                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/50")}
                                            />
                                        ),
                                        width: 150,
                                    },
                                    {
                                        title: "Tên sản phẩm",
                                        dataIndex: "productName",
                                        key: "productName",
                                        render: (productName: string | null) => productName || "N/A",
                                    },
                                    {
                                        title: "Số lượng",
                                        dataIndex: "quantity",
                                        key: "quantity",
                                    },
                                    {
                                        title: "Đơn giá",
                                        dataIndex: "unitPrice",
                                        key: "unitPrice",
                                        render: (unitPrice: number) => <span>{unitPrice.toLocaleString("vi-VN")} VNĐ</span>,
                                    },
                                ]}
                                rowKey="orderDetailId"
                                pagination={false}
                            />
                        </>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default OrderTransaction;