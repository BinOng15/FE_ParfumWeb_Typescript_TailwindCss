/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Descriptions } from "antd";
import { ReloadOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import categoryService from "../../services/categoryService";
import AddCategoryButton from "./AddCategoryButton";
import EditCategoryModal from "./EditCategoryModal";
import { CategoryResponse, GetAllCategoryRequest } from "../models/Category";

const { Search } = Input;

const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null);

    const fetchCategories = async (page = 1, pageSize = 5, keyword = "") => {
        setLoading(true);
        try {
            const data: GetAllCategoryRequest = {
                pageNum: page,
                pageSize: pageSize,
                keyWord: keyword.trim(),
                Status: true, // Chỉ lấy danh mục chưa bị xóa
            };
            const response = await categoryService.getAllCategories(data);
            let categoryData = response.pageData || [];

            // Bộ lọc phía client: Tìm kiếm theo tên danh mục (khớp ký tự đầu)
            if (keyword && categoryData.length > 0) {
                const lowerKeyword = keyword.toLowerCase();
                categoryData = categoryData.filter((category) =>
                    category.name?.toLowerCase().startsWith(lowerKeyword)
                );
            }

            setCategories(categoryData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.pageInfo?.totalItem || categoryData.length,
            });
        } catch (error: any) {
            console.error("Lỗi lấy danh mục:", error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setPagination((prev) => ({ ...prev, current, pageSize }));
        fetchCategories(current, pageSize, searchKeyword);
    };

    const onSearch = (value: string) => {
        setSearchKeyword(value);
        fetchCategories(1, pagination.pageSize, value);
    };

    const handleReset = () => {
        setSearchKeyword("");
        fetchCategories(1, pagination.pageSize, "");
    };

    const showCategoryDetails = (category: CategoryResponse) => {
        setSelectedCategory(category);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedCategory(null);
    };

    const showEditModal = (category: CategoryResponse) => {
        setEditingCategory(category);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        setEditingCategory(null);
    };

    const columns: ColumnType<CategoryResponse>[] = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: CategoryResponse, index: number) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
            width: 60,
        },
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            width: 400,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 500,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: CategoryResponse) => (
                <Space>
                    <EyeOutlined
                        onClick={() => showCategoryDetails(record)}
                        style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
                        title="Xem chi tiết"
                    />
                    <EditOutlined
                        onClick={() => showEditModal(record)}
                        style={{ color: "green", cursor: "pointer", fontSize: "18px" }}
                        title="Chỉnh sửa"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">
                QUẢN LÝ DANH MỤC
            </h2>
            {!loading && categories.length === 0 && <p>Không có danh mục nào.</p>}
            <Row justify="space-between" style={{ marginBottom: 16, marginTop: 24 }}>
                <Col>
                    <Space>
                        <Search
                            placeholder="Tìm kiếm theo tên danh mục (khớp ký tự đầu)"
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
                    <AddCategoryButton onSuccess={() => fetchCategories(pagination.current, pagination.pageSize, searchKeyword)} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={categories}
                rowKey="categoryId"
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
                title="Chi tiết danh mục"
                visible={isDetailModalVisible}
                onCancel={handleDetailModalClose}
                footer={null}
                width={600}
                bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
            >
                {selectedCategory && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Tên danh mục">{selectedCategory.name}</Descriptions.Item>
                        <Descriptions.Item label="Mô tả">{selectedCategory.description}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
            <EditCategoryModal
                category={editingCategory}
                visible={isEditModalVisible}
                onCancel={handleEditModalClose}
                onSuccess={() => fetchCategories(pagination.current, pagination.pageSize, searchKeyword)}
            />
        </div>
    );
};

export default CategoryManagement;