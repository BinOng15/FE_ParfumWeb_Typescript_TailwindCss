/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { message, Spin, Button, notification, Modal, Select, Checkbox } from "antd";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import { UpdateCartRequest } from "../../components/models/Order";
import { CreatePaymentRequest } from "../../components/models/Payment";
import { axiosInstance } from "../../services/axiosInstance";
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

const getProductById = async (productId: number): Promise<ProductResponse | null> => {
  try {
    const response = await axiosInstance.get(`/product/getproductbyid?id=${productId}`);
    console.log(`getProductById response for productId ${productId}:`, response.data);
    return response.data.data || null;
  } catch (error: any) {
    console.error(`Error fetching product by ID ${productId}:`, error.response?.data || error);
    return null;
  }
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"banking" | "cash">("banking");
  const navigate = useNavigate();

  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const customerId = user?.customerId;
  const address = user?.address;
  const isAuthenticated = !!user && !!customerId;

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
        console.log(`Fetching cart for customerId: ${customerId}`);
        const response = await orderService.getCartByCustomerId(customerId);
        console.log("getCartByCustomerId response:", response);

        const cart = response.data;
        console.log("Cart data:", cart);

        if (cart && cart.orderDetails && cart.orderDetails.length > 0) {
          const productIds = cart.orderDetails.map((detail: any) => detail.productId);
          console.log("Product IDs to fetch:", productIds);
          const productPromises = productIds.map((id: any) => getProductById(id));
          const products = await Promise.all(productPromises);

          const cartItems = cart.orderDetails.map((detail: any, index: any) => {
            const product = products[index];
            return {
              orderDetail: detail,
              product: product || {
                productId: detail.productId,
                name: detail.productName || "Không có thông tin",
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
          console.log("No cart found for customerId:", customerId);
          setCartItems([]);
        }
      } catch (error: any) {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, customerId, navigate]);

  const handleSelectItem = (orderDetailId: number, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, orderDetailId] : prev.filter((id) => id !== orderDetailId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? cartItems.map((item) => item.orderDetail.orderDetailId) : []);
  };

  const handleUpdateQuantity = async (
    orderDetail: OrderDetailResponse,
    change: number
  ) => {
    const newQuantity = orderDetail.quantity + change;

    const product = cartItems.find(
      (item) => item.orderDetail.orderDetailId === orderDetail.orderDetailId
    )?.product;

    if (product && newQuantity > product.stock && product.stock > 0) {
      message.warning(`Số lượng không thể vượt quá tồn kho (${product.stock})!`);
      return;
    }

    if (newQuantity === 0) {
      Modal.confirm({
        title: "Bạn chắc chắn muốn bỏ sản phẩm này?",
        content: product ? `Sản phẩm: ${product.name}` : "Sản phẩm này",
        okText: "Có",
        cancelText: "Không",
        onOk: async () => {
          setUpdating(orderDetail.orderDetailId);
          try {
            const updateData: UpdateCartRequest = {
              customerId: customerId,
              items: [
                {
                  productId: orderDetail.productId,
                  quantity: 0,
                  price: orderDetail.unitPrice,
                },
              ],
            };
            console.log("Sending updateCart request with payload:", updateData);
            const response = await orderService.updateCart(updateData);
            console.log("updateCart response:", response);

            if (response.success) {
              setCartItems((prev) =>
                prev.filter(
                  (item) => item.orderDetail.orderDetailId !== orderDetail.orderDetailId
                )
              );
              setSelectedItems((prev) =>
                prev.filter((id) => id !== orderDetail.orderDetailId)
              );
              notification.success({
                message: "Thành công",
                description: `Đã xóa sản phẩm khỏi giỏ hàng!`,
              });
            } else {
              notification.error({
                message: "Lỗi",
                description: response.message || "Không thể xóa sản phẩm!",
              });
            }
          } catch (error: any) {
            console.error("Error removing product:", error);
            notification.error({
              message: "Lỗi",
              description: error.message || "Không thể xóa sản phẩm!",
            });
          } finally {
            setUpdating(null);
          }
        },
      });
      return;
    }

    if (newQuantity < 0) {
      message.warning("Số lượng không hợp lệ!");
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.orderDetail.orderDetailId === orderDetail.orderDetailId
          ? {
            ...item,
            orderDetail: { ...item.orderDetail, quantity: newQuantity },
          }
          : item
      )
    );

    setUpdating(orderDetail.orderDetailId);
    try {
      const updateData: UpdateCartRequest = {
        customerId: customerId,
        items: [
          {
            productId: orderDetail.productId,
            quantity: newQuantity,
            price: orderDetail.unitPrice,
          },
        ],
      };
      console.log("Sending updateCart request with payload:", updateData);
      const response = await orderService.updateCart(updateData);
      console.log("updateCart response:", response);

      if (response.success) {
        return;
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.orderDetail.orderDetailId === orderDetail.orderDetailId
              ? {
                ...item,
                orderDetail: { ...item.orderDetail, quantity: orderDetail.quantity },
              }
              : item
          )
        );
        throw new Error(response.message || "Không thể cập nhật số lượng!");
      }
    } catch (error: any) {
      console.error("Error updating quantity:", error);
      setCartItems((prev) =>
        prev.map((item) =>
          item.orderDetail.orderDetailId === orderDetail.orderDetailId
            ? {
              ...item,
              orderDetail: { ...item.orderDetail, quantity: orderDetail.quantity },
            }
            : item
        )
      );
      notification.error({
        message: "Lỗi",
        description: error.message || "Không thể cập nhật số lượng!",
      });
    } finally {
      setUpdating(null);
    }
  };

  const calculateTotal = () => {
    const itemsToCalculate = selectedItems.length
      ? cartItems.filter((item) => selectedItems.includes(item.orderDetail.orderDetailId))
      : cartItems;
    const total = itemsToCalculate.reduce(
      (total, item) => total + item.orderDetail.quantity * item.orderDetail.unitPrice,
      0
    );
    console.log("Calculated total:", total);
    return total;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      message.error("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    if (!selectedItems.length) {
      message.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    if (!address) {
      message.warning("Vui lòng cập nhật địa chỉ giao hàng trước khi thanh toán!");
      navigate("/profile");
      return;
    }

    setLoading(true);
    try {
      const createOrderData = {
        customerId: customerId,
        orderDetailIds: selectedItems,
        shippingAddress: address,
      };
      console.log("Sending createFromCart request with payload:", createOrderData);
      const orderResponse = await orderService.createOrderFromCart(createOrderData);
      console.log("createFromCart response:", orderResponse);

      if (!orderResponse.success || !orderResponse.data) {
        throw new Error(orderResponse.message || "Không thể tạo đơn hàng!");
      }

      const newOrderId = orderResponse.data.orderId;

      const paymentRequest: CreatePaymentRequest = {
        orderId: newOrderId,
        paymentMethod: paymentMethod,
      };
      console.log("Sending createPayment request with payload:", paymentRequest);
      const paymentResponse = await paymentService.createPayment(paymentRequest);
      console.log("createPayment response:", paymentResponse);

      if (paymentResponse.success && paymentResponse.data) {
        try {
          const removeResponse = await orderService.removeCartItems({
            customerId: customerId,
            orderDetailIds: selectedItems,
          });
          console.log("removeCartItems response:", removeResponse);
          if (removeResponse.success) {
            setCartItems((prev) =>
              prev.filter((item) => !selectedItems.includes(item.orderDetail.orderDetailId))
            );
            setSelectedItems([]);
          } else {
            console.warn("Failed to remove items from cart:", removeResponse.message);
          }
        } catch (error: any) {
          console.error("Error removing cart items:", error);
          message.warning("Đã thanh toán nhưng không thể cập nhật giỏ hàng!");
        }

        if (paymentMethod === "banking" && paymentResponse.data.checkoutUrl) {
          localStorage.setItem("Paid", newOrderId.toString());
          window.location.href = paymentResponse.data.checkoutUrl;
        } else if (paymentMethod === "cash") {
          notification.success({
            message: "Thành công",
            description: "Đơn hàng đã được tạo với thanh toán tiền mặt. Vui lòng thanh toán khi nhận hàng!",
          });
          navigate("/order-history");
        }
      } else {
        throw new Error(paymentResponse.message || "Không thể tạo thanh toán!");
      }
    } catch (error: any) {
      console.error("Error during checkout:", error);
      notification.error({
        message: "Lỗi",
        description: error.message || "Lỗi khi xử lý thanh toán!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !customerId) {
    return <div className="text-center text-lg">Vui lòng đăng nhập để xem giỏ hàng!</div>;
  }

  if (loading) {
    return <Spin className="flex justify-center items-center h-64" />;
  }

  return (
    <div>
      {/* Phần tiêu đề trang */}
      <header className="bg-[#FF8787] text-white text-center py-4 mb-6 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold">Giỏ hàng của bạn</h1>
      </header>

      {/* Phần hiển thị địa chỉ giao hàng */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Địa chỉ giao hàng</h2>
          {address ? (
            <p className="text-lg text-gray-600">{address}</p>
          ) : (
            <p className="text-lg text-red-500">
              Chưa có địa chỉ giao hàng.{" "}
              <a href="/profile" className="text-blue-500 underline">
                Cập nhật ngay
              </a>
            </p>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div>
            {/* Thanh tiêu đề cột */}
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] border-b border-gray-200 pb-2 mb-4">
              <span className="text-lg font-semibold text-gray-700">Sản phẩm</span>
              <span className="text-lg font-semibold text-gray-700 text-center">Đơn giá</span>
              <span className="text-lg font-semibold text-gray-700 text-center">Số lượng</span>
              <span className="text-lg font-semibold text-gray-700 text-center">Số tiền</span>
            </div>
            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 gap-6 mb-24">
              {cartItems.map((item) => (
                <div
                  key={item.orderDetail.orderDetailId}
                  className="grid grid-cols-[2fr,1fr,1fr,1fr] border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white items-center"
                >
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedItems.includes(item.orderDetail.orderDetailId)}
                      onChange={(e) => handleSelectItem(item.orderDetail.orderDetailId, e.target.checked)}
                      className="mr-4"
                    />
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="text-gray-600 text-sm">
                        Thương hiệu: {item.product.brand}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xl text-center">
                    {item.orderDetail.unitPrice.toLocaleString()}đ
                  </p>
                  <div className="flex items-center justify-center">
                    <Button
                      size="large"
                      onClick={() => handleUpdateQuantity(item.orderDetail, -1)}
                      disabled={updating === item.orderDetail.orderDetailId}
                      className="mr-2 text-2xl"
                    >
                      -
                    </Button>
                    <span className="text-gray-700 mx-2">{item.orderDetail.quantity}</span>
                    <Button
                      size="large"
                      onClick={() => handleUpdateQuantity(item.orderDetail, 1)}
                      disabled={updating === item.orderDetail.orderDetailId}
                      className="ml-2 text-2xl"
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-lg font-bold text-pink-600 text-center">
                    {(item.orderDetail.quantity * item.orderDetail.unitPrice).toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>
            {/* Phần cố định ở dưới */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 z-10">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div>
                  <Checkbox
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedItems.length === cartItems.length}
                    indeterminate={
                      selectedItems.length > 0 && selectedItems.length < cartItems.length
                    }
                    style={{ fontSize: "1.5rem" }}
                  >
                    Chọn tất cả
                  </Checkbox>
                </div>
                <div className="flex flex-col items-end">
                  <div className="mb-4">
                    <label className="mr-2 text-lg">Phương thức thanh toán:</label>
                    <Select
                      value={paymentMethod}
                      onChange={(value) => setPaymentMethod(value)}
                      style={{ width: 220 }}
                    >
                      <Select.Option value="banking">Thanh toán online (PayOS)</Select.Option>
                      <Select.Option value="cash">Thanh toán khi nhận hàng</Select.Option>
                    </Select>
                  </div>
                  <p className="text-2xl font-bold mb-4">
                    Tổng tiền: {calculateTotal().toLocaleString()}đ
                    {selectedItems.length > 0 && selectedItems.length < cartItems.length && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({selectedItems.length}/{cartItems.length} sản phẩm được chọn)
                      </span>
                    )}
                  </p>
                  <button
                    className="bg-[#FF8787] text-white px-4 py-2 rounded shadow hover:bg-[#ffa39e] transition-colors duration-300"
                    onClick={handleCheckout}
                    disabled={loading || !selectedItems.length}
                  >
                    <span className="text-xl font-semibold">Thanh toán</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">Giỏ hàng của bạn trống!</p>
        )}
      </div>
    </div>
  );
};

export default Cart;