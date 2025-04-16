/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/index.ts
export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  data: T;
}

export interface CategoryResponse {
  categoryId: number;
  name: string;
  description: string;
  status: boolean;
}

export interface CreateCategoryRequest {
  categoryId?: number; // Có thể không bắt buộc nếu backend tự tạo
  name: string;
  description: string;
  status: boolean;
}

export interface GetAllCategoryRequest {
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
    SearchInfo?: {
      keyWord?: string;
      role?: string | null;
      status?: boolean | null;
      is_Verify?: boolean | null;
      is_Delete?: boolean | null;
    };
  } | null;
}
