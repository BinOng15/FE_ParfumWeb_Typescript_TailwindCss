/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, notification, Modal, Descriptions } from "antd";
import { ReloadOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { CustomerResponseData, GetAllCustomerRequest } from "../models/Customer";
import customerService from "../../services/customerService";
import AddStaffButton from "./AddStaffButton";
import EditStaffModal from "./EditStaffButton";

const { Search } = Input;
const { confirm } = Modal;

interface User extends CustomerResponseData {
    customerId: number;
}

const StaffManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editUserId, setEditUserId] = useState<number | null>(null);

    const fetchUsers = async (
        page = 1,
        pageSize = 5,
        keyword = ""
    ) => {
        setLoading(true);
        try {
            const roles = ["Admin", "Staff", "Manager"];
            let allUsers: User[] = [];
            let totalItems = 0;

            for (const role of roles) {
                const data: GetAllCustomerRequest = {
                    pageNum: page,
                    pageSize: pageSize,
                    keyWord: keyword,
                    role: role,
                    status: true,
                    is_Verify: true,
                    is_Delete: false,
                };
                const response = await customerService.getAllCustomers(data);
                const userData = response.pageData || [];
                allUsers = [...allUsers, ...userData];
                totalItems += response.pageInfo?.totalItem || userData.length;
            }

            setUsers(allUsers);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: totalItems,
            });
        } catch (error) {
            console.error("Lỗi lấy người dùng:", error);
            notification.error({
                message: "Lỗi",
                description: "Không thể lấy danh sách người dùng!",
            });
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchUsers(current, pageSize, searchKeyword);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
        fetchUsers(1, pagination.pageSize, value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        fetchUsers(1, pagination.pageSize, "");
    };

    const showUserDetails = (user: User) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showEditModal = (userId: number) => {
        setEditUserId(userId);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        setEditUserId(null);
    };

    const handleDelete = (userId: number, userName: string) => {
        confirm({
            title: "Xác nhận xóa",
            content: `Bạn có chắc chắn muốn xóa người dùng "${userName}"?`,
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    await customerService.deleteCustomer(userId, false); // Xóa mềm (status: false)
                    notification.success({
                        message: "Thành công",
                        description: "Xóa người dùng thành công!",
                    });
                    fetchUsers(pagination.current, pagination.pageSize, searchKeyword); // Làm mới danh sách
                } catch (error: any) {
                    notification.error({
                        message: "Lỗi",
                        description: error.message || "Không thể xóa người dùng!",
                    });
                }
            },
        });
    };

    const columns: ColumnType<User>[] = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: User, index: number) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
            width: 60,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender: string) => (
                <span>{gender === "Male" ? "Nam" : gender === "Female" ? "Nữ" : gender}</span>
            ),
        },
        {
            title: "Vai trò",
            dataIndex: "roleName",
            key: "roleName",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: User) => (
                <Space>
                    <EyeOutlined
                        onClick={() => showUserDetails(record)}
                        style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                    />
                    <EditOutlined
                        onClick={() => showEditModal(record.customerId)}
                        style={{ color: "green", cursor: "pointer", fontSize: "18px" }}
                    />
                    <DeleteOutlined
                        onClick={() => handleDelete(record.customerId, record.name)}
                        style={{ color: "red", cursor: "pointer", fontSize: "18px" }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ NHÂN VIÊN VÀ QUẢN LÝ
            </h2>
            {!loading && users.length === 0 && <p>Không có người dùng nào.</p>}
            <Row justify="space-between" style={{ marginBottom: 16, marginTop: 24 }}>
                <Col>
                    <Space>
                        <Search
                            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
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
                <Col>
                    <AddStaffButton refreshUsers={() => fetchUsers(pagination.current, pagination.pageSize, searchKeyword)} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="customerId"
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
                title="Chi tiết người dùng"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={600}
            >
                {selectedUser && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Tên">{selectedUser.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{selectedUser.phone}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">
                            {selectedUser.gender === "Male" ? "Nam" : selectedUser.gender === "Female" ? "Nữ" : selectedUser.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{selectedUser.address}</Descriptions.Item>
                        <Descriptions.Item label="Vai trò">{selectedUser.roleName}</Descriptions.Item>
                        <Descriptions.Item label="Xác minh">
                            {selectedUser.isVerify ? "Đã xác minh" : "Chưa xác minh"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {new Date(selectedUser.createdAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sửa đổi">
                            {selectedUser.modifiedDate
                                ? new Date(selectedUser.modifiedDate).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : "Chưa sửa đổi"}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
            <EditStaffModal
                userId={editUserId}
                visible={isEditModalVisible}
                onClose={handleEditModalClose}
                refreshUsers={() => fetchUsers(pagination.current, pagination.pageSize, searchKeyword)}
            />
        </div>
    );
};

export default StaffManagement;