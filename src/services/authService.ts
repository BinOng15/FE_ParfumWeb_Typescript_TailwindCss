// /* eslint-disable @typescript-eslint/no-explicit-any */
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
        sessionStorage.setItem("token", token);
        return token;
      }
      throw new Error("Token not found in response!");
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },
  loginByGoogle: async (GooleId: string): Promise<string> => {
    try {
      const response = await axiosInstance.post("customer/loginmail", GooleId);
      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;
      if (token) {
        sessionStorage.setItem("token", token);
        return token;
      }
      throw new Error("Token not found in response!");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  },
  logout,
  getCurrentUser: async (token: string) => {
    try {
      const response = await axiosInstance.get("/customer/current-customer", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const user = response.data;
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      throw new Error("Token not found in response!");
    } catch (error) {
      throw new Error("Cannot get user data!");
    }
  },
};
export default authService;
