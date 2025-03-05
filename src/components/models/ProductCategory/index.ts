/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/index.ts
export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface ProductCategoryResponse {
  ProductId: number;
  CategoryId: number;
  Status: boolean;
}

export interface CreateProductCategoryRequest {
  ProductId: number;
  CategoryId: number;
  Status: boolean;
}

export interface UpdateProductCategoryRequest {
  ProductId: number;
  CategoryId: number;
  Status: boolean;
}

export interface DeleteProductCategoryRequest {
  ProductId: number;
  CategoryId: number;
}

export interface GetCategoriesByProductRequest {
  ProductId: number;
}

export interface GetProductsByCategoryRequest {
  CategoryId: number;
}

export interface ListProductCategoryResponse {
  Items: ProductCategoryResponse[];
  TotalCount: number;
}
