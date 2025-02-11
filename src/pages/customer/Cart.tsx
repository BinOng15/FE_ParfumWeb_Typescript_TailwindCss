import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";

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

const customScrollbarStyles = `
    /* Custom scrollbar styles */
    .inline-scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .inline-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .inline-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 96, 121, 0.7);
      border-radius: 4px;
    }
    
    .inline-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 96, 121, 0.9);
    }
    `;

const Cart: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customScrollbarStyles;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <MainLayout>
      <div className="p-6 bg-white">
        {/* Tiêu đề trang */}
        <header className="w-full p-4 text-center">
          <h1 className="text-3xl font-[500]">Giỏ hàng</h1>
        </header>
        {/* Danh mục giỏ hàng */}
        <div
          className="overflow-x-auto overflow-y-scroll border p-6 border-gray-200 rounded-lg shadow inline-scrollbar"
          style={{ maxHeight: "500px" }}
        >
          <div className="grid grid-flow grid-rows-1 gap-1">
            <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b justify-between transition-colors overflow-hidden">
              {/* Cột trái: Thông tin sản phẩm */}
              <div className="flex items-center space-x-4">
                {/* Ảnh sản phẩm */}
                <img
                  src="https://s3-alpha-sig.figma.com/img/b42e/d042/90c7242704c7a44daa1256b01285b8d1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nXaOP4uBB124rwraCk4u0rTxtol7r6ZGjejZc39XocgTdmZJcXtkXIi5dbzW60H1UayVV~EyFgavdmVoirHVN8WNisbkOOdWauqvEHI49WnvdeLktZrsA69ko4ITu5ywzuhoZXCIGHPBJgxO59H8ZxEKR~30Xt9eYVzc-UsQBR-ONUOT8RFAoOlSGok1WEiznaK3hbccqgHpG8XCZ-1Azv7gj~8l-jEUW8krqImxaYrBX9GBdm4TtYhQE-BXriXHevyCJ~lYA0890yLgPgCUDbzHjkPXhhB54nEyZBP5RbFjoJl2BptIt3eRd3WcZOQHzKP2ELf2WsTdE9wmEh5pdQ__"
                  alt="Product Image"
                  className="w-40 h-40 rounded-lg"
                />

                {/* Chi tiết sản phẩm */}
                <div>
                  <p className="font-bold text-lg">
                    No5 Chanel Paris (Chai 10ml)
                  </p>
                  <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                    Pink
                  </p>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    159,000 VND
                  </p>
                </div>
              </div>
              {/* Cột phải: Quản lý số lượng và sản phẩm */}
              <div className="absolute  right-12 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg space-x-4 group-hover:right-56 transition-all duration-300 ease-in-out">
                {/* Quản lý số lượng */}
                <div className="text-lg flex items-center">
                  <button
                    className="font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    -
                  </button>
                  <span className="font-bold bg-gray-100 text-gray-700 px-4 py-1">
                    1
                  </span>
                  <button
                    className="font-bold px-3 py-1 rounded-r "
                    style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Xoá sản phẩm (Mặc định ẩn, chỉ hiển thị khi hover) */}
              <button
                className="absolute h-full -right-20 top-1/2 transform -translate-y-1/2 px-12 py-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: "#C4C4C4", color: "#E71717" }}
              >
                <DeleteFilled className="cursor-pointer text-4xl" />
              </button>
            </div>
            <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b border-gray-200 justify-between transition-colors overflow-hidden">
              <div className="flex items-center space-x-4">
                <img
                  src="https://s3-alpha-sig.figma.com/img/b42e/d042/90c7242704c7a44daa1256b01285b8d1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nXaOP4uBB124rwraCk4u0rTxtol7r6ZGjejZc39XocgTdmZJcXtkXIi5dbzW60H1UayVV~EyFgavdmVoirHVN8WNisbkOOdWauqvEHI49WnvdeLktZrsA69ko4ITu5ywzuhoZXCIGHPBJgxO59H8ZxEKR~30Xt9eYVzc-UsQBR-ONUOT8RFAoOlSGok1WEiznaK3hbccqgHpG8XCZ-1Azv7gj~8l-jEUW8krqImxaYrBX9GBdm4TtYhQE-BXriXHevyCJ~lYA0890yLgPgCUDbzHjkPXhhB54nEyZBP5RbFjoJl2BptIt3eRd3WcZOQHzKP2ELf2WsTdE9wmEh5pdQ__"
                  alt="Product Image"
                  className="w-40 h-40 rounded-lg"
                />
                <div>
                  <p className="font-bold text-lg">
                    Nước Hoa Jean Paul Gaultier Scandal EDP 30ML
                  </p>
                  <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                    01 Blossom Forest
                  </p>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    889,000 VND
                  </p>
                </div>
              </div>
              <div className="absolute  right-12 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg space-x-4 group-hover:right-56 transition-all duration-300 ease-in-out">
                <div className="text-lg flex items-center">
                  <button
                    className="font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    -
                  </button>
                  <span className="font-bold bg-gray-100 text-gray-700 px-4 py-1">
                    1
                  </span>
                  <button
                    className="font-bold px-3 py-1 rounded-r "
                    style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="absolute h-full -right-20 top-1/2 transform -translate-y-1/2 px-12 py-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: "#C4C4C4", color: "#E71717" }}
              >
                <DeleteFilled className="cursor-pointer text-4xl" />
              </button>
            </div>
            <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b border-gray-200 justify-between transition-colors overflow-hidden">
              <div className="flex items-center space-x-4">
                <img
                  src="https://s3-alpha-sig.figma.com/img/b42e/d042/90c7242704c7a44daa1256b01285b8d1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nXaOP4uBB124rwraCk4u0rTxtol7r6ZGjejZc39XocgTdmZJcXtkXIi5dbzW60H1UayVV~EyFgavdmVoirHVN8WNisbkOOdWauqvEHI49WnvdeLktZrsA69ko4ITu5ywzuhoZXCIGHPBJgxO59H8ZxEKR~30Xt9eYVzc-UsQBR-ONUOT8RFAoOlSGok1WEiznaK3hbccqgHpG8XCZ-1Azv7gj~8l-jEUW8krqImxaYrBX9GBdm4TtYhQE-BXriXHevyCJ~lYA0890yLgPgCUDbzHjkPXhhB54nEyZBP5RbFjoJl2BptIt3eRd3WcZOQHzKP2ELf2WsTdE9wmEh5pdQ__"
                  alt="Product Image"
                  className="w-40 h-40 rounded-lg"
                />
                <div>
                  <p className="font-bold text-lg">
                    Nước Hoa Jean Paul Gaultier Scandal EDP 30ML
                  </p>
                  <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                    01 Blossom Forest
                  </p>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    889,000 VND
                  </p>
                </div>
              </div>
              <div className="absolute  right-12 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg space-x-4 group-hover:right-56 transition-all duration-300 ease-in-out">
                <div className="text-lg flex items-center">
                  <button
                    className="font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    -
                  </button>
                  <span className="font-bold bg-gray-100 text-gray-700 px-4 py-1">
                    1
                  </span>
                  <button
                    className="font-bold px-3 py-1 rounded-r "
                    style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="absolute h-full -right-20 top-1/2 transform -translate-y-1/2 px-12 py-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: "#C4C4C4", color: "#E71717" }}
              >
                <DeleteFilled className="cursor-pointer text-4xl" />
              </button>
            </div>
            <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b border-gray-200 justify-between transition-colors overflow-hidden">
              <div className="flex items-center space-x-4">
                <img
                  src="https://s3-alpha-sig.figma.com/img/b42e/d042/90c7242704c7a44daa1256b01285b8d1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nXaOP4uBB124rwraCk4u0rTxtol7r6ZGjejZc39XocgTdmZJcXtkXIi5dbzW60H1UayVV~EyFgavdmVoirHVN8WNisbkOOdWauqvEHI49WnvdeLktZrsA69ko4ITu5ywzuhoZXCIGHPBJgxO59H8ZxEKR~30Xt9eYVzc-UsQBR-ONUOT8RFAoOlSGok1WEiznaK3hbccqgHpG8XCZ-1Azv7gj~8l-jEUW8krqImxaYrBX9GBdm4TtYhQE-BXriXHevyCJ~lYA0890yLgPgCUDbzHjkPXhhB54nEyZBP5RbFjoJl2BptIt3eRd3WcZOQHzKP2ELf2WsTdE9wmEh5pdQ__"
                  alt="Product Image"
                  className="w-40 h-40 rounded-lg"
                />
                <div>
                  <p className="font-bold text-lg">
                    Nước Hoa Jean Paul Gaultier Scandal EDP 30ML
                  </p>
                  <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                    01 Blossom Forest
                  </p>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    889,000 VND
                  </p>
                </div>
              </div>
              <div className="absolute  right-12 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg space-x-4 group-hover:right-56 transition-all duration-300 ease-in-out">
                <div className="text-lg flex items-center">
                  <button
                    className="font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    -
                  </button>
                  <span className="font-bold bg-gray-100 text-gray-700 px-4 py-1">
                    1
                  </span>
                  <button
                    className="font-bold px-3 py-1 rounded-r "
                    style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="absolute h-full -right-20 top-1/2 transform -translate-y-1/2 px-12 py-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: "#C4C4C4", color: "#E71717" }}
              >
                <DeleteFilled className="cursor-pointer text-4xl" />
              </button>
            </div>
            <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b border-gray-200 justify-between transition-colors overflow-hidden">
              <div className="flex items-center space-x-4">
                <img
                  src="https://s3-alpha-sig.figma.com/img/b42e/d042/90c7242704c7a44daa1256b01285b8d1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nXaOP4uBB124rwraCk4u0rTxtol7r6ZGjejZc39XocgTdmZJcXtkXIi5dbzW60H1UayVV~EyFgavdmVoirHVN8WNisbkOOdWauqvEHI49WnvdeLktZrsA69ko4ITu5ywzuhoZXCIGHPBJgxO59H8ZxEKR~30Xt9eYVzc-UsQBR-ONUOT8RFAoOlSGok1WEiznaK3hbccqgHpG8XCZ-1Azv7gj~8l-jEUW8krqImxaYrBX9GBdm4TtYhQE-BXriXHevyCJ~lYA0890yLgPgCUDbzHjkPXhhB54nEyZBP5RbFjoJl2BptIt3eRd3WcZOQHzKP2ELf2WsTdE9wmEh5pdQ__"
                  alt="Product Image"
                  className="w-40 h-40 rounded-lg"
                />
                <div>
                  <p className="font-bold text-lg">
                    Nước Hoa Jean Paul Gaultier Scandal EDP 30ML
                  </p>
                  <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                    01 Blossom Forest
                  </p>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    889,000 VND
                  </p>
                </div>
              </div>
              <div className="absolute  right-12 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg space-x-4 group-hover:right-56 transition-all duration-300 ease-in-out">
                <div className="text-lg flex items-center">
                  <button
                    className="font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    -
                  </button>
                  <span className="font-bold bg-gray-100 text-gray-700 px-4 py-1">
                    1
                  </span>
                  <button
                    className="font-bold px-3 py-1 rounded-r "
                    style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="absolute h-full -right-20 top-1/2 transform -translate-y-1/2 px-12 py-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: "#C4C4C4", color: "#E71717" }}
              >
                <DeleteFilled className="cursor-pointer text-4xl" />
              </button>
            </div>
            <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b border-gray-200 justify-between transition-colors overflow-hidden">
              <div className="flex items-center space-x-4">
                <img
                  src="https://s3-alpha-sig.figma.com/img/b42e/d042/90c7242704c7a44daa1256b01285b8d1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nXaOP4uBB124rwraCk4u0rTxtol7r6ZGjejZc39XocgTdmZJcXtkXIi5dbzW60H1UayVV~EyFgavdmVoirHVN8WNisbkOOdWauqvEHI49WnvdeLktZrsA69ko4ITu5ywzuhoZXCIGHPBJgxO59H8ZxEKR~30Xt9eYVzc-UsQBR-ONUOT8RFAoOlSGok1WEiznaK3hbccqgHpG8XCZ-1Azv7gj~8l-jEUW8krqImxaYrBX9GBdm4TtYhQE-BXriXHevyCJ~lYA0890yLgPgCUDbzHjkPXhhB54nEyZBP5RbFjoJl2BptIt3eRd3WcZOQHzKP2ELf2WsTdE9wmEh5pdQ__"
                  alt="Product Image"
                  className="w-40 h-40 rounded-lg"
                />
                <div>
                  <p className="font-bold text-lg">
                    Nước Hoa Jean Paul Gaultier Scandal EDP 30ML
                  </p>
                  <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                    01 Blossom Forest
                  </p>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    889,000 VND
                  </p>
                </div>
              </div>
              <div className="absolute  right-12 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg space-x-4 group-hover:right-56 transition-all duration-300 ease-in-out">
                <div className="text-lg flex items-center">
                  <button
                    className="font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    style={{ color: "rgba(255, 96, 121, 0.7)" }}
                  >
                    -
                  </button>
                  <span className="font-bold bg-gray-100 text-gray-700 px-4 py-1">
                    1
                  </span>
                  <button
                    className="font-bold px-3 py-1 rounded-r "
                    style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="absolute h-full -right-20 top-1/2 transform -translate-y-1/2 px-12 py-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: "#C4C4C4", color: "#E71717" }}
              >
                <DeleteFilled className="cursor-pointer text-4xl" />
              </button>
            </div>
          </div>
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
      </div>
    </MainLayout>
  );
};

export default Cart;
