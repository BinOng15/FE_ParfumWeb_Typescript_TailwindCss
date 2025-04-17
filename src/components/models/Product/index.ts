/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/index.ts
export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface ProductResponse {
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

export interface CreateProductRequest {
  name: string;
  brand: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  createdAt?: Date; // Có thể không bắt buộc nếu backend tự tạo
  updatedAt?: Date; // Có thể không bắt buộc nếu backend tự tạo
  isDeleted?: boolean; // Có thể không bắt buộc nếu backend tự tạo
}

export interface GetAllProductRequest {
  pageNum: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
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
