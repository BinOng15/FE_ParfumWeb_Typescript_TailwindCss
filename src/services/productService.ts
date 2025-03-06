/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  BaseResponse,
  CreateProductRequest,
  DynamicResponse,
  GetAllProductRequest,
  ProductResponse,
} from "../components/models/Product";

const productService = {
  // Tạo sản phẩm mới
  createProduct: async (
    data: CreateProductRequest
  ): Promise<BaseResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductResponse>> =
        await axiosInstance.post("/product/createproduct", data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với [FromForm] nếu cần upload file
          },
        });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Lấy tất cả sản phẩm (phân trang)
  getAllProducts: async (
    data: GetAllProductRequest
  ): Promise<DynamicResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<DynamicResponse<ProductResponse>> =
        await axiosInstance.post("/product/getallproduct", data);
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  // Lấy sản phẩm theo ID
  getProductById: async (
    productId: number
  ): Promise<BaseResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductResponse>> =
        await axiosInstance.get(`/product/getproductbyid?id=${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product by ID ${productId}:`, error);
      throw error;
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (
    productId: number,
    data: CreateProductRequest
  ): Promise<BaseResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductResponse>> =
        await axiosInstance.put(`/product/update?id=${productId}`, data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
          },
        });
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  },

  // Xóa sản phẩm (thay đổi trạng thái)
  deleteProduct: async (
    productId: number,
    status: boolean
  ): Promise<BaseResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<ProductResponse>> =
        await axiosInstance.post(`/product/change-status/${productId}`, {
          status,
        });
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      throw error;
    }
  },

  // Xóa sản phẩm hoàn toàn (nếu có)
  hardDeleteProduct: async (productId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/product/${productId}`);
    } catch (error) {
      console.error(`Error hard deleting product ${productId}:`, error);
      throw error;
    }
  },
};

export default productService;
