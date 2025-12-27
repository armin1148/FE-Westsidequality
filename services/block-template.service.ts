import { api } from "@/lib/axios/api";
import {
  GetBlockTemplatesResponse,
  DeleteBlockTemplateRequest,
  CreateBlockTemplateRequest,
  DeleteBlockTemplateResponse,
  CreateBlockTemplateResponse,
  UpdateBlockTemplateRequest,
  UpdateBlockTemplateResponse,
} from "@/features/block-templates/types";

export const blockTemplateService = {
  getAll: async () => {
    const response =
      await api.get<GetBlockTemplatesResponse>("/blockTemplates");
    return response.result;
  },
  deleteById: async (params: DeleteBlockTemplateRequest) => {
    const response = await api.delete<DeleteBlockTemplateResponse>(
      `/blockTemplates/${params.id}`
    );
    return response.result;
  },
  create: async (params: CreateBlockTemplateRequest) => {
    const response = await api.post<CreateBlockTemplateResponse>(
      "/blockTemplates",
      params
    );
    return response.result;
  },
  update: async (params: UpdateBlockTemplateRequest) => {
    const { id, ...body } = params;
    const response = await api.patch<UpdateBlockTemplateResponse>(
      `/blockTemplates/${id}`,
      body
    );
    return response.result;
  },
};
