/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInstance";
import {
    VietQrRequest,
    VietQrResponse,
    CreatePaymentRequest,
    PaymentResponse,
    GetAllPaymentRequest,
    BaseResponse,
    DynamicResponse,
} from "../components/models/Payment"; // Giả định các interface được định nghĩa trong models/Payment

const paymentService = {
    // Tạo mã QR VietQR
    generateQr: async (data: VietQrRequest): Promise<BaseResponse<VietQrResponse>> => {
        try {
            const response = await axiosInstance.post("/payment/qr", data);
            return response.data;
        } catch (error: any) {
            console.error("Error generating QR code:", error);
            throw new Error(error.response?.data?.Message || "Không thể tạo mã QR");
        }
    },

    // Tạo thanh toán mới
    createPayment: async (
        data: CreatePaymentRequest
    ) => {
        try {
            const response = await axiosInstance.post("/payment/create", data);
            return response.data;
        } catch (error: any) {
            console.error("Error creating payment:", error);
            throw new Error(error.response?.data?.Message || "Không thể tạo thanh toán");
        }
    },

    // Cập nhật thanh toán
    updatePayment: async (
        paymentId: number,
        data: CreatePaymentRequest
    ): Promise<BaseResponse<PaymentResponse>> => {
        try {
            const response = await axiosInstance.post(`/payment/update/${paymentId}`, data);
            return response.data;
        } catch (error: any) {
            console.error(`Error updating payment ${paymentId}:`, error);
            throw new Error(error.response?.data?.Message || "Không thể cập nhật thanh toán");
        }
    },

    // Lấy thông tin thanh toán theo ID
    getPaymentById: async (paymentId: number): Promise<BaseResponse<PaymentResponse>> => {
        try {
            const response = await axiosInstance.get(`/payment/${paymentId}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching payment ${paymentId}:`, error);
            throw new Error(error.response?.data?.Message || "Không thể lấy thông tin thanh toán");
        }
    },

    // Lấy danh sách tất cả thanh toán (phân trang)
    getAllPayments: async (
        data: GetAllPaymentRequest
    ): Promise<{ pageData: PaymentResponse[]; pageInfo: { totalItem: number } }> => {
        try {
            const response = await axiosInstance.post("/payment/getall", data);
            return {
                pageData: response.data.data.pageData || [],
                pageInfo: response.data.data.pageInfo || { totalItem: 0 },
            };
        } catch (error: any) {
            console.error("Error fetching all payments:", error);
            throw new Error(error.response?.data?.Message || "Không thể lấy danh sách thanh toán");
        }
    },
    // Lấy danh sách thanh toán theo trạng thái
    getPaymentsByStatus: async (
        status: string
    ): Promise<DynamicResponse<PaymentResponse>> => {
        try {
            const response = await axiosInstance.get(`/payment/status/${status}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching payments with status ${status}:`, error);
            throw new Error(error.response?.data?.Message || "Không thể lấy thanh toán theo trạng thái");
        }
    },
    getPaymentByTransactionId: async (transactionId: string) => {
        try {
            const response = await axiosInstance.get(`/payment/getbytransactionid/${transactionId}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching payment by transaction ID ${transactionId}:`, error);
            throw new Error(error.response?.data?.Message || "Không thể lấy thanh toán theo mã giao dịch");
        }
    },
};

export default paymentService;