import { api } from "@/lib/axios/api";
import {
  CreateBlockRequest,
  CreateBlockResponse,
  UpdateBlockRequest,
  UpdateBlockResponse,
  DeleteBlockRequest,
  DeleteBlockResponse,
} from "@/types/api/block";

export const blockService = {
  create: async (params: CreateBlockRequest) => {
    const response = await api.post<CreateBlockResponse>("/blocks", params);
    return response.result;
  },
  update: async (params: UpdateBlockRequest) => {
    const response = await api.patch<UpdateBlockResponse>(
      `/blocks/${params.id}`,
      params
    );
    return response.result;
  },
  delete: async (params: DeleteBlockRequest) => {
    const response = await api.delete<DeleteBlockResponse>(
      `/blocks/${params.id}`
    );
    return response;
  },
};
