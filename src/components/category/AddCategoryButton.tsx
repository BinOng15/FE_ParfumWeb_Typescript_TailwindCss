/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import categoryService from "../../services/categoryService";
import { CreateCategoryRequest } from "../models/Category";

interface AddCategoryButtonProps {
    onSuccess: () => void;
}

const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const newCategory: CreateCategoryRequest = {
                name: values.name,
                description: values.description,
                status: true,
            };

            await categoryService.createCategory(newCategory);
            notification.success({
                message: "Thành công",
                description: "Thêm danh mục thành công!",
            });
            onSuccess(); // Gọi callback để refresh danh sách
            handleCancel(); // Đóng modal
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể thêm danh mục!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                Thêm danh mục nước hoa
            </Button>
            <Modal
                title="Thêm danh mục mới"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ status: true }} // Mặc định trạng thái là Hoạt động
                >
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập mô tả danh mục" />
                    </Form.Item>
                    {/* <Form.Item name="status" label="Trạng thái" valuePropName="checked">
                        <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Thêm danh mục
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

export default AddCategoryButton;