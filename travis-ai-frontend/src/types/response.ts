export interface SuccessResponse<T> {
  message: string;
  user: T;
  token: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error: string;
}
