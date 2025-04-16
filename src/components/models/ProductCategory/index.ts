/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/index.ts
export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface ProductCategoryResponse {
  productId: number;
  categoryId: number;

  status: boolean;
}

export interface CreateProductCategoryRequest {
  productId: number;
  categoryId: number;
  status: boolean;
}

export interface UpdateProductCategoryRequest {
  productId: number;
  categoryId: number;
  Status: boolean;
}

export interface DeleteProductCategoryRequest {
  productId: number;
  categoryId: number;
}

export interface GetCategoriesByProductRequest {
  productId: number;
}

export interface GetProductsByCategoryRequest {
  categoryId: number;
}

export interface ListProductCategoryResponse {
  Items: ProductCategoryResponse[];
  TotalCount: number;
}
