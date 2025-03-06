/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/index.ts
export interface BaseResponse<T = any> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface AnswerResponse {
  Id: number;
  QuestionId: number;
  AnswerText: string;
  ResultId: number;
  Status: boolean;
}

export interface CreateAnswerRequest {
  QuestionId: number;
  AnswerText: string;
  ResultId: number;
  Status?: boolean; // Có thể không bắt buộc, mặc định true trong backend
}

export interface GetAllAnswerRequest {
  pageNum: number;
  pageSize: number;
  keyWord?: string;
  Status?: boolean;
}

export interface DynamicResponse<T> {
  Code: number;
  Success: boolean;
  Message: string | null;
  Data: {
    PageInfo: {
      Page: number;
      Size: number;
      Sort: string;
      Order: string;
      TotalPage: number;
      TotalItem: number;
    };
    SearchInfo: {
      keyWord?: string;
      role?: string | null;
      status?: boolean | null;
      is_Verify?: boolean | null;
      is_Delete?: boolean | null;
    };
    PageData: T[];
  } | null;
}
