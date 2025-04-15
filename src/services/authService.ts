/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, logout } from "./axiosInstance";

const authService = {
  userLogin: async (email: string, password: string): Promise<string> => {
    try {
      const response = await axiosInstance.post("/customer/login", {
        email,
        password,
      });
      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        return token;
      }
      throw new Error("Token không tìm thấy trong phản hồi!");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      throw error;
    }
  },
  loginByGoogle: async (googleId: string): Promise<string> => {
    try {
      const response = await axiosInstance.post("/customer/loginmail", { googleId });
      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        return token;
      }
      throw new Error("Token không tìm thấy trong phản hồi!");
    } catch (error) {
      console.error("Lỗi khi đăng nhập bằng Google:", error);
      throw error;
    }
  },
  logout,
  getCurrentUser: async (token: string): Promise<{
    customerId: number;
    email: string;
    roleName: string;
    name?: string;
    gender?: string;
    phone?: string;
    address?: string;
    createdAt?: string;
    modifiedDate?: string;
    status?: boolean;
    isDelete?: boolean;
    isVerify?: boolean;
  }> => {
    try {
      const response = await axiosInstance.get("/customer/current-customer", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const user = response.data.data; // Lấy response.data.data
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      throw new Error("Dữ liệu người dùng không tìm thấy trong phản hồi!");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      throw new Error("Không thể lấy dữ liệu người dùng!");
    }
  },
};

export default authService;