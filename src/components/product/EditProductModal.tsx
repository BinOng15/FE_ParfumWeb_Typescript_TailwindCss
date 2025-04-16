/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Button, notification } from "antd";
import { CreateProductRequest, ProductResponse } from "../models/Product";
import productService from "../../services/productService";

interface EditProductModalProps {
    product: ProductResponse | null;
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    product,
    visible,
    onCancel,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Điền dữ liệu sản phẩm vào form khi modal mở
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                brand: product.brand,
                price: product.price,
                stock: product.stock,
                description: product.description,
                imageUrl: product.imageUrl,
                isDeleted: product.isDeleted,
            });
        }
    }, [product, form]);

    const handleSubmit = async (values: any) => {
        if (!product) return;

        setLoading(true);
        try {
            const updatedProduct: CreateProductRequest = {
                name: values.name,
                brand: values.brand,
                price: values.price,
                stock: values.stock,
                description: values.description,
                imageUrl: values.imageUrl,
                isDeleted: false,
                createdAt: new Date(product.createdAt), // Giữ nguyên createdAt
                updatedAt: new Date(), // Cập nhật thời gian hiện tại
            };

            await productService.updateProduct(product.productId, updatedProduct);
            notification.success({
                message: "Thành công",
                description: "Cập nhật nước hoa thành công!",
            });
            onSuccess(); // Gọi callback để refresh danh sách
            onCancel(); // Đóng modal
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể cập nhật nước hoa!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa sản phẩm"
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
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item
                    name="brand"
                    label="Thương hiệu"
                    rules={[{ required: true, message: "Vui lòng nhập thương hiệu!" }]}
                >
                    <Input placeholder="Nhập thương hiệu" />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
                        placeholder="Nhập giá sản phẩm (VNĐ)"
                    />
                </Form.Item>
                <Form.Item
                    name="stock"
                    label="Số lượng"
                    rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
                >
                    <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập số lượng" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
                >
                    <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
                </Form.Item>
                <Form.Item
                    name="imageUrl"
                    label="URL hình ảnh"
                    rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh!" }]}
                >
                    <Input placeholder="Nhập URL hình ảnh" />
                </Form.Item>
                {/* <Form.Item name="isDeleted" label="Trạng thái" valuePropName="checked">
                    <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật sản phẩm
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProductModal;