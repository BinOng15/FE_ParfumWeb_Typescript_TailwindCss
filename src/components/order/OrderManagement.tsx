/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions, notification, Select } from "antd";
import { ReloadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import orderService from "../../services/orderService";
import { OrderResponse, GetAllOrderRequest } from "../models/Order";

const { Search } = Input;
const { Option } = Select;

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const fetchOrders = async (page = 1, pageSize = 5, keyword = "") => {
        setLoading(true);
        try {
            const data: GetAllOrderRequest = {
                pageNum: page,
                pageSize: pageSize,
            };
            const response = await orderService.getAllOrders(data);
            let orderData = response.pageData || [];

            // Bộ lọc phía client: Tìm kiếm theo trạng thái
            if (keyword && orderData.length > 0) {
                const lowerKeyword = keyword.toLowerCase();
                orderData = orderData.filter((order) =>
                    (order.status?.toLowerCase() || "").includes(lowerKeyword)
                );
            }

            setOrders(orderData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.pageInfo?.totalItem || orderData.length,
            });
        } catch (error: any) {
            console.error("Lỗi lấy đơn hàng:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchOrders(current, pageSize, searchKeyword);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
        fetchOrders(1, pagination.pageSize, value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        fetchOrders(1, pagination.pageSize, "");
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
        Modal.confirm({
            title: "Xác nhận cập nhật trạng thái",
            content: `Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng thành "${newStatus}"?`,
            okText: "Cập nhật",
            okType: "primary",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const updateData: any = {
                        customerId: order.customerId,
                        products: order.orderDetails.map(detail => ({
                            productId: detail.productId,
                            quantity: detail.quantity,
                            price: detail.unitPrice,
                        })),
                        status: newStatus,
                    };
                    const response = await orderService.updateOrder(order.orderId, updateData);
                    if (response.Success) {
                        notification.success({
                            message: "Thành công",
                            description: "Cập nhật trạng thái đơn hàng thành công!",
                        });
                        fetchOrders(pagination.current, pagination.pageSize, searchKeyword);
                    } else {
                        throw new Error(response.Message || "Không thể cập nhật trạng thái!");
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

    const handleDeleteOrder = (order: OrderResponse) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: `Bạn có chắc chắn muốn ${order.isDeleted ? "khôi phục" : "xóa"} đơn hàng?`,
            okText: order.isDeleted ? "Khôi phục" : "Xóa",
            okType: order.isDeleted ? "primary" : "danger",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await orderService.deleteOrder(order.orderId, !order.isDeleted);
                    if (response.Success) {
                        notification.success({
                            message: "Thành công",
                            description: order.isDeleted
                                ? "Khôi phục đơn hàng thành công!"
                                : "Xóa đơn hàng thành công!",
                        });
                        fetchOrders(pagination.current, pagination.pageSize, searchKeyword);
                    } else {
                        throw new Error(response.Message || "Không thể thực hiện hành động!");
                    }
                } catch (error: any) {
                    notification.error({
                        message: "Lỗi",
                        description: error.message || "Không thể thực hiện hành động!",
                    });
                }
            },
        });
    };

    const statusOptions = [
        "Cart",
        "Paid",
        "Confirmed",
        "Processing",
        "Shipped",
        "Cancelled",
        "Rejected",
    ];

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
            dataIndex: "customerId",
            key: "customerId",
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
            render: (status: string, record: OrderResponse) => (
                <Select
                    value={status || "Unknown"}
                    onChange={(value) => handleUpdateStatus(record, value)}
                    style={{ width: 120 }}
                >
                    {statusOptions.map((option) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: "Trạng thái xóa",
            dataIndex: "isDeleted",
            key: "isDeleted",
            render: (isDeleted: boolean) => (
                <span>{isDeleted ? "Đã xóa" : "Hoạt động"}</span>
            ),
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
                    <DeleteOutlined
                        onClick={() => handleDeleteOrder(record)}
                        style={{ color: record.isDeleted ? "green" : "red", cursor: "pointer", fontSize: "18px" }}
                        title={record.isDeleted ? "Khôi phục" : "Xóa"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ ĐƠN HÀNG
            </h2>
            {!loading && orders.length === 0 && <p>Không có đơn hàng nào.</p>}
            <Row justify="space-between" style={{ marginBottom: 16, marginTop: 24 }}>
                <Col>
                    <Space>
                        <Search
                            placeholder="Tìm kiếm theo trạng thái"
                            onSearch={onSearch}
                            enterButton
                            allowClear
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <ReloadOutlined
                            onClick={handleReset}
                            style={{ fontSize: "24px", cursor: "pointer" }}
                        />
                    </Space>
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
                visible={isDetailModalVisible}
                onCancel={handleDetailModalClose}
                footer={null}
                width={800}
                bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
            >
                {selectedOrder && (
                    <>
                        <Descriptions column={1} bordered>
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
                                {selectedOrder.status || "Unknown"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái xóa">
                                {selectedOrder.isDeleted ? "Đã xóa" : "Hoạt động"}
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