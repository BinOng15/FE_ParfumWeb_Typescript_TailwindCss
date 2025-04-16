/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Select, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import productCategoryService from "../../services/productCategoryService";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import { CreateProductCategoryRequest } from "../models/ProductCategory";
import { ProductResponse } from "../models/Product";
import { CategoryResponse, GetAllCategoryRequest } from "../models/Category";

const { Option } = Select;

interface AddProductCategoryButtonProps {
    onSuccess: () => void;
}

const AddProductCategoryButton: React.FC<AddProductCategoryButtonProps> = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    // Lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const response = await productService.getAllProducts({
                pageNum: 1,
                pageSize: 1000, // Lấy tất cả sản phẩm (có thể tối ưu hơn)
                keyWord: "",
                status: true,
            });
            setProducts(response.pageData || []);
        } catch (error) {
            console.error("Lỗi lấy danh sách sản phẩm:", error);
            setProducts([]);
        }
    };

    // Lấy danh sách danh mục
    const fetchCategories = async () => {
        try {
            const data: GetAllCategoryRequest = {
                pageNum: 1,
                pageSize: 1000, // Lấy tất cả danh mục (có thể tối ưu hơn)
                keyWord: "",
                Status: true, // Chỉ lấy danh mục chưa bị xóa
            };
            const response = await categoryService.getAllCategories(data);
            setCategories(response.pageData || []);
        } catch (error) {
            console.error("Lỗi lấy danh sách danh mục:", error);
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

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
            const newProductCategory: CreateProductCategoryRequest = {
                productId: values.productId,
                categoryId: values.categoryId,
                status: true, // Mặc định trạng thái là Hoạt động
            };

            await productCategoryService.createProductCategory(newProductCategory);
            notification.success({
                message: "Thành công",
                description: "Thêm mối quan hệ sản phẩm-danh mục thành công!",
            });
            onSuccess(); // Gọi callback để refresh danh sách
            handleCancel(); // Đóng modal
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description: error.message || "Không thể thêm mối quan hệ sản phẩm-danh mục!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                Thêm mối quan hệ
            </Button>
            <Modal
                title="Thêm mối quan hệ sản phẩm-danh mục"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="productId"
                        label="Sản phẩm"
                        rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
                    >
                        <Select
                            placeholder="Chọn sản phẩm"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {products.map((product) => (
                                <Option key={product.productId} value={product.productId}>
                                    {product.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Danh mục"
                        rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                    >
                        <Select
                            placeholder="Chọn danh mục"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {categories.map((category) => (
                                <Option key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Thêm mối quan hệ
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

export default AddProductCategoryButton;