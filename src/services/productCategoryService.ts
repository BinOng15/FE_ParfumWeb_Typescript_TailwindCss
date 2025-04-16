/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  BaseResponse,
  CreateProductCategoryRequest,
  DeleteProductCategoryRequest,
  GetCategoriesByProductRequest,
  GetProductsByCategoryRequest,
  ListProductCategoryResponse,
  ProductCategoryResponse,
  UpdateProductCategoryRequest,
} from "../components/models/ProductCategory";

const productCategoryService = {
  // Tạo mối quan hệ sản phẩm-danh mục
  createProductCategory: async (
    data: CreateProductCategoryRequest
  ): Promise<BaseResponse<ProductCategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductCategoryResponse>> =
        await axiosInstance.post("/productcategory/create", data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
          },
        });
      return response.data;
    } catch (error) {
      console.error("Error creating product category:", error);
      throw error;
    }
  },

  // Cập nhật mối quan hệ sản phẩm-danh mục
  updateProductCategory: async (
    data: UpdateProductCategoryRequest
  ): Promise<BaseResponse<ProductCategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductCategoryResponse>> =
        await axiosInstance.put("/productcategory/update", data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
          },
        });
      return response.data;
    } catch (error) {
      console.error("Error updating product category:", error);
      throw error;
    }
  },

  // Xóa mối quan hệ sản phẩm-danh mục
  deleteProductCategory: async (
    data: DeleteProductCategoryRequest
  ): Promise<BaseResponse<boolean>> => {
    try {
      const response: AxiosResponse<BaseResponse<boolean>> =
        await axiosInstance.post("/productcategory/delete", data);
      return response.data;
    } catch (error) {
      console.error("Error deleting product category:", error);
      throw error;
    }
  },

  // Lấy thông tin mối quan hệ sản phẩm-danh mục theo ProductId và CategoryId
  getProductCategory: async (
    productId: number,
    categoryId: number
  ): Promise<BaseResponse<ProductCategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductCategoryResponse>> =
        await axiosInstance.get(
          `/productcategory/getproductcategory/${productId}/${categoryId}`
        );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching product category ${productId}/${categoryId}:`,
        error
      );
      throw error;
    }
  },

  // Lấy danh sách danh mục theo ProductId
  getCategoriesByProductId: async (
    data: GetCategoriesByProductRequest
  ): Promise<BaseResponse<ListProductCategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ListProductCategoryResponse>> =
        await axiosInstance.post(
          `/productcategory/searchbyproductid/${data.productId}`
        );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching categories by product ID ${data.productId}:`,
        error
      );
      throw error;
    }
  },

  // Lấy danh sách sản phẩm theo CategoryId
  getProductsByCategoryId: async (
    data: GetProductsByCategoryRequest
  ): Promise<BaseResponse<ListProductCategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ListProductCategoryResponse>> =
        await axiosInstance.post(
          `/productcategory/searchbycategoryid/${data.categoryId}`
        );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching products by category ID ${data.categoryId}:`,
        error
      );
      throw error;
    }
  },
};

export default productCategoryService;
