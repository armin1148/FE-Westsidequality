export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: any;
}
