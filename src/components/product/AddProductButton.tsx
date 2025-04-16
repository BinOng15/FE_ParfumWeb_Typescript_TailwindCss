/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import productService from "../../services/productService";
import { CreateProductRequest } from "../models/Product";

const AddProductButton: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
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
            const productData: CreateProductRequest = {
                name: values.name,
                brand: values.brand,
                price: values.price,
                stock: values.stock,
                description: values.description,
                imageUrl: values.imageUrl,
                isDeleted: false,
                // createdAt và updatedAt để backend tự xử lý
            };

            await productService.createProduct(productData);
            notification.success({
                message: "Thành công",
                description: "Tạo nước hoa mới thành công!",
            });
            form.resetFields();
            setIsModalVisible(false);
            onSuccess(); // Gọi callback để refresh danh sách sản phẩm
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể tạo nước hoa!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                Thêm sản phẩm
            </Button>
            <Modal
                title="Thêm sản phẩm mới"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        isDeleted: false,
                    }}
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
                            Tạo sản phẩm
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

export default AddProductButton;