/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Pagination, message } from "antd";
import { useSelector } from "react-redux";
import orderService from "../../services/orderService"; // Import orderService
import { axiosInstance } from "../../services/axiosInstance";
import { AddToCartRequest } from "../../components/models/Order"; // Import AddToCartRequest
import { ProductResponse } from "../../components/models/Product";
import { useNavigate } from "react-router-dom";


interface BaseResponse<T> {
  data: T;
  status: number;
  message: string;
}

const getProductById = async (productId: number): Promise<BaseResponse<ProductResponse>> => {
  try {
    const response = await axiosInstance.get(`/product/getproductbyid?id=${productId}`);
    console.log(`getProductById response for productId ${productId}:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching product by ID ${productId}:`, error.response?.data || error);
    throw new Error(error.response?.data?.message || "Không thể lấy thông tin sản phẩm");
  }
};

const PerfumeProductDetail: React.FC<{ productId: number }> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const customerId = user?.customerId;
  const roleName = user?.roleName;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error: any) {
        console.error("Failed to fetch product:", error);
        message.error(error.message || "Không thể tải thông tin sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyNow = async () => {
    if (!isAuthenticated || !customerId) {
      message.error("Bạn cần đăng nhập trước khi mua hàng!");
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  const handleAddToCart = async () => {
    console.log("Auth state:", { isAuthenticated, customerId, roleName });

    if (!isAuthenticated || !customerId) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    if (!product) {
      message.error("Không thể lấy thông tin sản phẩm!");
      return;
    }

    // Kiểm tra số lượng hợp lệ
    if (quantity <= 0) {
      message.warning("Số lượng phải lớn hơn 0!");
      return;
    }

    // Kiểm tra tồn kho
    if (product.stock <= 0) {
      message.warning("Sản phẩm hiện đã hết hàng!");
      return;
    }
    if (quantity > product.stock) {
      message.warning(`Số lượng không thể vượt quá tồn kho (${product.stock})!`);
      return;
    }

    try {
      const request: AddToCartRequest = {
        customerId,
        products: [
          {
            productId: product.productId,
            productName: product.name,
            quantity,
            price: product.price,
          },
        ],
      };

      console.log("Sending addToCart request with payload:", request);
      const response = await orderService.addToCart(request);
      console.log("addToCart response:", response);

      if (response.success) {
        message.success("Thêm vào giỏ hàng thành công!");
      } else {
        message.error(response.message || "Không thể thêm vào giỏ hàng!");
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      message.error(error.message || "Lỗi khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  const commitments = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      title: "SẢN PHẨM CHẤT LƯỢNG CAO",
      description: "Kiên quyết nói không với hàng giả, hàng kém chất lượng",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/5785/5785852.png",
      title: "GIAO HÀNG TẬN NƠI",
      description: "Giao hàng trên khắp 63 tỉnh thành",
    },
    {
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs9ULmmyJBs3PlqlSpI_pJTDenFeJFhi8UAQ&s",
      title: "THANH TOÁN ONLINE AN TOÀN",
      description: "Bạn yên tâm thanh toán online qua PayOs",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png",
      title: "ĐỔI TRẢ TRONG 7 NGÀY",
      description: "Dễ dàng đổi trả sản phẩm trong 7 ngày kể từ khi nhận hàng",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="ml-10 mr-10">
      <div className="p-8 bg-white">
        {/* Đường dẫn trang */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="hover:text-black cursor-pointer">Trang chủ</span> –{" "}
          <span className="hover:text-black cursor-pointer">Nước Hoa</span> –{" "}
          <span className="hover:text-black cursor-pointer">Thương hiệu nước hoa</span> –{" "}
          <span className="text-black font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-3 gap-12 mt-6 items-start">
          {/* BÊN TRÁI: Ảnh sản phẩm */}
          <div className="col-span-1">
            <div className="relative">
              <img src={product.imageUrl} alt={product.name} className="w-[420px] h-[500px] shadow-md" />
            </div>
          </div>

          {/* PHẦN GIỮA: Thông tin sản phẩm */}
          <div className="col-span-1">
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="flex items-center my-3">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">4.8</span>
                <span className="ml-2 text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <p className="text-gray-700">
                <strong>Thương hiệu:</strong> <span className="text-blue-500">{product.brand}</span>
              </p>

              <p className="text-gray-700">
                <strong>Tình trạng:</strong>{" "}
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                </span>
              </p>

              <div className="mt-4">
                <span className="text-red-600 text-3xl font-bold">{product.price.toLocaleString()}₫</span>
              </div>

              {/* Chọn số lượng */}
              <div className="flex items-center mt-6">
                <button
                  className="border px-3 py-2 rounded-l bg-gray-200 hover:bg-gray-300"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  disabled={quantity <= 1}
                >
                  <MinusOutlined />
                </button>
                <span className="border-t border-b px-4 py-2">{quantity}</span>
                <button
                  className="border px-3 py-2 rounded-r bg-gray-200 hover:bg-gray-300"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock <= quantity}
                >
                  <PlusOutlined />
                </button>
              </div>

              {/* Nút thêm giỏ hàng và mua */}
              <div className="flex gap-4 mt-6">
                <button
                  className="border px-6 py-3 text-gray-800 bg-white hover:bg-gray-200 flex items-center rounded-md"
                  onClick={handleAddToCart}
                  disabled={!product.stock}
                >
                  <ShoppingCartOutlined className="mr-2" /> Thêm vào giỏ hàng
                </button>
                <button
                  className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-md"
                  disabled={!product.stock}
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

          {/* BÊN PHẢI: Cam kết & Tư vấn */}
          <div className="col-span-1 sticky top-4 space-y-6 min-h-[500px]">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="bg-black text-white text-center font-bold py-2 rounded-md text-lg">
                CAM KẾT TỪ CHÚNG TÔI
              </div>
              <div className="p-4">
                {commitments.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 mb-3">
                    <img src={item.icon} alt="icon" className="w-6 h-6" />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-gray-600 text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="bg-black text-white text-center font-bold py-2 rounded-md text-lg">
                BẠN CẦN TƯ VẤN?
              </div>
              <div className="p-4">
                <div className="flex border rounded-md overflow-hidden">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số điện thoại(*)"
                    className="w-full p-2 text-gray-600 border-none outline-none"
                  />
                  <button className="bg-red-500 text-white px-4 font-semibold hover:bg-red-600">
                    GỬI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t mt-10 border-gray-300 my-8" />
        {/* Chi tiết sản phẩm */}
        <div className="w-full px-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Chi tiết về sản phẩm</h2>
        </div>

        <hr className="border-t border-gray-300 my-8" />
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={reviewsPerPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default PerfumeProductDetail;