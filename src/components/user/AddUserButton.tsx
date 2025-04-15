/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { RegisterRequest } from "../models/Customer";
import customerService from "../../services/customerService";

const { Option } = Select;

interface AddUserModalProps {
    visible: boolean;
    onClose: () => void;
    refreshUsers: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    visible,
    onClose,
    refreshUsers,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const request: RegisterRequest = {
                email: values.email,
                password: values.password,
                name: values.name,
                gender: values.gender,
                phone: values.phone,
                address: values.address,
            };
            await customerService.registerCustomer(request);
            notification.success({
                message: "Thành công",
                description: "Thêm người dùng thành công!",
            });
            form.resetFields();
            onClose();
            refreshUsers();
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể thêm người dùng!",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Thêm người dùng"
            open={visible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                disabled={loading}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
                >
                    <Select>
                        <Option value="Male">Nam</Option>
                        <Option value="Female">Nữ</Option>
                        <Option value="Other">Khác</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="roleName"
                    label="Vai trò"
                    rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
                >
                    <Select defaultValue="User">
                        <Option value="User">Khách hàng</Option>
                        <Option value="Staff">Nhân viên</Option>
                        <Option value="Admin">Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Thêm
                    </Button>
                    <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;