/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthContextType = {
  user: Customer | null;
  login: (email: string, password: string) => Promise<void>;
  setUser: (user: Customer) => void;
  getRole: () => string | null;
};

export interface BaseResponse<T = any> {
  code: number;
  success: boolean;
  message: string | null;
  data: T;
}

export interface Customer {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
  roleName: string | null;
  createdAt: string;
  modifiedDate: string | null;
  status: boolean;
  isDelete: boolean;
  isVerify: boolean;
}

export interface CustomerResponseData {
  customerId: number;
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
  roleName: string | null;
  createdAt: string;
  modifiedDate: string;
  status: boolean;
  isDelete: boolean;
  isVerify: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  gender: string;
  phone: string;
  address: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  customer: CustomerResponseData;
}

export interface UpdateRequest {
  name?: string;
  gender?: string;
  phone?: string;
  address?: string;
  password?: string;
}

export interface GetAllCustomerRequest {
  pageNum: number;
  pageSize: number;
  keyWord: string;
  role: string;
  status: boolean;
  is_Verify: boolean;
  is_Delete: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}