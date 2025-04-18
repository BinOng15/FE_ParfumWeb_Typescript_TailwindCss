/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
    BaseResponse,
    OrderResponse,
    AddToCartRequest,
    UpdateCartRequest,
    CreateOrderRequest,
    UpdateOrderRequest,
    GetAllOrderRequest,
    UpdateOrderDetailRequest,
    OrderDetailResponse,
    CreateOrderFromCartRequest,
} from "../components/models/Order";

const orderService = {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: async (
        data: AddToCartRequest
    ) => {
        try {
            const response =
                await axiosInstance.post("/order/add-to-cart", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw error;
        }
    },

    // Cập nhật giỏ hàng
    updateCart: async (
        data: UpdateCartRequest
    ) => {
        try {
            const response =
                await axiosInstance.put("/order/update-cart", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error) {
            console.error("Error updating cart:", error);
            throw error;
        }
    },

    // Tạo đơn hàng mới
    createOrder: async (
        data: CreateOrderRequest
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.post("/order/create", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },
    removeCartItems: async (data: { customerId: number; orderDetailIds: number[] }) => {
        try {
            const response = await axiosInstance.post("/order/remove-cart-items", data);
            return response.data;
        } catch (error) {
            console.error("Error removing cart items:", error);
            throw error;
        }
    },

    // Cập nhật đơn hàng
    updateOrder: async (
        orderId: number,
        data: UpdateOrderRequest
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.put(`/order/${orderId}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error) {
            console.error(`Error updating order ${orderId}:`, error);
            throw error;
        }
    },
    updateOrderStatus: async (orderId: number, newStatus: string) => {
        try {
            const response = await axiosInstance.put(`/order/update-status/${orderId}`, newStatus);
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật trạng thái đơn hàng ${orderId}:`, error);
            throw error;
        }
    },

    // Xóa (hoặc khôi phục) đơn hàng
    deleteOrder: async (
        orderId: number,
        status: boolean
    ) => {
        try {
            const response = await axiosInstance.delete(`/order/${orderId}?status=${status}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting order ${orderId}:`, error);
            throw error;
        }
    },

    // Lấy đơn hàng theo ID
    getOrderById: async (orderId: number) => {
        try {
            const response =
                await axiosInstance.get(`/order/${orderId}`);
            return response.data.Data;
        } catch (error) {
            console.error(`Error fetching order by ID ${orderId}:`, error);
            throw error;
        }
    },
    getOrderByCustomerId: async (customerId: number) => {
        try {
            const response =
                await axiosInstance.get(`/order/getbycustomerid/${customerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching order by customer ID ${customerId}:`, error);
            throw error;
        }
    },
    // Lấy tất cả đơn hàng (phân trang)
    getAllOrders: async (
        data: GetAllOrderRequest
    ): Promise<{ pageData: OrderResponse[]; pageInfo: { totalItem: number } }> => {
        try {
            const response =
                await axiosInstance.post("/order/getall", data);
            return {
                pageData: response.data.data.pageData || [],
                pageInfo: response.data.data.pageInfo || { totalItem: 0 },
            };
        } catch (error) {
            console.error("Error fetching all orders:", error);
            throw error;
        }
    },

    // Cập nhật chi tiết đơn hàng
    updateOrderDetail: async (
        data: UpdateOrderDetailRequest
    ): Promise<BaseResponse<OrderDetailResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderDetailResponse>> =
                await axiosInstance.put("/order/order-details", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error) {
            console.error("Error updating order detail:", error);
            throw error;
        }
    },

    // Lấy chi tiết đơn hàng theo ID
    getOrderDetailById: async (
        orderDetailId: number
    ): Promise<OrderDetailResponse> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderDetailResponse>> =
                await axiosInstance.get(`/order/order-details/${orderDetailId}`);
            return response.data.Data;
        } catch (error) {
            console.error(`Error fetching order detail by ID ${orderDetailId}:`, error);
            throw error;
        }
    },
    createOrderFromCart: async (
        data: CreateOrderFromCartRequest) => {
        try {
            const response =
                await axiosInstance.post("/order/create-from-cart", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error) {
            console.error("Error creating order from cart:", error);
            throw error;
        }
    },
    getCartByCustomerId: async (customerId: number) => {
        try {
            const response = await axiosInstance.get(`/order/getcart/${customerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching cart by customer ID ${customerId}:`, error);
            throw error;
        }
    }
};

export default orderService;