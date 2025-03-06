/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  CreateAnswerRequest,
  AnswerResponse,
  GetAllAnswerRequest,
} from "../components/models/Answer";
import { BaseResponse } from "../components/models/Customer";
import { DynamicResponse } from "../components/models/Product";

const answerService = {
  // Tạo câu trả lời mới
  createAnswer: async (
    data: CreateAnswerRequest
  ): Promise<BaseResponse<AnswerResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<AnswerResponse>> =
        await axiosInstance.post("/answer", data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
          },
        });
      return response.data;
    } catch (error) {
      console.error("Error creating answer:", error);
      throw error;
    }
  },

  // Lấy tất cả câu trả lời (phân trang)
  getAllAnswers: async (
    data: GetAllAnswerRequest
  ): Promise<DynamicResponse<AnswerResponse>> => {
    try {
      const response: AxiosResponse<DynamicResponse<AnswerResponse>> =
        await axiosInstance.post("/answer/search", data);
      return response.data;
    } catch (error) {
      console.error("Error fetching all answers:", error);
      throw error;
    }
  },

  // Lấy câu trả lời theo ID
  getAnswerById: async (
    answerId: number
  ): Promise<BaseResponse<AnswerResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<AnswerResponse>> =
        await axiosInstance.get(`API/Answer/${answerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching answer by ID ${answerId}:`, error);
      throw error;
    }
  },

  // Cập nhật câu trả lời
  updateAnswer: async (
    answerId: number,
    data: CreateAnswerRequest
  ): Promise<BaseResponse<AnswerResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<AnswerResponse>> =
        await axiosInstance.put(
          `/answer?id=${answerId}`, // Giả định endpoint không có path parameter trong PUT
          data,
          {
            headers: {
              "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
            },
          }
        );
      return response.data;
    } catch (error) {
      console.error(`Error updating answer ${answerId}:`, error);
      throw error;
    }
  },

  // Thay đổi trạng thái câu trả lời (xóa hoặc kích hoạt)
  deleteAnswer: async (
    answerId: number,
    status: boolean
  ): Promise<BaseResponse<AnswerResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<AnswerResponse>> =
        await axiosInstance.post(`/answer/change-status/${answerId}`, {
          status,
        });
      return response.data;
    } catch (error) {
      console.error(`Error deleting answer ${answerId}:`, error);
      throw error;
    }
  },

  // Xóa câu trả lời hoàn toàn (nếu có)
  hardDeleteAnswer: async (answerId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/answer/${answerId}`);
    } catch (error) {
      console.error(`Error hard deleting answer ${answerId}:`, error);
      throw error;
    }
  },
};

export default answerService;
