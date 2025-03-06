/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/index.ts
export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface ProductResponse {
  ProductId: number;
  Name: string;
  Brand: string;
  Price: number;
  Stock: number;
  Description: string;
  ImageUrl: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  IsDeleted: boolean;
}

export interface CreateProductRequest {
  Name: string;
  Brand: string;
  Price: number;
  Stock: number;
  Description: string;
  ImageUrl: string;
  CreatedAt?: Date; // Có thể không bắt buộc nếu backend tự tạo
  UpdatedAt?: Date; // Có thể không bắt buộc nếu backend tự tạo
  IsDeleted?: boolean; // Có thể không bắt buộc nếu backend tự tạo
}

export interface GetAllProductRequest {
  pageNum: number;
  pageSize: number;
  keyWord?: string;
  Status?: boolean;
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
