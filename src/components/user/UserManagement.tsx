/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    Table,
    Input,
    Button,
    Space,
    Row,
    Col,
    Tabs,
    notification,
} from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import ToggleStatusButton from "./ToggleStatusButton";
import EditUserModal from "./EditUserModal";
import { ColumnType } from "antd/es/table";
import { BaseResponse, CustomerResponseData, GetAllCustomerRequest } from "../models/Customer";
import customerService from "../../services/customerService";
import AddUserModal from "./AddUserButton";

const { Search } = Input;
const { TabPane } = Tabs;

interface User extends CustomerResponseData {
    customerId: number;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeTab, setActiveTab] = useState("activeUsers");
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);

    const fetchUsers = async (
        page = 1,
        pageSize = 5,
        keyword = "",
        isDeleted = false
    ) => {
        setLoading(true);
        try {
            const data: GetAllCustomerRequest = {
                pageNum: page,
                pageSize: pageSize,
                keyWord: keyword,
                role: "",
                status: true,
                isVerify: true,
                isDelete: isDeleted,
            };
            const response: BaseResponse<CustomerResponseData[]> =
                await customerService.getAllCustomers(data);
            console.log("Phản hồi API:", response);
            const userData = Array.isArray(response.data) ? response.data : [];
            setUsers(userData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.total || userData.length,
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
        fetchUsers(current, pageSize, searchKeyword, activeTab === "deletedUsers");
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
        fetchUsers(1, pagination.pageSize, value, activeTab === "deletedUsers");
    };

    const handleReset = () => {
        setSearchKeyword("");
        fetchUsers(1, pagination.pageSize, "", activeTab === "deletedUsers");
    };

    const handleAddUser = () => {
        setIsAddUserModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsAddUserModalVisible(false);
        setIsEditModalVisible(false);
        setEditingUserId(null);
    };

    const handleEditUser = (userId: number) => {
        setEditingUserId(userId);
        setIsEditModalVisible(true);
    };

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetchUsers(1, pagination.pageSize, searchKeyword, key === "deletedUsers");
    };

    const columns: ColumnType<User>[] = [
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
            title: "Trạng thái",
            dataIndex: "isDelete",
            key: "isDelete",
            render: (isDelete: boolean, record: User) => (
                <ToggleStatusButton
                    isDelete={isDelete}
                    userId={record.customerId}
                    refreshUsers={() =>
                        fetchUsers(
                            pagination.current,
                            pagination.pageSize,
                            searchKeyword,
                            activeTab === "deletedUsers"
                        )
                    }
                />
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: User) => (
                <EditOutlined
                    onClick={() => handleEditUser(record.customerId)}
                    style={{ color: "black", cursor: "pointer" }}
                />
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ NGƯỜI DÙNG
            </h2>
            {loading && <p>Đang tải...</p>}
            {!loading && users.length === 0 && <p>Không có người dùng nào.</p>}
            <Tabs defaultActiveKey="activeUsers" onChange={handleTabChange}>
                <TabPane tab="Người dùng hoạt động" key="activeUsers">
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
                            <Button type="primary" onClick={handleAddUser}>
                                Thêm người dùng
                            </Button>
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
                </TabPane>
                <TabPane tab="Người dùng đã xóa" key="deletedUsers">
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
                            <Button type="primary" onClick={handleAddUser}>
                                Thêm người dùng
                            </Button>
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
                </TabPane>
            </Tabs>

            <AddUserModal
                visible={isAddUserModalVisible}
                onClose={handleCloseModal}
                refreshUsers={() =>
                    fetchUsers(
                        pagination.current,
                        pagination.pageSize,
                        searchKeyword,
                        activeTab === "deletedUsers"
                    )
                }
            />

            {editingUserId && (
                <EditUserModal
                    userId={editingUserId}
                    visible={isEditModalVisible}
                    onClose={handleCloseModal}
                    refreshUsers={() =>
                        fetchUsers(
                            pagination.current,
                            pagination.pageSize,
                            searchKeyword,
                            activeTab === "deletedUsers"
                        )
                    }
                />
            )}
        </div>
    );
};

export default UserManagement;