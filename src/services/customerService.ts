/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangePasswordRequest,
  CustomerResponseData,
  GetAllCustomerRequest,
  RegisterRequest,
  UpdateRequest,
} from "../components/models/Customer";
import { axiosInstance } from "./axiosInstance";

const customerService = {
  registerCustomer: async (data: RegisterRequest): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer", data);
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi đăng ký khách hàng:", error);
      throw error;
    }
  },

  registerAdmin: async (email: string, password: string, name: string): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post(`/customer/admin?email=${email}&password=${password}&name=${name}`, {
        email,
        password,
        name,
      });
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi đăng ký admin:", error);
      throw error;
    }
  },

  registerStaff: async (email: string, password: string, name: string): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post(`/customer/staff?email=${email}&password=${password}&name=${name}`);
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi đăng ký nhân viên:", error);
      throw error;
    }
  },

  registerManager: async (email: string, password: string, name: string): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post(`/customer/manager?email=${email}&password=${password}&name=${name}`);
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi đăng ký quản lý:", error);
      throw error;
    }
  },

  registerWithGoogle: async (googleId: string): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer/email", {
        googleId,
      });
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi đăng ký bằng Google:", error);
      throw error;
    }
  },

  verifyAccount: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.put(`/customer/verify/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi xác minh tài khoản:", error);
      throw error;
    }
  },

  blockCustomer: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.put(`/customer/block/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi chặn khách hàng:", error);
      throw error;
    }
  },

  getCustomerById: async (id: number): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.get(`/customer/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin khách hàng theo ID ${id}:`, error);
      throw error;
    }
  },

  updateCustomer: async (id: number, data: UpdateRequest): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.put(`/customer/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật khách hàng ${id}:`, error);
      throw error;
    }
  },

  deleteCustomer: async (id: number, status: boolean): Promise<any> => {
    try {
      const response = await axiosInstance.post(`/customer/change-status/${id}?status=${status}`);
      return response.data.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa người dùng ${id}:`, error);
      throw error;
    }
  },

  changePassword: async (data: ChangePasswordRequest): Promise<any> => {
    try {
      const response = await axiosInstance.post("/customer/change-password", data);
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
      throw error;
    }
  },

  resendVerificationEmail: async (email: string): Promise<any> => {
    try {
      const response = await axiosInstance.post("customer/resend-verification", { email });
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi gửi lại email xác minh:", error);
      throw error;
    }
  },

  getAllCustomers: async (
    data: GetAllCustomerRequest
  ): Promise<{ pageData: CustomerResponseData[]; pageInfo: { totalItem: number } }> => {
    try {
      const response = await axiosInstance.post("customer/search", data);
      return {
        pageData: response.data.data.pageData || [],
        pageInfo: response.data.data.pageInfo || { totalItem: 0 },
      };
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
      throw error;
    }
  },
};

export default customerService;