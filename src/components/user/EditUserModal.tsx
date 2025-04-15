/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, notification, message } from "antd";
import customerService from "../../services/customerService";
import { BaseResponse, CustomerResponseData, UpdateRequest } from "../models/Customer";


const { Option } = Select;

interface EditUserModalProps {
  userId: number;
  visible: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  userId,
  visible,
  onClose,
  refreshUsers,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (visible && userId) {
    //   setLoading(true);
    //   customerService
    //     .getCustomerById(userId)
    //     .then((response: BaseResponse<CustomerResponseData>) => {
    //       const user = response.data;
    //       form.setFieldsValue({
    //         email: user.email,
    //         name: user.name,
    //         gender: user.gender,
    //         phone: user.phone,
    //         address: user.address,
    //         roleName: user.roleName,
    //       });
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       notification.error({
    //         message: "Lỗi",
    //         description: error.message || "Không thể tải dữ liệu người dùng!",
    //       });
    //       setLoading(false);
    //     });
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const user = await customerService.getCustomerById(userId);
            form.setFieldValue({
                email: user.email,
                name: user.name,
                gender: user.gender,
                phone: user.phone,
                address: user.address,
                roleName: user.roleName,
            });
            setLoading(false);
        } catch (error) {
            message.error("Failed to fetch user data");
        }
    }
    
  }, [visible, userId, form]);

  const handleSubmit = async (values: any) => {
    try {
      const request: UpdateRequest = {
        name: values.name,
        gender: values.gender,
        phone: values.phone,
        address: values.address,
      };
      await customerService.updateCustomer(userId, request);
      notification.success({
        message: "Thành công",
        description: "Cập nhật người dùng thành công!",
      });
      onClose();
      refreshUsers();
    } catch (error: any) {
      notification.error({
        message: "Lỗi",
        description: error.message || "Không thể cập nhật người dùng!",
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Chỉnh sửa người dùng"
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
          <Input disabled />
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
          <Select>
            <Option value="User">Khách hàng</Option>
            <Option value="Staff">Nhân viên</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;