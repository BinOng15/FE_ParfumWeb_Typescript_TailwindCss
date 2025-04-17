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
} from "../components/models/Order";

const orderService = {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: async (
        data: AddToCartRequest
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.post("/orders/add-to-cart", data, {
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
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.put("/orders/update-cart", data, {
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
                await axiosInstance.post("/orders", data, {
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

    // Cập nhật đơn hàng
    updateOrder: async (
        orderId: number,
        data: UpdateOrderRequest
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.put(`/orders/${orderId}`, data, {
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

    // Xóa (hoặc khôi phục) đơn hàng
    deleteOrder: async (
        orderId: number,
        status: boolean
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.delete(`/orders/${orderId}`, {
                    params: { status },
                });
            return response.data;
        } catch (error) {
            console.error(`Error deleting order ${orderId}:`, error);
            throw error;
        }
    },

    // Lấy đơn hàng theo ID
    getOrderById: async (orderId: number): Promise<OrderResponse> => {
        try {
            const response: AxiosResponse<BaseResponse<OrderResponse>> =
                await axiosInstance.get(`/orders/${orderId}`);
            return response.data.Data;
        } catch (error) {
            console.error(`Error fetching order by ID ${orderId}:`, error);
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
                await axiosInstance.put("/orders/order-details", data, {
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
                await axiosInstance.get(`/orders/order-details/${orderDetailId}`);
            return response.data.Data;
        } catch (error) {
            console.error(`Error fetching order detail by ID ${orderDetailId}:`, error);
            throw error;
        }
    },
};

export default orderService;