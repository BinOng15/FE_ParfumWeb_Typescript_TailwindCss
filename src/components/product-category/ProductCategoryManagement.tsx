/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions } from "antd";
import { ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import productCategoryService from "../../services/productCategoryService";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import AddProductCategoryButton from "./AddProductCategoryButton";
import { GetAllProductCategoryRequest, ProductCategoryResponse } from "../models/ProductCategory";

const { Search } = Input;

// Interface mở rộng để lưu thêm tên sản phẩm và danh mục
interface EnhancedProductCategoryResponse extends ProductCategoryResponse {
    productName?: string;
    categoryName?: string;
}

const ProductCategoryManagement: React.FC = () => {
    const [productCategories, setProductCategories] = useState<EnhancedProductCategoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedProductCategory, setSelectedProductCategory] = useState<EnhancedProductCategoryResponse | null>(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const fetchProductCategories = async (page = 1, pageSize = 5, keyword = "") => {
        setLoading(true);
        try {
            const data: GetAllProductCategoryRequest = {
                pageNum: page,
                pageSize: pageSize,
                keyWord: keyword.trim(),
            };
            const response = await productCategoryService.getallProductCategory(data);
            const productCategoryData = response.pageData || [];

            // Lấy tên sản phẩm và danh mục cho từng mối quan hệ
            const enhancedData: EnhancedProductCategoryResponse[] = await Promise.all(
                productCategoryData.map(async (item) => {
                    let productName = "Không xác định";
                    let categoryName = "Không xác định";

                    // Lấy tên sản phẩm
                    try {
                        const productResponse = await productService.getProductById(item.productId);
                        productName = productResponse.name || "Không xác định";
                    } catch (error) {
                        console.error(`Lỗi lấy sản phẩm ${item.productId}:`, error);
                    }

                    // Lấy tên danh mục
                    try {
                        const categoryResponse = await categoryService.getCategoryById(item.categoryId);
                        categoryName = categoryResponse.name || "Không xác định";
                    } catch (error) {
                        console.error(`Lỗi lấy danh mục ${item.categoryId}:`, error);
                    }

                    return {
                        ...item,
                        productName,
                        categoryName,
                    };
                })
            );

            setProductCategories(enhancedData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.pageInfo?.totalItem || productCategoryData.length,
            });
        } catch (error: any) {
            console.error("Lỗi lấy mối quan hệ sản phẩm-danh mục:", error);
            setProductCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductCategories(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchProductCategories(current, pageSize, searchKeyword);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
        fetchProductCategories(1, pagination.pageSize, value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        fetchProductCategories(1, pagination.pageSize, "");
    };

    const showProductCategoryDetails = (productCategory: EnhancedProductCategoryResponse) => {
        setSelectedProductCategory(productCategory);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedProductCategory(null);
    };

    const columns: ColumnType<EnhancedProductCategoryResponse>[] = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: EnhancedProductCategoryResponse, index: number) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
            width: 60,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Tên danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: EnhancedProductCategoryResponse) => (
                <Space>
                    <EyeOutlined
                        onClick={() => showProductCategoryDetails(record)}
                        style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                        title="Xem chi tiết"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ MỐI QUAN HỆ SẢN PHẨM - DANH MỤC
            </h2>
            {!loading && productCategories.length === 0 && <p>Không có dữ liệu.</p>}
            <Row justify="space-between" style={{ marginBottom: 16, marginTop: 24 }}>
                <Col>
                    <Space>
                        <Search
                            placeholder="Tìm kiếm theo Product ID hoặc Category ID"
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
                    <AddProductCategoryButton
                        onSuccess={() => fetchProductCategories(pagination.current, pagination.pageSize, searchKeyword)}
                    />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={productCategories}
                rowKey={(record) => `${record.productId}-${record.categoryId}`}
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
                title="Chi tiết mối quan hệ sản phẩm-danh mục"
                visible={isDetailModalVisible}
                onCancel={handleDetailModalClose}
                footer={null}
                width={600}
                bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
            >
                {selectedProductCategory && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Tên sản phẩm">{selectedProductCategory.productName}</Descriptions.Item>
                        <Descriptions.Item label="Tên danh mục">{selectedProductCategory.categoryName}</Descriptions.Item>
                        <Descriptions.Item label="Product ID">{selectedProductCategory.productId}</Descriptions.Item>
                        <Descriptions.Item label="Category ID">{selectedProductCategory.categoryId}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default ProductCategoryManagement;