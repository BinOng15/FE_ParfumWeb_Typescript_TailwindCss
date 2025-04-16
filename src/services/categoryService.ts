/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  BaseResponse,
  CategoryResponse,
  CreateCategoryRequest,
  GetAllCategoryRequest,
} from "../components/models/Category";

const categoryService = {
  // Tạo danh mục mới
  createCategory: async (
    data: CreateCategoryRequest
  ): Promise<BaseResponse<CategoryResponse>> => {
    try {
      const response = await axiosInstance.post("/category/create", data, {
        headers: {
          "Content-Type": "application/json", // Đảm bảo khớp với backend
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Lấy tất cả danh mục (phân trang)
  getAllCategories: async (
    data: GetAllCategoryRequest
  ): Promise<{ pageData: CategoryResponse[]; pageInfo: { totalItem: number } }> => {
    try {
      const response = await axiosInstance.post("/category/search", data);
      return {
        pageData: response.data.data.pageData || [],
        pageInfo: response.data.data.pageInfo || { totalItem: 0 },
      };
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error;
    }
  },

  // Lấy danh mục theo ID
  getCategoryById: async (
    categoryId: number
  ): Promise<CategoryResponse> => {
    try {
      const response = await axiosInstance.get(`/category/getby/${categoryId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching category by ID ${categoryId}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục
  updateCategory: async (
    categoryId: number,
    data: CreateCategoryRequest
  ): Promise<BaseResponse<CategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<CategoryResponse>> =
        await axiosInstance.put(`/category/update/${categoryId}`, data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với backend
          },
        });
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${categoryId}:`, error);
      throw error;
    }
  },

  // Thay đổi trạng thái danh mục (xóa hoặc kích hoạt)
  deleteCategory: async (
    categoryId: number,
    status: boolean
  ): Promise<BaseResponse<CategoryResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<CategoryResponse>> =
        await axiosInstance.post(`/category/change-Status/${categoryId}`, {
          status,
        });
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      throw error;
    }
  },

  // Xóa danh mục hoàn toàn (nếu có)
  hardDeleteCategory: async (categoryId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/category/delete/${categoryId}`);
    } catch (error) {
      console.error(`Error hard deleting category ${categoryId}:`, error);
      throw error;
    }
  },
};

export default categoryService;
