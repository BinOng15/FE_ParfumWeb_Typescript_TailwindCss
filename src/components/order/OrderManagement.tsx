/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions, notification, Button, Tooltip, Select } from "antd";
import { ReloadOutlined, EyeOutlined, DollarOutlined, CheckCircleOutlined, SyncOutlined, CheckSquareOutlined, CloseCircleOutlined, StopOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import orderService from "../../services/orderService";
import customerService from "../../services/customerService";
import { OrderResponse, GetAllOrderRequest } from "../models/Order";
import { CustomerResponseData } from "../models/Customer";

const { Search } = Input;
const { Option } = Select;

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [customers, setCustomers] = useState<{ [key: number]: CustomerResponseData }>({});
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

    const fetchOrders = async (page = 1, pageSize = 5) => {
        setLoading(true);
        try {
            const data: GetAllOrderRequest = {
                pageNum: page,
                pageSize: pageSize,
            };
            const response = await orderService.getAllOrders(data);
            const orderData = (response.pageData || []).map(order => ({
                ...order,
                status: normalizeStatus(order.status),
            }));

            console.log("API response:", response);

            // Lấy danh sách customerId duy nhất
            const customerIds = [...new Set(orderData.map((order) => order.customerId))];
            const customerPromises = customerIds.map(async (id) => {
                try {
                    return await customerService.getCustomerById(id);
                } catch (error) {
                    console.error(`Lỗi khi lấy khách hàng ${id}:`, error);
                    return null;
                }
            });
            const customerResults = await Promise.all(customerPromises);

            const customerMap = customerResults.reduce((acc, customer) => {
                if (customer) {
                    acc[customer.customerId] = customer;
                }
                return acc;
            }, {} as { [key: number]: CustomerResponseData });

            setCustomers(customerMap);
            setOrders(orderData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.pageInfo?.totalItem || orderData.length,
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

    useEffect(() => {
        fetchOrders(1, pagination.pageSize);
    }, [filterStatus, searchKeyword]);

    useEffect(() => {
        fetchOrders(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchOrders(current, pageSize);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        setFilterStatus("");
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetchOrders(1, pagination.pageSize);
    };

    const showOrderDetails = (order: OrderResponse) => {
        setSelectedOrder(order);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedOrder(null);
    };

    const handleUpdateStatus = (order: OrderResponse, newStatus: string) => {
        const statusText = getStatusStyle(newStatus).props.children;
        Modal.confirm({
            title: "Xác nhận cập nhật trạng thái",
            content: `Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng thành "${statusText}"?`,
            okText: "Cập nhật",
            okType: "primary",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await orderService.updateOrderStatus(order.orderId, newStatus);
                    if (response.success) {
                        notification.success({
                            message: "Thành công",
                            description: `Cập nhật trạng thái đơn hàng thành "${statusText}" thành công!`,
                        });
                        fetchOrders(pagination.current, pagination.pageSize);
                    } else {
                        throw new Error(response.message || "Không thể cập nhật trạng thái!");
                    }
                } catch (error: any) {
                    notification.error({
                        message: "Lỗi",
                        description: error.message || "Không thể cập nhật trạng thái đơn hàng!",
                    });
                }
            },
        });
    };

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

    const getAvailableStatuses = (currentStatus: string) => {
        switch (currentStatus) {
            case "Cart":
                return [
                    { status: "Paid", icon: <DollarOutlined />, tooltip: "Chuyển sang Đã thanh toán" },
                    { status: "Cancelled", icon: <CloseCircleOutlined />, tooltip: "Hủy đơn hàng" },
                    { status: "Rejected", icon: <StopOutlined />, tooltip: "Từ chối đơn hàng" },
                ];
            case "Paid":
                return [
                    { status: "Confirmed", icon: <CheckCircleOutlined />, tooltip: "Xác nhận đơn hàng" },
                    { status: "Cancelled", icon: <CloseCircleOutlined />, tooltip: "Hủy đơn hàng" },
                    { status: "Rejected", icon: <StopOutlined />, tooltip: "Từ chối đơn hàng" },
                ];
            case "Confirmed":
                return [
                    { status: "Processing", icon: <SyncOutlined />, tooltip: "Đang xử lý" },
                    { status: "Cancelled", icon: <CloseCircleOutlined />, tooltip: "Hủy đơn hàng" },
                    { status: "Rejected", icon: <StopOutlined />, tooltip: "Từ chối đơn hàng" },
                ];
            case "Processing":
                return [
                    { status: "Completed", icon: <CheckSquareOutlined />, tooltip: "Hoàn thành đơn hàng" },
                    { status: "Cancelled", icon: <CloseCircleOutlined />, tooltip: "Hủy đơn hàng" },
                    { status: "Rejected", icon: <StopOutlined />, tooltip: "Từ chối đơn hàng" },
                ];
            case "Completed":
            case "Cancelled":
            case "Rejected":
                return [];
            default:
                return [];
        }
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
            title: "Tên khách hàng",
            key: "customerName",
            render: (_: any, record: OrderResponse) => {
                const customer = customers[record.customerId];
                return customer ? customer.name : "Đang tải...";
            },
        },
        {
            title: "Địa chỉ giao hàng",
            key: "address",
            render: (_: any, record: OrderResponse) => {
                const customer = customers[record.customerId];
                return customer && customer.address ? customer.address : "Chưa cung cấp";
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (totalAmount: number) => (
                <span>{totalAmount.toLocaleString("vi-VN")} VNĐ</span>
            ),
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
            render: (_: any, record: OrderResponse) => {
                const availableStatuses = getAvailableStatuses(record.status);
                return (
                    <Space>
                        <EyeOutlined
                            onClick={() => showOrderDetails(record)}
                            style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                            title="Xem chi tiết"
                        />
                        {availableStatuses.map(({ status, icon, tooltip }) => (
                            <Tooltip key={status} title={tooltip}>
                                <Button
                                    type="text"
                                    icon={icon}
                                    onClick={() => handleUpdateStatus(record, status)}
                                    style={{ color: getStatusStyle(status).props.style.color, fontSize: "18px" }}
                                />
                            </Tooltip>
                        ))}
                    </Space>
                );
            },
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ ĐƠN HÀNG
            </h2>
            <Row gutter={[16, 16]} style={{ marginBottom: 16, marginTop: 24 }}>
                <Col xs={24} sm={12} md={6}>
                    <Search
                        placeholder="Tìm kiếm theo trạng thái hoặc tên khách hàng"
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
                        onChange={(value) => {
                            console.log("Selected status:", value);
                            setFilterStatus(value);
                        }}
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
                            <Descriptions.Item label="Tên khách hàng">
                                {customers[selectedOrder.customerId]?.name || "Không xác định"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ giao hàng">
                                {customers[selectedOrder.customerId]?.address || "Chưa cung cấp"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tổng tiền">
                                {selectedOrder.totalAmount.toLocaleString("vi-VN")} VNĐ
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt hàng">
                                {new Date(selectedOrder.orderDate).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                {getStatusStyle(selectedOrder.status)}
                            </Descriptions.Item>
                        </Descriptions>
                        <h3 style={{ marginTop: 16, marginBottom: 8 }}>Chi tiết sản phẩm</h3>
                        <Table
                            dataSource={selectedOrder.orderDetails}
                            columns={[
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
                                    render: (unitPrice: number) => (
                                        <span>{unitPrice.toLocaleString("vi-VN")} VNĐ</span>
                                    ),
                                },
                            ]}
                            rowKey="orderDetailId"
                            pagination={false}
                        />
                    </>
                )}
            </Modal>
        </div>
    );
};

export default OrderManagement;