/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseResponse<T = any> {
    Code: number;
    Success: boolean;
    Message: string | null;
    Data: T;
}

export interface OrderResponse {
    orderId: number;
    customerId: number;
    totalAmount: number;
    orderDate: string;
    status: string;
    isDeleted: boolean;
    orderDetails: OrderDetailResponse[];
}

export interface CreateOrderFromCartRequest {
    customerId: number;
    orderDetailIds: number[];
}

export interface OrderDetailResponse {
    orderDetailId: number;
    orderId: number;
    productId: number;
    productName: string | null;
    quantity: number;
    unitPrice: number;
}

export interface AddToCartRequest {
    customerId: number;
    products: ProductForOrder[];
}

export interface ProductForOrder {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface UpdateCartRequest {
    customerId: number;
    items: UpdateCartItem[];
}

export interface UpdateCartItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderRequest {
    customerId: number;
    totalAmount: number;
    status: string;
    products: ProductForOrder[];
}

export interface UpdateOrderRequest {
    customerId: number;
    products: ProductForOrder[];
    status?: string;
}

export interface GetAllOrderRequest {
    pageNum: number;
    pageSize: number;
}

export interface UpdateOrderDetailRequest {
    orderDetailId: number;
    quantity: number;
    price: number;
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