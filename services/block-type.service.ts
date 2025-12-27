import {
  CreateBlockTypeRequest,
  CreateBlockTypeResponse,
  DeleteBlockTypeRequest,
  DeleteBlockTypeResponse,
  GetBlockTypesResponse,
  UpdateBlockTypeRequest,
  UpdateBlockTypeResponse,
} from "@/features/block-types/types";
import { api } from "@/lib/axios/api";

export const blockTypeService = {
  getAll: async () => {
    const response = await api.get<GetBlockTypesResponse>("/blockTypes");
    return response.result;
  },
  deleteById: async (params: DeleteBlockTypeRequest) => {
    const response = await api.delete<DeleteBlockTypeResponse>(
      `/blockTypes/${params.id}`
    );
    return response.result;
  },
  create: async (params: CreateBlockTypeRequest) => {
    const response = await api.post<CreateBlockTypeResponse>(
      "/blockTypes",
      params
    );
    return response.result;
  },
  update: async (params: UpdateBlockTypeRequest) => {
    const { id, ...body } = params;
    const response = await api.patch<UpdateBlockTypeResponse>(
      `/blockTypes/${id}`,
      body
    );
    return response.result;
  },
};
