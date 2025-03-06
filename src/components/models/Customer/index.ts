/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthContextType = {
  user: Customer | null;
  login: (email: string, password: string) => Promise<void>;
  setUser: (user: Customer) => void;
  getRole: () => string | null;
};

export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface Customer {
  Name: string;
  Email: string;
  Password: string;
  Gender: string;
  Phone: string;
  Address: string;
  RoleName: string | null;
  CreatedAt: string;
  ModifiedDate: string | null;
  Status: boolean;
  IsDelete: boolean;
  IsVerify: boolean;
}

export interface CustomerResponseData {
  CustomerId: number;
  Name: string;
  Email: string;
  Password: string;
  Gender: string;
  Phone: string;
  Address: string;
  RoleName: string | null;
  CreatedAt: string;
  ModifiedDate: string;
  Status: boolean;
  IsDelete: boolean;
  IsVerify: boolean;
}

export interface RegisterRequest {
  Email: string;
  Password: string;
  Name: string;
  Gender: string;
  Phone: string;
  Address: string;
}

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
  customer: CustomerResponseData;
}

export interface UpdateRequest {
  Name?: string;
  Gender?: string;
  Phone?: string;
  Address?: string;
  Password?: string;
}

export interface GetAllCustomerRequest {
  PageNumber: number;
  PageSize: number;
  SearchTerm?: string;
  Status?: boolean;
}

export interface ChangePasswordRequest {
  CurrentPassword: string;
  NewPassword: string;
}
