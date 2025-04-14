/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  BaseResponse,
  CreateQuestionRequest,
  DynamicResponse,
  GetAllQuestionRequest,
  QuestionResponse,
} from "../components/models/Question";

const questionService = {
  // Tạo câu hỏi mới
  createQuestion: async (
    data: CreateQuestionRequest
  ): Promise<BaseResponse<QuestionResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<QuestionResponse>> =
        await axiosInstance.post("/question", data, {
          headers: {
            "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
          },
        });
      return response.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  },

  // Lấy tất cả câu hỏi (phân trang)
  getAllQuestions: async (
    data: GetAllQuestionRequest
  ): Promise<DynamicResponse<QuestionResponse>> => {
    try {
      const response: AxiosResponse<DynamicResponse<QuestionResponse>> =
        await axiosInstance.post("/question/search", data);
      return response.data;
    } catch (error) {
      console.error("Error fetching all questions:", error);
      throw error;
    }
  },

  // Lấy câu hỏi theo ID
  getQuestionById: async (
    questionId: number
  ): Promise<BaseResponse<QuestionResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<QuestionResponse>> =
        await axiosInstance.get(`/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching question by ID ${questionId}:`, error);
      throw error;
    }
  },

  // Cập nhật câu hỏi
  updateQuestion: async (
    questionId: number,
    data: CreateQuestionRequest
  ): Promise<BaseResponse<QuestionResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<QuestionResponse>> =
        await axiosInstance.put(
          `/question?id=${questionId}`, // Giả định endpoint không có path parameter trong PUT
          data,
          {
            headers: {
              "Content-Type": "application/json", // Đảm bảo khớp với [FromBody]
            },
          }
        );
      return response.data;
    } catch (error) {
      console.error(`Error updating question ${questionId}:`, error);
      throw error;
    }
  },

  // Thay đổi trạng thái câu hỏi (xóa hoặc kích hoạt)
  deleteQuestion: async (
    questionId: number,
    status: boolean
  ): Promise<BaseResponse<QuestionResponse>> => {
    try {
      const response: AxiosResponse<BaseResponse<QuestionResponse>> =
        await axiosInstance.post(`/question/change-status/${questionId}`, {
          status,
        });
      return response.data;
    } catch (error) {
      console.error(`Error deleting question ${questionId}:`, error);
      throw error;
    }
  },

  // Xóa câu hỏi hoàn toàn (nếu có)
  hardDeleteQuestion: async (questionId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/question/${questionId}`);
    } catch (error) {
      console.error(`Error hard deleting question ${questionId}:`, error);
      throw error;
    }
  },
};

export default questionService;
