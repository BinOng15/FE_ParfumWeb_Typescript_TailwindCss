/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { message, Spin, Button, Modal, notification } from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import orderService from "../../services/orderService";
import { GetAllOrderRequest, OrderResponse } from "../../components/models/Order";
import { axiosInstance } from "../../services/axiosInstance";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface OrderDetailResponse {
  orderDetailId: number;
  orderId: number;
  productId: number;
  productName: string | null;
  quantity: number;
  unitPrice: number;
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

interface CartItem {
  orderDetail: OrderDetailResponse;
  product: ProductResponse;
}

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
  } catch (error) {
    console.error(`Error fetching product by ID ${productId}:`, error);
    throw error;
  }
};

const deleteOrderDetail = async (
  orderDetailId: number
): Promise<BaseResponse<OrderResponse>> => {
  try {
    const response: AxiosResponse<BaseResponse<OrderResponse>> =
      await axiosInstance.delete(`/order/delete-order-detail/${orderDetailId}`);
    console.log(`deleteOrderDetail response for orderDetailId ${orderDetailId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order detail ${orderDetailId}:`, error);
    throw error;
  }
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const customerId = user?.customerId;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth state in Cart:", { isAuthenticated, customerId });

    if (!isAuthenticated || !customerId) {
      console.log("Authentication failed: Redirecting to login...");
      message.error("Vui lòng đăng nhập để xem giỏ hàng!");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const data: GetAllOrderRequest = {
          pageNum: 1,
          pageSize: 10,
        };
        console.log("Sending getAllOrders request with payload:", data);
        const response = await orderService.getAllOrders(data);
        console.log("getAllOrders response:", response);

        const cartOrder = response.pageData?.find(
          (order: OrderResponse) =>
            order.status === "Cart" && order.customerId === customerId
        );
        console.log("Filtered cart order:", cartOrder);

        if (cartOrder) {
          setCart(cartOrder);
          if (cartOrder.orderDetails) {
            const productIds = cartOrder.orderDetails.map((detail) => detail.productId);
            console.log("Product IDs to fetch:", productIds);
            const productPromises = productIds.map((id) => getProductById(id));
            const productsResponse = await Promise.all(productPromises);
            const products = productsResponse.map((res) => res.data);

            const cartItems = cartOrder.orderDetails.map((detail) => {
              const product = products.find((p) => p.productId === detail.productId);
              return {
                orderDetail: detail,
                product: product || {
                  productId: detail.productId,
                  name: "Không có thông tin",
                  brand: "",
                  imageUrl: "",
                  price: detail.unitPrice,
                  stock: 0,
                  description: "",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  isDeleted: false,
                },
              };
            });
            console.log("Cart items after combining:", cartItems);
            setCartItems(cartItems);
          } else {
            setCartItems([]);
          }
        } else {
          console.log("No cart order found for customerId:", customerId);
          setCart(null);
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        message.error("Lỗi khi tải giỏ hàng!");
        setCart(null);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, customerId, navigate]);

  const handleDeleteCart = () => {
    if (!cart) {
      message.warning("Giỏ hàng trống, không có gì để xóa!");
      return;
    }

    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await orderService.deleteOrder(cart.orderId, true);
          console.log("Delete cart response:", response);

          if (response.status === 200) {
            notification.success({
              message: "Thành công",
              description: "Xóa toàn bộ giỏ hàng thành công!",
            });
            setCart(null);
            setCartItems([]);
          } else {
            throw new Error(response.Message || "Không thể xóa giỏ hàng!");
          }
        } catch (error: any) {
          console.error("Error deleting cart:", error);
          notification.error({
            message: "Lỗi",
            description: error.message || "Không thể xóa giỏ hàng!",
          });
        }
      },
    });
  };

  const handleDeleteOrderDetail = (orderDetail: OrderDetailResponse) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteOrderDetail(orderDetail.orderDetailId);
          if (response.status === 200) {
            notification.success({
              message: "Thành công",
              description: "Xóa sản phẩm khỏi giỏ hàng thành công!",
            });

            const data: GetAllOrderRequest = {
              pageNum: 1,
              pageSize: 10,
            };
            const updatedResponse = await orderService.getAllOrders(data);
            const updatedCartOrder = updatedResponse.pageData?.find(
              (order: OrderResponse) =>
                order.status === "Cart" && order.customerId === customerId
            );
            console.log("Updated cart order after delete:", updatedCartOrder);

            if (updatedCartOrder && updatedCartOrder.orderDetails) {
              const productIds = updatedCartOrder.orderDetails.map((detail) => detail.productId);
              const productPromises = productIds.map((id) => getProductById(id));
              const productsResponse = await Promise.all(productPromises);
              const products = productsResponse.map((res) => res.data);

              const updatedCartItems = updatedCartOrder.orderDetails.map((detail) => {
                const product = products.find((p) => p.productId === detail.productId);
                return {
                  orderDetail: detail,
                  product: product || {
                    productId: detail.productId,
                    name: "Không có thông tin",
                    brand: "",
                    imageUrl: "",
                    price: detail.unitPrice,
                    stock: 0,
                    description: "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isDeleted: false,
                  },
                };
              });
              setCart(updatedCartOrder);
              setCartItems(updatedCartItems);
            } else {
              setCart(null);
              setCartItems([]);
            }
          } else {
            throw new Error(response.message || "Không thể xóa sản phẩm!");
          }
        } catch (error: any) {
          console.error("Error deleting order detail:", error);
          notification.error({
            message: "Lỗi",
            description: error.message || "Không thể xóa sản phẩm khỏi giỏ hàng!",
          });
        }
      },
    });
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.orderDetail.quantity * item.orderDetail.unitPrice,
      0
    );
    console.log("Calculated total:", total);
    return total;
  };

  if (!isAuthenticated || !customerId) {
    return <div className="text-center text-lg">Vui lòng đăng nhập để xem giỏ hàng!</div>;
  }

  if (loading) {
    return <Spin className="flex justify-center items-center h-64" />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      {cartItems.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.orderDetail.orderDetailId}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-gray-600">Thương hiệu: {item.product.brand}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Số lượng: {item.orderDetail.quantity}</p>
                  <p className="text-gray-700">
                    Đơn giá: {item.orderDetail.unitPrice.toLocaleString()} VNĐ
                  </p>
                </div>
                <p className="text-lg font-bold mb-4">
                  Thành tiền: {(item.orderDetail.quantity * item.orderDetail.unitPrice).toLocaleString()} VNĐ
                </p>
                <button
                  onClick={() => handleDeleteOrderDetail(item.orderDetail)}
                  className="self-end text-red-500 hover:text-red-700 transition-colors"
                  title="Xóa sản phẩm"
                >
                  <DeleteOutlined className="text-lg" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-end">
            <Button
              type="default"
              danger
              onClick={handleDeleteCart}
              className="mb-4"
            >
              Xóa toàn bộ giỏ hàng
            </Button>
            <p className="text-xl font-bold mb-4">
              Tổng tiền: {calculateTotal().toLocaleString()} VNĐ
            </p>
            <Button type="primary" size="large">
              Thanh toán
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Giỏ hàng của bạn trống!</p>
      )}
    </div>
  );
};

export default Cart;