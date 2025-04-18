/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseResponse<T = any> {
    Code: number;
    Success: boolean;
    Message: string | null;
    Data: T;
}

export interface DynamicResponse<T> {
    Code: number;
    Success: boolean;
    Message: string | null;
    Data: {
        PageInfo: {
            Page: number;
            Size: number;
            Sort: string;
            Order: string;
            TotalPage: number;
            TotalItem: number;
        };
        PageData: T[];
    } | null;
}

// Request để tạo mã QR VietQR
export interface VietQrRequest {
    accountNo: string;
    accountName: string;
    acqId: string;
    amount: number;
    addInfo: string;
}

// Response từ API tạo mã QR VietQR
export interface VietQrResponse {
    success: boolean;
    qrBase64?: string;
    message?: string;
}

// Request để tạo hoặc cập nhật thanh toán
export interface CreatePaymentRequest {
    orderId: number;
    paymentMethod?: string; // Ví dụ: "banking", "cash"
}

// Response cho thông tin thanh toán
export interface PaymentResponse {
    paymentId: number;
    orderId: number;
    amount: number;
    paymentDate: string;
    status: string; // Ví dụ: "Pending", "Paid", "Failed"
    transactionId?: string;
    checkoutUrl?: string; // URL thanh toán từ PayOS
}

// Request để lấy danh sách thanh toán (phân trang)
export interface GetAllPaymentRequest {
    pageNum: number;
    pageSize: number;
    status?: string; // Lọc theo trạng thái (tùy chọn)
}