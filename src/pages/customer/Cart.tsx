import React, { useEffect, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct } from "../../redux/cartSlice";
import { Pagination } from "antd";

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
  const { products } = useSelector((state: any) => state.cart);
  const [productsSelected, setProductsSelected] = useState<CartProduct[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customScrollbarStyles;
    document.head.appendChild(styleSheet);
    console.log(productsSelected);

  }, [productsSelected]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (product: CartProduct, isChecked: boolean) => {
    if (isChecked) {
      // Add the product to the selected list
      setProductsSelected((prevSelected) => [...prevSelected, product]);
    } else {
      // Remove the product from the selected list
      setProductsSelected((prevSelected) =>
        prevSelected.filter((p) => p.productId !== product.productId)
      );
    }
  };

  // Function to handle checkbox select all
  const handleCheckboxSelectAll = () => {
    if (productsSelected.length != products.length) {
      // Add all the product to the selected list
      setProductsSelected([...products]);
    } else {
      // Remove all the product from the selected list
      setProductsSelected([]);
    }
  };

  return (

    <div className="p-6 bg-white">
      {/* Tiêu đề trang */}
      <header className="w-full p-4 text-center">
        <h1 className="text-3xl font-[500]">Giỏ hàng</h1>
      </header>
      <div className="w-[8%] ml-auto mt-6 pb-6 ">
        <button
          className="w-full bg-[rgba(255,96,121,0.7)] text-white font-bold py-3 rounded-lg hover:bg-[rgba(255,96,121,0.9)] transition-colors duration-300"
        >
          Chọn tất cả
        </button>
      </div>
      {/* Danh mục giỏ hàng */}
      <div
        className="overflow-x-auto overflow-y-scroll border p-6 border-gray-200 rounded-lg shadow inline-scrollbar"
        style={{ maxHeight: "650px" }}
      >
        <div className="grid grid-flow grid-rows-1 gap-1">
          <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b justify-between transition-colors overflow-hidden">
            {/* Cột trái: Thông tin sản phẩm */}
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5 cursor-pointer"
              />
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
      <div className="w-[60%] ml-auto mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
        {/* Mã giảm giá */}
        <div className="flex items-center mb-6">
          <img
            src="https://s3-alpha-sig.figma.com/img/e1bd/45d9/cb6fa9f62566eade09560369b67ddc0b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c4ylfaipA60VFhpSyoPPehAv~fo~y~uV8t9axZCqzL5doiNhxnmwsEeNMkUrn2CRVTqTdETJ1nZHrBzJqsTT-8EcB5-ZLeonmYA7Vr7rBnyz2oD~rwBciJCm6CvQq7F~4~lgCqDxj5wsXtl1OTCf2RgQdyITPTPn4NcyzsuIwcTiAo3dDCSOicGIyq10jyICOKlCpIdpgOcIfP~Tp0Yy2bBxkC3-LYyGcm9PWBnxSUpU8AXVaEZXa6c2rp9EvJRJn6CnulCiyXnNWfV9xdECHp3t9T1u~FVvghOVWZGzpW2T~qqr8FrNsCmzcfr94XKd6rrQe7s4HqWl2e0ukmjO4g__"
            alt="Discount Icon"
            className="w-6 h-6 mr-2"
          />
          <input
            type="text"
            placeholder="Mã giảm giá"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(255,96,121,0.7)]"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">Số lượng(3)</span>
          <span className="font-semibold text-lg">1,048,000 VND</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">Giảm giá</span>
          <span className="font-semibold text-lg">100,000 VND</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold text-lg">Tổng tiền</span>
          <span className="font-semibold text-lg" style={{ color: "rgba(255, 96, 121, 0.7)" }}>948,000 VND</span>
        </div>
        <button
          className="w-full bg-[rgba(255,96,121,0.7)] text-white font-bold py-3 rounded-lg hover:bg-[rgba(255,96,121,0.9)] transition-colors duration-300"
        >
          THANH TOÁN
        </button>
      </div>
    </div>

  );
};

export default Cart;
