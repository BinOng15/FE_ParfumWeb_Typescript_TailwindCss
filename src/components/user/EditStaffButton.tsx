/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import customerService from "../../services/customerService";
import { CustomerResponseData } from "../models/Customer";

const { Option } = Select;

interface EditStaffModalProps {
    userId: number | null;
    visible: boolean;
    onClose: () => void;
    refreshUsers: () => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
    userId,
    visible,
    onClose,
    refreshUsers,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId && visible) {
            // Lấy thông tin nhân viên khi modal mở
            const fetchUser = async () => {
                try {
                    const user: CustomerResponseData = await customerService.getCustomerById(userId);
                    form.setFieldsValue({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        gender: user.gender,
                        address: user.address,
                        role: user.roleName, // Điền vai trò hiện tại
                    });
                } catch (error: any) {
                    notification.error({
                        message: "Lỗi",
                        description: "Không thể lấy thông tin người dùng!",
                    });
                }
            };
            fetchUser();
        }
    }, [userId, visible, form]);

    const handleSubmit = async (values: any) => {
        if (!userId) return;
        setLoading(true);
        try {
            const updatedData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                gender: values.gender,
                address: values.address,
            };
            await customerService.updateCustomer(userId, updatedData);
            notification.success({
                message: "Thành công",
                description: "Cập nhật thông tin người dùng thành công!",
            });
            onClose();
            refreshUsers(); // Làm mới danh sách
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể cập nhật người dùng!",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    return (
        <Modal
            title="Chỉnh sửa thông tin người dùng"
            visible={visible}
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
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại!" },
                        { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số!" },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value="Male">Nam</Option>
                        <Option value="Female">Nữ</Option>
                        <Option value="Other">Khác</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                >
                    <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
                >
                    <Select placeholder="Chọn vai trò" disabled>
                        <Option value="Staff">Nhân viên</Option>
                        <Option value="Manager">Quản lý</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditStaffModal;