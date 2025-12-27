import { axiosBase } from "./base";
import type { ApiResponse } from "@/types";

export const api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T>(url: string, config?: any) {
    return axiosBase
      .get<T, ApiResponse<T>>(url, config)
      .then((res) => res.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(url: string, data?: any, config?: any) {
    return axiosBase
      .post<T, ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postForm<T>(url: string, data?: any, config?: any) {
    return axiosBase
      .post<T, ApiResponse<T>>(url, data, {
        ...config,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T>(url: string, data?: any, config?: any) {
    return axiosBase
      .put<T, ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch<T>(url: string, data?: any, config?: any) {
    return axiosBase
      .patch<T, ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T>(url: string, config?: any) {
    return axiosBase
      .delete<T, ApiResponse<T>>(url, config)
      .then((res) => res.data);
  },
};
