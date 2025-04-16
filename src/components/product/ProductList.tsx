import React, { useState, useEffect } from "react";
import { DynamicResponse, GetAllCategoryRequest } from "../models/Category";
import { axiosInstance } from "../../services/axiosInstance";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

// Hàm lấy tất cả danh mục
const getAllCategories = async (
  data: GetAllCategoryRequest
): Promise<DynamicResponse<CategoryResponse>> => {
  try {
    const response = await axiosInstance.post("/category/search", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};

// Hàm lấy sản phẩm theo categoryId
const getProductsByCategoryId = async (
  data: GetProductsByCategoryRequest
): Promise<BaseResponse<ListProductCategoryResponse>> => {
  try {
    const response: AxiosResponse<BaseResponse<ListProductCategoryResponse>> =
      await axiosInstance.post(
        `/productcategory/searchbycategoryid/${data.categoryId}`
      );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching products by category ID ${data.categoryId}:`,
      error
    );
    throw error;
  }
};

// Hàm lấy sản phẩm theo productId
const getProductById = async (
  productId: number
): Promise<BaseResponse<ProductResponse>> => {
  try {
    const response: AxiosResponse<BaseResponse<ProductResponse>> =
      await axiosInstance.get(`/product/getproductbyid?id=${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by ID ${productId}:`, error);
    throw error;
  }
};

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

const ProductList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: number]: ProductResponse[];
  }>({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState<{
    [key: number]: boolean;
  }>({});
  const navigate = useNavigate();

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const request: GetAllCategoryRequest = {
          pageNum: 1,
          pageSize: 10,
          Status: true,
        };
        const response = await getAllCategories(request);
        if (response.data?.pageData) {
          setCategories(response.data.pageData);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Lấy sản phẩm cho mỗi danh mục
  useEffect(() => {
    const fetchProductsForCategories = async () => {
      for (const category of categories) {
        try {
          setLoadingProducts((prev) => ({
            ...prev,
            [category.categoryId]: true,
          }));
          const request: GetProductsByCategoryRequest = {
            categoryId: category.categoryId,
          };
          const response = await getProductsByCategoryId(request);
          if (response.data?.pageData?.length > 0) {
            // Lấy chi tiết sản phẩm cho từng productId
            const productDetailsPromises = response.data.pageData.map((item) =>
              getProductById(item.productId)
            );
            const productDetails = await Promise.all(productDetailsPromises);
            const products = productDetails
              .filter((res) => res.data && res.data.isDeleted === false)
              .map((res) => res.data);
            setProductsByCategory((prev) => ({
              ...prev,
              [category.categoryId]: products,
            }));
          } else {
            setProductsByCategory((prev) => ({
              ...prev,
              [category.categoryId]: [],
            }));
          }
        } catch (error) {
          console.error(
            `Failed to fetch products for category ${category.categoryId}:`,
            error
          );
          setProductsByCategory((prev) => ({
            ...prev,
            [category.categoryId]: [],
          }));
        } finally {
          setLoadingProducts((prev) => ({
            ...prev,
            [category.categoryId]: false,
          }));
        }
      }
    };

    if (categories.length > 0) {
      fetchProductsForCategories();
    }
  }, [categories]);

  // Hàm xử lý khi nhấn vào sản phẩm
  const handleProductClick = (productId: number) => {
    navigate(`/perfumeProductDetail/${productId}`);
  };

  return (
    <section className="px-10 py-10 bg-white">
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : (
        categories.map((category) => (
          <div key={category.categoryId} className="mb-10">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            {loadingProducts[category.categoryId] ? (
              <p>Loading products...</p>
            ) : productsByCategory[category.categoryId]?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                {productsByCategory[category.categoryId].map((product) => (
                  <div
                    key={product.productId}
                    className="relative bg-white shadow-md p-4 rounded-lg cursor-pointer"
                    onClick={() => handleProductClick(product.productId)}
                  >
                    {/* Ảnh sản phẩm */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-[180px] object-contain"
                    />

                    {/* Thông tin sản phẩm */}
                    <div className="mt-2">
                      <h3 className="text-sm font-bold">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.description}
                      </p>
                      <span className="text-red-600 font-bold text-md">
                        {product.price.toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">
                No products available for this category.
              </p>
            )}
          </div>
        ))
      )}

      {/* --- Phần Giới Thiệu Cửa Hàng --- */}
      <div className="bg-gray-100 text-gray-800 p-10 mt-10 rounded-lg flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
          <img
            src="https://orchard.vn/wp-content/uploads/2024/06/showroom-221-vo-van-ngan-2-900x900.webp"
            alt="Eun de Parfum Store"
            className="w-80 h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#FF8787] mb-4">
            Giới Thiệu Về Eun de Parfum
          </h2>
          <p className="text-lg max-w-4xl mx-auto">
            Eun de Parfum là thương hiệu nước hoa uy tín, chuyên cung cấp các dòng
            nước hoa chính hãng dành cho{" "}
            <strong>học sinh, sinh viên và những người có thu nhập trung bình</strong>.
            Chúng tôi mang đến những hương thơm đẳng cấp từ các thương hiệu lớn
            như <strong>Chanel, Dior, Gucci, YSL, Versace</strong>, giúp bạn thể
            hiện phong cách và cá tính riêng của mình.
          </p>
          <p className="text-lg max-w-4xl mx-auto mt-4">
            Không chỉ có nước hoa fullsize, Eun de Parfum còn cung cấp các dòng{" "}
            <strong>nước hoa chiết</strong> và <strong>nước hoa mini</strong>,
            giúp bạn dễ dàng trải nghiệm những mùi hương yêu thích với chi phí hợp lý.
          </p>
          <p className="text-lg max-w-4xl mx-auto mt-4">
            Hãy đến với Eun de Parfum để tận hưởng{" "}
            <strong>ưu đãi độc quyền</strong> và{" "}
            <strong>dịch vụ chăm sóc khách hàng tận tâm</strong>!
          </p>

          <div className="mt-6">
            <a
              href="/about"
              className="bg-[#FF8787] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF8787] transition duration-300"
            >
              Tìm hiểu thêm về chúng tôi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;