/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseResponse,
  ChangePasswordRequest,
  CustomerResponseData,
  GetAllCustomerRequest,
  RegisterRequest,
  UpdateRequest,
} from "../components/models/Customer";
import { axiosInstance } from "./axiosInstance";

const customerService = {
  registerCustomer: async (
    data: RegisterRequest
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer", data);
      return response.data;
    } catch (error) {
      console.error("Error registering customer:", error);
      throw error;
    }
  },
  registerAdmin: async (
    email: string,
    password: string,
    name: string
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer/admin", {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering customer:", error);
      throw error;
    }
  },
  registerStaff: async (
    email: string,
    password: string,
    name: string
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer/staff", {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering customer:", error);
      throw error;
    }
  },
  registerManager: async (
    email: string,
    password: string,
    name: string
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer/manager", {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering customer:", error);
      throw error;
    }
  },
  registerWithGoogle: async (
    googleId: string
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("/customer/email", {
        googleId,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering with email:", error);
      throw error;
    }
  },
  verifyAccount: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.put(`/customer/verify/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error verifying account:", error);
      throw error;
    }
  },
  blockCustomer: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.put(`/customer/block/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error blocking customer:", error);
      throw error;
    }
  },
  getCustomerById: async (id: number): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.get(`/customer/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer by ID ${id}:`, error);
      throw error;
    }
  },
  updateCustomer: async (
    id: number,
    data: UpdateRequest
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.put(`/customer/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating customer ${id}:`, error);
      throw error;
    }
  },
  deleteCustomer: async (id: number, status: boolean): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        `/customer/change-status/${id}`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      console.error(`Error deleting customer ${id}:`, error);
      return {
        Code: 500,
        Success: false,
        Message: error.response?.data?.Message || "Server Error",
        Data: null,
      } as BaseResponse<any>;
    }
  },
  changePassword: async (data: ChangePasswordRequest): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        "/customer/change-password",
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error changing password:", error);
      return {
        Code: 500,
        Success: false,
        Message: error.response?.data?.Message || "Server Error",
        Data: null,
      } as BaseResponse<any>;
    }
  },
  resendVerificationEmail: async (email: string): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        "customer/resend-verification",
        { email }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error resending verification email:", error);
      return {
        Code: 500,
        Success: false,
        Message: error.response?.data?.Message || "Server Error",
        Data: null,
      } as BaseResponse<any>;
    }
  },
  getAllCustomers: async (
    data: GetAllCustomerRequest
  ): Promise<CustomerResponseData> => {
    try {
      const response = await axiosInstance.post("customer/search", data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching all customers:", error);
      throw error;
    }
  },
};
export default customerService;
