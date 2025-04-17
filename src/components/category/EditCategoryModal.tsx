/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { CreateCategoryRequest, CategoryResponse } from "../models/Category";
import categoryService from "../../services/categoryService";

interface EditCategoryModalProps {
    category: CategoryResponse | null;
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    category,
    visible,
    onCancel,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Điền dữ liệu danh mục vào form khi modal mở
    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name,
                description: category.description,
                status: true, // Chuyển đổi logic: isDeleted: false -> status: true
            });
        }
    }, [category, form]);

    const handleSubmit = async (values: any) => {
        if (!category) return;

        setLoading(true);
        try {
            const updatedCategory: CreateCategoryRequest = {
                categoryId: category.categoryId, // Thêm categoryId gốc
                name: values.name,
                description: values.description,
                status: true, // Chuyển đổi logic: status: true -> isDeleted: false
            };

            await categoryService.updateCategory(category.categoryId, updatedCategory);
            notification.success({
                message: "Thành công",
                description: "Cập nhật danh mục thành công!",
            });
            onSuccess(); // Gọi callback để refresh danh sách
            onCancel(); // Đóng modal
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể cập nhật danh mục!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa danh mục"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
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
                        Cập nhật danh mục
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditCategoryModal;