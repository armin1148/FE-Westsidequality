import { api } from "@/lib/axios/api";
import {
  CreateBlockContentRequest,
  CreateBlockContentResponse,
  UpdateBlockContentRequest,
  UpdateBlockContentResponse,
} from "@/types/api/block";

export const blockContentService = {
  create: async (params: CreateBlockContentRequest) => {
    const response = await api.post<CreateBlockContentResponse>(
      "/blockContents",
      params
    );
    return response.result;
  },
  update: async (params: UpdateBlockContentRequest) => {
    const response = await api.put<UpdateBlockContentResponse>(
      "/blockContents",
      params
    );
    return response.result;
  },
};
