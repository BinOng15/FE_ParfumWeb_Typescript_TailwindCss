import React, { useState } from "react";
import { Breadcrumb, Input, Pagination, Select } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

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

const filters = ["Tất cả", "Bán chạy", "Giảm giá", "Giá thấp", "Giá cao"];

// Fake danh sách sản phẩm
const fakeProducts = Array(100)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `Nước hoa ${index + 1}`,
    description: "Hương thơm sang trọng, lưu hương lâu.",
    img: "https://insacmau.com/wp-content/uploads/2023/08/hop-dung-nuoc-hoa-chiet-9-1200x900.jpg",
    price: `${((index % 5) + 1) * 500}.000 VNĐ`,
    oldPrice: index % 3 === 0 ? `${((index % 5) + 1) * 600}.000 VNĐ` : null, // Random giá cũ
    rating: Math.floor(Math.random() * 5) + 1, // Random từ 1-5 sao
    discount: index % 2 === 0 ? "-15%" : "-10%", // Random giảm giá
    size: ["30ML", "50ML", "100ML"],
  }));

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
    description:
      "Hương thơm ngọt ngào, quyến rũ với nốt hương hoa và gia vị phương Đông.",
  },
  {
    img: "https://orchard.vn/wp-content/uploads/2024/10/aromatic-fougere.jpg.webp",
    englishName: "Aromatic Fougere",
    vietnameseName: "Hương Thảo Mộc",
    description:
      "Sự tươi mát, nam tính, thường kết hợp các nốt hương thảo mộc và gỗ.",
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
    description:
      "Phong cách mạnh mẽ, nam tính với sự pha trộn giữa gỗ và thảo mộc.",
  },
];

const PerfumeProduct: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate(); // Hook để điều hướng trang

  // Lấy danh sách sản phẩm hiển thị theo trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = fakeProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <MainLayout>
      <div className="p-6 bg-white">
        {/* Danh mục sản phẩm */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Ảnh nằm phía dưới */}
              <div className="relative bg-gray-200 h-24 w-full rounded-lg overflow-hidden">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Chữ phía trên ảnh */}
              <span className="text-gray-800 font-semibold text-lg mb-2">
                {category.name}
              </span>
            </div>
          ))}
        </div>
        {/* PHẦN TIÊU ĐỀ TRANG */}
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
            {/* Dropdown chọn nhóm hương */}
            <Select
              placeholder="Nhóm Hương"
              className="w-40 bg-gray-50 border-gray-300"
              onChange={(value) => value}
              allowClear
            ></Select>
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedFilter === filter
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm"
            className="w-64"
          />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
              onClick={() => navigate(`/perfumeProductDetail/${product.id}`)} // Click để chuyển trang
            >
              {/* Ảnh sản phẩm */}
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-[250px] object-cover"
                />

                {/* Overlay mờ chứa tên sản phẩm */}
                <div className="absolute bottom-0 w-full bg-black bg-opacity-30 text-white p-3">
                  <h3 className="text-sm font-bold">{product.name}</h3>
                </div>

                {/* Nhãn giảm giá */}
                <span className="absolute top-2 left-2 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">
                  {product.discount}
                </span>
              </div>

              {/* Thông tin sản phẩm */}
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate">
                  {product.description}
                </p>

                {/* Dung tích */}
                <div className="flex gap-2 mt-1">
                  {product.size.map((size, i) => (
                    <span
                      key={i}
                      className="border text-xs px-2 py-1 rounded text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Giá sản phẩm */}
                <div className="mt-2">
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                  <span className="text-red-600 font-bold text-md ml-2">
                    {product.price}
                  </span>
                </div>

                {/* Đánh giá sao */}
                <div className="flex space-x-1 mt-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) =>
                      i < product.rating ? (
                        <StarFilled
                          key={i}
                          className="text-yellow-400 text-sm"
                        />
                      ) : (
                        <StarOutlined
                          key={i}
                          className="text-gray-300 text-sm"
                        />
                      )
                    )}
                </div>
              </div>

              {/* Nút yêu thích & giỏ hàng */}
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-300 transition">
                  <HeartOutlined className="text-xl" />
                </button>
                <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-gray-300 transition">
                  <ShoppingCartOutlined className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={fakeProducts.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
        {/* --- Nhóm Hương Phổ Biến --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Nhóm hương phổ biến
          </h2>
          <p className="text-gray-600 mb-6">
            <a
              href="/fragrance-groups"
              className="text-blue-600 font-semibold hover:underline"
            >
              Nhóm hương nước hoa
            </a>{" "}
            phổ biến bao gồm hương hoa cỏ, hương gỗ và hương trái cây. Mỗi nhóm
            mang một phong cách riêng biệt, từ nhẹ nhàng, ngọt ngào đến mạnh mẽ,
            cá tính, phù hợp với nhiều gu mùi hương, dịp sử dụng, cũng như sở
            thích của người dùng.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Hình ảnh nhóm hương
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Tên nhóm hương (tiếng Anh)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Tên tiếng Việt
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Đặc trưng nhóm hương
                  </th>
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
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {group.englishName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {group.vietnameseName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">
                      {group.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PerfumeProduct;
