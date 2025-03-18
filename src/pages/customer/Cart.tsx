import React, { useEffect, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct, addToCart } from "../../redux/cartSlice";

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
    <MainLayout>
      <div className="p-6 bg-white">
        {/* Tiêu đề trang */}
        <header className="w-full p-4 text-center">
          <h1 className="text-3xl font-[500]">Giỏ hàng</h1>
        </header>
        <div className="w-[8%] ml-auto mt-6 pb-6 ">
          <button
            className="w-full bg-[rgba(255,96,121,0.7)] text-white font-bold py-3 rounded-lg hover:bg-[rgba(255,96,121,0.9)] transition-colors duration-300"
            onClick={handleCheckboxSelectAll}
          >
            {
              (productsSelected.length == products.length) ? "Bỏ chọn tất cả"
                : "Chọn tất cả"
            }

          </button>
        </div>
        {/* Danh mục giỏ hàng */}
        <div
          className="overflow-x-auto overflow-y-scroll border p-6 border-gray-200 rounded-lg shadow inline-scrollbar"
          style={{ maxHeight: "650px" }}
        >
          <div className="grid grid-flow grid-rows-1 gap-1">
            {
              products &&
              products.map((product: CartProduct) => {
                const isChecked = productsSelected.some((p) => p.productId === product.productId);
                return (
                  <div className="group relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex items-center border-b justify-between transition-colors overflow-hidden">
                    {/* Cột trái: Thông tin sản phẩm */}
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(product, e.target.checked)
                        }
                      />

                      {/* Ảnh sản phẩm */}
                      <img
                        src={product.imageUrl}
                        alt="Product Image"
                        className="w-40 h-40 rounded-lg"
                      />

                      {/* Chi tiết sản phẩm */}
                      <div>
                        <p className="font-bold text-lg">
                          {product.name}
                        </p>
                        <p className="font-semibold text-gray-500  pt-0 px-1 pb-10 text-lg">
                          {product.brand}
                        </p>
                        <p
                          className="font-semibold text-lg"
                          style={{ color: "rgba(255, 96, 121, 0.7)" }}
                        >
                          {product.price.toLocaleString()}₫
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
                          {product.quantity}
                        </span>
                        <button
                          className="font-bold px-3 py-1 rounded-r "
                          style={{ backgroundColor: "rgba(255, 96, 121, 0.7)" }}
                          onClick={() => {
                            dispatch(addToCart(product));
                          }}
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
                )
              })
            }
          </div>
        </div>
        <div className="w-[60%] ml-auto mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
          {/* Mã giảm giá */}
          <div className="flex items-center mb-6">
            <img
              src="..\src\assets\promotion.png"
              alt="Discount Icon"
              className="w-12 h-12 mr-2"
            />
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(255,96,121,0.7)]"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Số lượng({products.reduce((total: number, product: CartProduct) => total + product.quantity, 0)})</span>
            <span className="font-semibold text-lg">{products.reduce((total: number, product: CartProduct) => total + product.price * product.quantity, 0).toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Giảm giá</span>
            <span className="font-semibold text-lg">100.000₫</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-lg">Tổng tiền</span>
            <span className="font-semibold text-lg" style={{ color: "rgba(255, 96, 121, 0.7)" }}>{products.reduce((total: number, product: CartProduct) => total + product.price * product.quantity, 0).toLocaleString()}₫</span>
          </div>
          <button
            className="w-full bg-[rgba(255,96,121,0.7)] text-white font-bold py-3 rounded-lg hover:bg-[rgba(255,96,121,0.9)] transition-colors duration-300"
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
