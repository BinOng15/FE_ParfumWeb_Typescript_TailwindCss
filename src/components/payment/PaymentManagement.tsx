/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions, notification } from "antd";
import { ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import paymentService from "../../services/paymentService";
import { GetAllPaymentRequest, PaymentResponse } from "../models/Payment";
import { CustomerResponseData } from "../models/Customer";
import customerService from "../../services/customerService";

const { Search } = Input;

const PaymentManagement: React.FC = () => {
    const [payments, setPayments] = useState<PaymentResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [selectedPayment, setSelectedPayment] = useState<PaymentResponse | null>(null);
    const [customers, setCustomers] = useState<{ [key: number]: CustomerResponseData }>({});
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    // const statusOptions = [
    //     { value: "", label: "Tất cả" },
    //     { value: "Pending", label: "Đang chờ" },
    //     { value: "Paid", label: "Đã thanh toán" },
    //     { value: "Failed", label: "Thất bại" },
    // ];

    const fetchPayments = async (page = 1, pageSize = 5) => {
        setLoading(true);
        try {
            const data: GetAllPaymentRequest = {
                pageNum: page,
                pageSize: pageSize,
                status: "Paid",
                keyword: "",
            };
            const response = await paymentService.getAllPayments(data);
            const paymentData = (response.pageData || []).map(payment => ({
                ...payment,
            }));

            // Lấy danh sách customerId duy nhất
            const customerIds = [...new Set(paymentData.map((payment) => payment.customerId))];
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

            setPayments(paymentData);

            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.pageInfo?.totalItem, // Sử dụng totalItem từ API
            });
        } catch (error: any) {
            console.error("Lỗi lấy danh sách thanh toán:", error);
            setPayments([]);
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể tải danh sách thanh toán.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments(1, pagination.pageSize);
    }, [pagination.pageSize]);

    useEffect(() => {
        fetchPayments(pagination.current, pagination.pageSize);
    }, [filterStatus, searchKeyword]);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchPayments(current, pageSize);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        setFilterStatus("");
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetchPayments(1, pagination.pageSize);
    };

    const showPaymentDetails = (payment: PaymentResponse) => {
        setSelectedPayment(payment);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedPayment(null);
    };

    const getStatusStyle = (status: string) => {
        let text = "";
        let style = {};

        switch (status) {
            case "Pending":
                text = "Đang chờ";
                style = {
                    color: "#fa8c16",
                    backgroundColor: "#fff7e6",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Paid":
                text = "Đã thanh toán";
                style = {
                    color: "#52c41a",
                    backgroundColor: "#f6ffed",
                    padding: "2px 8px",
                    borderRadius: "4px",
                };
                break;
            case "Failed":
                text = "Thất bại";
                style = {
                    color: "#ff4d4f",
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

    const columns: ColumnType<PaymentResponse>[] = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: PaymentResponse, index: number) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
            width: 60,
        },
        {
            title: "Tên khách hàng",
            key: "customerName",
            render: (_: any, record: PaymentResponse) => {
                const customer = customers[record.customerId];
                return customer ? customer.name : "Đang tải...";
            },
            width: 200,
        },
        {
            title: "Mã giao dịch",
            dataIndex: "transactionId",
            key: "transactionId",
            render: (transactionId: string | undefined) => transactionId || "N/A",
            width: 150,
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            render: (paymentMethod: string) => paymentMethod || "N/A",
        },
        {
            title: "Tổng tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => (
                <span>{amount.toLocaleString("vi-VN")} VNĐ</span>
            ),
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "paymentDate",
            key: "paymentDate",
            render: (paymentDate: string) => {
                // Kiểm tra ngày không hợp lệ
                const date = new Date(paymentDate);
                if (isNaN(date.getTime()) || date.getFullYear() < 1000) {
                    return "N/A";
                }
                return (
                    <span>
                        {date.toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                );
            },
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
            render: (_: any, record: PaymentResponse) => (
                <Space>
                    <EyeOutlined
                        onClick={() => showPaymentDetails(record)}
                        style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                        title="Xem chi tiết"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ THANH TOÁN
            </h2>
            <Row gutter={[16, 16]} style={{ marginBottom: 16, marginTop: 24 }}>
                <Col xs={24} sm={12} md={6}>
                    <Search
                        placeholder="Tìm kiếm theo mã giao dịch"
                        onSearch={onSearch}
                        enterButton
                        allowClear
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </Col>
                {/* <Col xs={24} sm={12} md={4}>
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
                </Col> */}
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
                dataSource={payments}
                rowKey="paymentId"
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
                title="Chi tiết thanh toán"
                open={isDetailModalVisible}
                onCancel={handleDetailModalClose}
                footer={null}
                width={600}
            >
                {selectedPayment && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Mã đơn hàng">
                            {selectedPayment.orderId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên khách hàng">
                            {customers[selectedPayment.customerId]?.name || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã giao dịch">
                            {selectedPayment.transactionId || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {selectedPayment.paymentMethod || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            {selectedPayment.amount.toLocaleString("vi-VN")} VNĐ
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày thanh toán">
                            {(() => {
                                const date = new Date(selectedPayment.paymentDate);
                                if (isNaN(date.getTime()) || date.getFullYear() < 1000) {
                                    return "N/A";
                                }
                                return date.toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                });
                            })()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {getStatusStyle(selectedPayment.status)}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Trạng thái xóa">
                            {selectedPayment.isDeleted ? "Đã xóa" : "Hoạt động"}
                        </Descriptions.Item> */}
                        {/* <Descriptions.Item label="URL thanh toán">
                            {selectedPayment.checkoutUrl ? (
                                <a href={selectedPayment.checkoutUrl} target="_blank" rel="noopener noreferrer">
                                    {selectedPayment.checkoutUrl}
                                </a>
                            ) : "N/A"}
                        </Descriptions.Item> */}
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default PaymentManagement;