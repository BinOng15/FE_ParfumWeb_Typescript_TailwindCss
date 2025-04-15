/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, notification } from "antd";
import customerService from "../../services/customerService";

const { Option } = Select;

interface AddStaffButtonProps {
    refreshUsers: () => void; // Hàm làm mới danh sách người dùng
}

const AddStaffButton: React.FC<AddStaffButtonProps> = ({ refreshUsers }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            console.log("Dữ liệu gửi lên:", values); // Log để kiểm tra dữ liệu
            const { name, email, password, role } = values;
            if (role === "Staff") {
                await customerService.registerStaff(email, password, name);
            } else if (role === "Manager") {
                await customerService.registerManager(email, password, name);
            }
            notification.success({
                message: "Thành công",
                description: `Đã tạo ${role === "Staff" ? "nhân viên" : "quản lý"} thành công!`,
            });
            setIsModalVisible(false);
            form.resetFields();
            refreshUsers(); // Làm mới danh sách
        } catch (error: any) {
            const errorMessage = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join(" ")
                : error.message || "Không thể tạo người dùng!";
            notification.error({
                message: "Lỗi",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm nhân viên
            </Button>
            <Modal
                title="Thêm nhân viên mới"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    >
                        <Input placeholder="Nhập tên" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không hợp lệ!" },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
                    >
                        <Select placeholder="Chọn vai trò">
                            <Option value="Staff">Nhân viên</Option>
                            <Option value="Manager">Quản lý</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Tạo
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddStaffButton;