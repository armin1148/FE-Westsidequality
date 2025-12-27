import axios, { AxiosError } from "axios";
import type { ApiError } from "@/types";

export const axiosBase = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/wq`,
  timeout: 15000,
  withCredentials: true,
});

axiosBase.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosBase.interceptors.response.use(
  (res) => res,
  (error: AxiosError): Promise<ApiError> =>
    Promise.reject({
      success: false,
      message:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error.response?.data as any)?.message ||
        error.message ||
        "Unknown error",
      statusCode: error.response?.status || 500,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errors: (error.response?.data as any)?.errors,
    })
);
