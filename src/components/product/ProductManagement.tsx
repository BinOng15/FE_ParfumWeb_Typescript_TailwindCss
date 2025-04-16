/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions, notification } from "antd";
import { ReloadOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import productService from "../../services/productService";
import AddProductButton from "./AddProductButton";
import EditProductModal from "./EditProductModal";
import { ProductResponse, GetAllProductRequest } from "../models/Product";

const { Search } = Input;

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(null);

    const fetchProducts = async (page = 1, pageSize = 5, keyword = "") => {
        setLoading(true);
        try {
            const data: GetAllProductRequest = {
                pageNum: page,
                pageSize: pageSize,
                keyWord: keyword.trim(),
                status: true, // Chỉ lấy sản phẩm chưa bị xóa
            };
            const response = await productService.getAllProducts(data);
            let productData = response.pageData || [];

            // Bộ lọc phía client: Tìm kiếm theo tên sản phẩm (khớp ký tự đầu)
            if (keyword && productData.length > 0) {
                const lowerKeyword = keyword.toLowerCase();
                productData = productData.filter((product) =>
                    product.name?.toLowerCase().startsWith(lowerKeyword)
                );
            }

            setProducts(productData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.pageInfo?.totalItem || productData.length,
            });
        } catch (error: any) {
            console.error("Lỗi lấy sản phẩm:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchProducts(current, pageSize, searchKeyword);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
        fetchProducts(1, pagination.pageSize, value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        fetchProducts(1, pagination.pageSize, "");
    };

    const showProductDetails = (product: ProductResponse) => {
        setSelectedProduct(product);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedProduct(null);
    };

    const showEditModal = (product: ProductResponse) => {
        setEditingProduct(product);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        setEditingProduct(null);
    };

    const handleDeleteProduct = (product: ProductResponse) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"? Hành động này không thể hoàn tác.`,
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    await productService.hardDeleteProduct(product.productId);
                    notification.success({
                        message: "Thành công",
                        description: "Xóa sản phẩm thành công!",
                    });
                    fetchProducts(pagination.current, pagination.pageSize, searchKeyword);
                } catch (error: any) {
                    notification.error({
                        message: "Lỗi",
                        description: error.message || "Không thể xóa sản phẩm!",
                    });
                }
            },
        });
    };

    const columns: ColumnType<ProductResponse>[] = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: ProductResponse, index: number) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
            width: 60,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Hình ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl: string, record: ProductResponse) => (
                <img
                    src={imageUrl}
                    alt={record.name}
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "1px solid black",
                    }}
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/50?text=No+Image";
                    }}
                />
            ),
            width: 120,
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <span>{price.toLocaleString("vi-VN")} VNĐ</span>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: ProductResponse) => (
                <Space>
                    <EyeOutlined
                        onClick={() => showProductDetails(record)}
                        style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                        title="Xem chi tiết"
                    />
                    <EditOutlined
                        onClick={() => showEditModal(record)}
                        style={{ color: "green", cursor: "pointer", fontSize: "18px" }}
                        title="Chỉnh sửa"
                    />
                    <DeleteOutlined
                        onClick={() => handleDeleteProduct(record)}
                        style={{ color: "red", cursor: "pointer", fontSize: "18px" }}
                        title="Xóa"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ SẢN PHẨM NƯỚC HOA
            </h2>
            {!loading && products.length === 0 && <p>Không có sản phẩm nào.</p>}
            <Row justify="space-between" style={{ marginBottom: 16, marginTop: 24 }}>
                <Col>
                    <Space>
                        <Search
                            placeholder="Tìm kiếm theo tên sản phẩm (khớp ký tự đầu)"
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
                    <AddProductButton onSuccess={() => fetchProducts(pagination.current, pagination.pageSize, searchKeyword)} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={products}
                rowKey="productId"
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
            <Modal
                title="Chi tiết sản phẩm"
                visible={isDetailModalVisible}
                onCancel={handleDetailModalClose}
                footer={null}
                width={600}
                bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
            >
                {selectedProduct && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Tên sản phẩm">{selectedProduct.name}</Descriptions.Item>
                        <Descriptions.Item label="Thương hiệu">{selectedProduct.brand}</Descriptions.Item>
                        <Descriptions.Item label="Giá">{selectedProduct.price.toLocaleString("vi-VN")} VNĐ</Descriptions.Item>
                        <Descriptions.Item label="Số lượng">{selectedProduct.stock}</Descriptions.Item>
                        <Descriptions.Item label="Mô tả">{selectedProduct.description}</Descriptions.Item>
                        <Descriptions.Item label="Hình ảnh">
                            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} style={{ maxWidth: "200px" }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {selectedProduct.isDeleted ? "Không hoạt động" : "Hoạt động"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {new Date(selectedProduct.createdAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sửa đổi">
                            {new Date(selectedProduct.updatedAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
            <EditProductModal
                product={editingProduct}
                visible={isEditModalVisible}
                onCancel={handleEditModalClose}
                onSuccess={() => fetchProducts(pagination.current, pagination.pageSize, searchKeyword)}
            />
        </div>
    );
};

export default ProductManagement;