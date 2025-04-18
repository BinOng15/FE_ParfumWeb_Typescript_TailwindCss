import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Pagination } from "antd";
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

interface GetAllCategoryRequest {
  pageNum: number;
  pageSize: number;
  Status?: boolean;
}

interface CategoryResponse {
  categoryId: number;
  name: string;
  description: string;
  status: boolean;
}

interface GetProductsByCategoryRequest {
  categoryId: number;
}

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

interface ProductCategoryItem {
  categoryId: number;
  productId: number;
  status: boolean;
}

interface ListProductCategoryResponse {
  pageData: ProductCategoryItem[];
  pageInfo: null;
  searchInfo: null;
}

interface BaseResponse<T> {
  data: T;
  code: number;
  success: boolean;
  message: string | null;
}

interface DynamicResponse<T> {
  data: {
    pageData: T[];
    pageInfo: {
      totalItem: number;
    };
  };
}

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
      await axiosInstance.post(`/productcategory/searchbycategoryid/${data.categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products by category ID ${data.categoryId}:`, error);
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

const categories = [
  {
    name: "Nước hoa chiết",
    img: "https://insacmau.com/wp-content/uploads/2023/08/hop-dung-nuoc-hoa-chiet-9-1200x900.jpg",
  },
  {
    name: "Nước hoa nam",
    img: "https://curnonwatch.com/blog/wp-content/uploads/2022/05/nuoc-hoa-nam.jpg",
  },
  {
    name: "Nước hoa nữ",
    img: "https://curnonwatch.com/blog/wp-content/uploads/2022/07/Slide17.jpeg",
  },
  {
    name: "Nước hoa mini",
    img: "https://mfparis.vn/wp-content/uploads/2023/02/set-5-nuoc-hoa-mini-lancome-854020090_2_720x928.jpg",
  },
];

const fragranceGroups = [
  {
    img: "https://orchard.vn/wp-content/uploads/2024/10/Floral-Fruity-nhom.jpg.webp",
    englishName: "Floral Fruity",
    vietnameseName: "Hương Hoa Cỏ Trái Cây",
    description: "Sự tươi mới, ngọt ngào và nhẹ nhàng từ hoa cỏ và trái cây.",
  },
  {
    img: "https://orchard.vn/wp-content/uploads/2024/10/floral-fruity.jpg.webp",
    englishName: "Oriental Floral",
    vietnameseName: "Hương Hoa Cỏ Phương Đông",
    description: "Hương thơm ngọt ngào, quyến rũ với nốt hương hoa và gia vị phương Đông.",
  },
  {
    img: "https://orchard.vn/wp-content/uploads/2024/10/aromatic-fougere.jpg.webp",
    englishName: "Aromatic Fougere",
    vietnameseName: "Hương Thảo Mộc",
    description: "Sự tươi mát, nam tính, thường kết hợp các nốt hương thảo mộc và gỗ.",
  },
  {
    img: "https://orchard.vn/wp-content/uploads/2024/10/floral.jpg.webp",
    englishName: "Floral",
    vietnameseName: "Hương Hoa, Phấn Thơm",
    description: "Thanh lịch, nữ tính với các nốt hương hoa tươi hoặc khô.",
  },
  {
    img: "https://orchard.vn/wp-content/uploads/2024/10/woody-aromatic.jpg.webp",
    englishName: "Woody Aromatic",
    vietnameseName: "Hương Gỗ Thơm, Thảo Mộc",
    description: "Phong cách mạnh mẽ, nam tính với sự pha trộn giữa gỗ và thảo mộc.",
  },
];

const PerfumeProduct: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoriesList, setCategoriesList] = useState<CategoryResponse[]>([]);
  const [allProducts, setAllProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const pageSize = 10;
  const navigate = useNavigate();

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const request: GetAllCategoryRequest = {
          pageNum: 1,
          pageSize: 10,
          Status: true,
        };
        const response = await getAllCategories(request);
        if (response.data?.pageData) {
          setCategoriesList(response.data.pageData);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Lấy sản phẩm theo danh mục
  useEffect(() => {
    const fetchProductsForCategory = async () => {
      try {
        setLoading(true);
        let productList: ProductResponse[] = [];

        if (selectedCategory === null) {
          // Lấy tất cả sản phẩm từ mọi danh mục
          const allProductsPromises = categoriesList.map(async (category) => {
            const request: GetProductsByCategoryRequest = {
              categoryId: category.categoryId,
            };
            const response = await getProductsByCategoryId(request);
            if (response.data?.pageData?.length > 0) {
              const productDetailsPromises = response.data.pageData.map((item) =>
                getProductById(item.productId)
              );
              const productDetails = await Promise.all(productDetailsPromises);
              return productDetails
                .filter((res) => res.data && res.data.isDeleted === false)
                .map((res) => res.data);
            }
            return [];
          });

          const allProductsArrays = await Promise.all(allProductsPromises);
          productList = allProductsArrays.flat();
        } else {
          // Lấy sản phẩm cho danh mục được chọn
          const request: GetProductsByCategoryRequest = {
            categoryId: selectedCategory,
          };
          const response = await getProductsByCategoryId(request);
          if (response.data?.pageData?.length > 0) {
            const productDetailsPromises = response.data.pageData.map((item) =>
              getProductById(item.productId)
            );
            const productDetails = await Promise.all(productDetailsPromises);
            productList = productDetails
              .filter((res) => res.data && res.data.isDeleted === false)
              .map((res) => res.data);
          }
        }

        setAllProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoriesList.length > 0) {
      fetchProductsForCategory();
    }
  }, [selectedCategory, categoriesList]);

  // Xử lý tìm kiếm khi nhấn Enter
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý nhấn vào sản phẩm
  const handleProductClick = (productId: number) => {
    navigate(`/perfumeProductDetail/${productId}`);
  };

  // Lấy sản phẩm cho trang hiện tại
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 bg-white">
      {/* Danh mục sản phẩm */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative bg-gray-200 h-24 w-full rounded-lg overflow-hidden">
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-800 font-semibold text-lg mb-2">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      {/* Phần tiêu đề trang */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Nước Hoa</h1>
        <Breadcrumb className="text-gray-500 mt-1">
          <Breadcrumb.Item>
            <a href="/" className="hover:text-gray-800">
              Trang chủ
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-black font-semibold">
            Nước Hoa
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Bộ lọc & Tìm kiếm */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <div className="flex space-x-3">
          {/* <Select
            placeholder="Nhóm Hương"
            className="w-40 bg-gray-50 border-gray-300"
            onChange={(value) => value}
            allowClear
          ></Select> */}
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === null ? "bg-black text-white" : "bg-white text-gray-700"
              }`}
            onClick={() => setSelectedCategory(null)}
          >
            Tất cả
          </button>
          {categoriesList.map((category) => (
            <button
              key={category.categoryId}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === category.categoryId
                ? "bg-black text-white"
                : "bg-white text-gray-700"
                }`}
              onClick={() => setSelectedCategory(category.categoryId)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm sản phẩm"
          className="w-64"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div
              key={product.productId}
              className="relative bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[250px] object-cover"
                  onClick={() => handleProductClick(product.productId)}
                />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-30 text-white p-3">
                  <h3 className="text-sm font-bold">{product.name}</h3>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate">{product.description}</p>
                <div className="mt-2">
                  <span className="text-red-600 font-bold text-md">
                    {product.price.toLocaleString()}₫
                  </span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-300 transition">
                  <HeartOutlined className="text-xl" />
                </button>
                <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-gray-300 transition">
                  <ShoppingCartOutlined className="text-xl" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào!</p>
        )}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={filteredProducts.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Nhóm hương phổ biến */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nhóm hương phổ biến</h2>
        <p className="text-gray-600 mb-6">
          <a href="/fragrance-groups" className="text-blue-600 font-semibold hover:underline">
            Nhóm hương nước hoa
          </a>{" "}
          phổ biến bao gồm hương hoa cỏ, hương gỗ và hương trái cây. Mỗi nhóm mang một phong cách riêng biệt,
          từ nhẹ nhàng, ngọt ngào đến mạnh mẽ, cá tính, phù hợp với nhiều gu mùi hương, dịp sử dụng,
          cũng như sở thích của người dùng.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Hình ảnh nhóm hương</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tên nhóm hương (tiếng Anh)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tên tiếng Việt</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Đặc trưng nhóm hương</th>
              </tr>
            </thead>
            <tbody>
              {fragranceGroups.map((group, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={group.img}
                      alt={group.englishName}
                      className="w-36 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{group.englishName}</td>
                  <td className="border border-gray-300 px-4 py-2">{group.vietnameseName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">{group.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerfumeProduct;