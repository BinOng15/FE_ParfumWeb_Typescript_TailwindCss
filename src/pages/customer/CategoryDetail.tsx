import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/axiosInstance";
import { AxiosResponse } from "axios";

// Định nghĩa giao diện CategoryResponse
interface CategoryResponse {
    categoryId: number;
    name: string;
    description: string;
    status: boolean;
}

// Định nghĩa giao diện GetProductsByCategoryRequest
interface GetProductsByCategoryRequest {
    categoryId: number;
}

// Định nghĩa giao diện ProductResponse
interface ProductResponse {
    productId: number;
    name: string;
    brand: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

// Định nghĩa giao diện cho dữ liệu từ productcategory API
interface ProductCategoryItem {
    categoryId: number;
    productId: number;
    status: boolean;
}

// Định nghĩa giao diện ListProductCategoryResponse
interface ListProductCategoryResponse {
    pageData: ProductCategoryItem[];
    pageInfo: null;
    searchInfo: null;
}

// Định nghĩa giao diện BaseResponse
interface BaseResponse<T> {
    data: T;
    code: number;
    success: boolean;
    message: string | null;
}

// Hàm lấy chi tiết danh mục theo categoryId
const getCategoryById = async (categoryId: number): Promise<CategoryResponse> => {
    const response: AxiosResponse = await axiosInstance.get(`/category/getby/${categoryId}`);
    if (!response.data || !response.data.data) {
        throw new Error("Category not found");
    }
    return response.data.data;
};

// Hàm lấy sản phẩm theo categoryId
const getProductsByCategoryId = async (
    data: GetProductsByCategoryRequest
): Promise<BaseResponse<ListProductCategoryResponse>> => {
    const response: AxiosResponse<BaseResponse<ListProductCategoryResponse>> =
        await axiosInstance.post(
            `/productcategory/searchbycategoryid/${data.categoryId}`
        );
    return response.data;
};

// Hàm lấy sản phẩm theo productId
const getProductById = async (
    productId: number
): Promise<BaseResponse<ProductResponse>> => {
    const response: AxiosResponse<BaseResponse<ProductResponse>> =
        await axiosInstance.get(`/product/getproductbyid?id=${productId}`);
    return response.data;
};

const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [category, setCategory] = useState<CategoryResponse | null>(null);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Lấy chi tiết danh mục
    useEffect(() => {
        const fetchCategory = async () => {
            if (!categoryId || isNaN(Number(categoryId))) {
                setError("Invalid category ID");
                setLoadingCategory(false);
                return;
            }
            try {
                setLoadingCategory(true);
                const categoryData = await getCategoryById(Number(categoryId));
                setCategory(categoryData);
            } catch (error: any) {
                setError(error.message || "Failed to fetch category");
            } finally {
                setLoadingCategory(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    // Lấy sản phẩm thuộc danh mục
    useEffect(() => {
        const fetchProducts = async () => {
            if (!categoryId || isNaN(Number(categoryId))) {
                setLoadingProducts(false);
                return;
            }
            try {
                setLoadingProducts(true);
                const request: GetProductsByCategoryRequest = {
                    categoryId: Number(categoryId),
                };
                const response = await getProductsByCategoryId(request);
                if (response.data?.pageData?.length > 0) {
                    const productDetailsPromises = response.data.pageData.map((item) =>
                        getProductById(item.productId)
                    );
                    const productDetails = await Promise.all(productDetailsPromises);
                    const products = productDetails
                        .filter((res) => res.data && res.data.isDeleted === false)
                        .map((res) => res.data);
                    setProducts(products);
                } else {
                    setProducts([]);
                }
            } catch (error: any) {
                setError(error.message || "Failed to fetch products");
            } finally {
                setLoadingProducts(false);
            }
        };

        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId]);

    // Xử lý khi nhấn vào sản phẩm
    const handleProductClick = (productId: number) => {
        navigate(`/perfumeProductDetail/${productId}`);
    };

    return (
        <section className="px-4 sm:px-6 lg:px-10 py-10 bg-gray-50 min-h-screen">
            {loadingCategory ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF8787]"></div>
                </div>
            ) : error ? (
                <div className="text-center text-lg text-red-600 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                    <p>{error}</p>
                    <button
                        className="mt-4 bg-[#FF8787] text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            ) : category ? (
                <div>
                    <header className="mb-4 bg-gradient-to-r from-[#FF8787] to-red-400 text-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{category.name}</h2>
                    </header>
                    <nav className="mb-6 text-sm text-gray-600">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <button
                                    className="hover:text-[#FF8787] transition-colors"
                                    onClick={() => navigate("/")}
                                >
                                    Trang chủ
                                </button>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-gray-800">{category.name}</li>
                        </ol>
                    </nav>
                    {loadingProducts ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF8787]"></div>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.productId}
                                    className="group bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    onClick={() => handleProductClick(product.productId)}
                                >
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
                                        <p className="text-xs text-gray-500">{product.brand}</p>
                                        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                                        <span className="text-red-600 font-bold text-base mt-2 block">
                                            {product.price.toLocaleString()} VND
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                            <p>No products available for this category.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center text-lg text-gray-500 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                    <p>Category not found.</p>
                    <button
                        className="mt-4 bg-[#FF8787] text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            )}
        </section>
    );
};

export default CategoryDetail;