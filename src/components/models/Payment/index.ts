/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseResponse<T = any> {
    Code: number;
    Success: boolean;
    Message: string | null;
    Data: T;
}

export interface DynamicResponse<T> {
    code: number;
    success: boolean;
    message: string | null;
    data: {
        pageInfo: {
            page: number;
            size: number;
            sort: string;
            order: string;
            totalPage: number;
            totalItem: number;
        };
        pageData: T[];
    } | null;
}

export interface VietQrRequest {
    accountNo: string;
    accountName: string;
    acqId: string;
    amount: number;
    addInfo: string;
}

export interface VietQrResponse {
    success: boolean;
    qrBase64?: string;
    message?: string;
}

export interface CreatePaymentRequest {
    orderId: number;
    paymentMethod?: string;
}

export interface PaymentResponse {
    paymentId: number;
    orderId: number;
    customerId: number; // Thêm
    amount: number;
    status: string;
    isDeleted: boolean; // Thêm
    transactionId?: string;
    paymentMethod: string; // Thêm
    paymentDate: string;
    checkoutUrl?: string | null;
}

export interface GetAllPaymentRequest {
    pageNum: number;
    pageSize: number;
    keyword?: string;
    status?: string;
}