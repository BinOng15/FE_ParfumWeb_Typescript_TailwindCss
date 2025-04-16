/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  BaseResponse,
  CreateProductRequest,
  GetAllProductRequest,
  ProductResponse,
} from "../components/models/Product";

const productService = {
  // Tạo sản phẩm mới
  createProduct: async (
    data: CreateProductRequest
  ): Promise<BaseResponse<ProductResponse>> => {
    try {
      // Chuyển dữ liệu thành FormData
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Brand", data.brand);
      formData.append("Price", data.price.toString());
      formData.append("Stock", data.stock.toString());
      formData.append("Description", data.description);
      formData.append("ImageUrl", data.imageUrl);
      if (data.createdAt) {
        // Chuyển Date thành chuỗi định dạng MM/DD/YYYY
        const createdAtStr = data.createdAt.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        });
        formData.append("CreatedAt", createdAtStr);
      }
      if (data.updatedAt) {
        // Chuyển Date thành chuỗi định dạng MM/DD/YYYY
        const updatedAtStr = data.updatedAt.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        });
        formData.append("UpdatedAt", updatedAtStr);
      }
      formData.append("IsDeleted", (data.isDeleted ?? false).toString());

      const response = await axiosInstance.post("/product/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Đúng với yêu cầu của API
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
  ): Promise<{ pageData: ProductResponse[]; pageInfo: { totalItem: number } }> => {
    try {
      const response = await axiosInstance.post("product/getallproduct", data);
      return {
        pageData: response.data.data.pageData || [],
        pageInfo: response.data.data.pageInfo || { totalItem: 0 },
      };
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  // Lấy sản phẩm theo ID
  getProductById: async (
    productId: number
  ): Promise<ProductResponse> => {
    try {
      const response = await axiosInstance.get(`/product/getproductbyid?id=${productId}`);
      return response.data.data; // Trả về dữ liệu sản phẩm
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
