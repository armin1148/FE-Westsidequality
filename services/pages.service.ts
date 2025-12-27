import {
  DeletePageRequest,
  DeletePageResponse,
  GetPagesResponse,
  CreatePageRequest,
  CreatePageResponse,
  GetPageByIdResponse,
  GetPageByIdRequest,
  UpdatePageResponse,
  UpdatePageRequest,
  UpdateBlockOrderResponse,
  UpdateBlockOrderRequest,
  GetPageBySlugRequest,
  GetPageBySlugResponse,
  UpdateDefaultHomePageRequest,
  UpdateDefaultHomePageResponse,
  GetHomePageResponse,
} from "@/features/pages/types/page.https";
import { api } from "@/lib/axios/api";

export const pageService = {
  getAll: async () => {
    const response = await api.get<GetPagesResponse>("/pages");
    return response.result;
  },
  getById: async (params: GetPageByIdRequest) => {
    const response = await api.get<GetPageByIdResponse>(`/pages/${params.id}`);
    return response.result;
  },
  getBySlug: async (params: GetPageBySlugRequest) => {
    const response = await api.get<GetPageBySlugResponse>(
      `/pages/slug/${params.slug}`
    );
    return response.result;
  },
  deleteById: async (params: DeletePageRequest) => {
    const response = await api.delete<DeletePageResponse>(
      `/pages/${params.id}`
    );
    return response.result;
  },
  create: async (params: CreatePageRequest) => {
    const response = await api.post<CreatePageResponse>("/pages", params);
    return response.result;
  },
  update: async (params: UpdatePageRequest) => {
    const response = await api.patch<UpdatePageResponse>(
      `/pages/${params.id}`,
      params
    );
    return response.result;
  },
  updateBlockOrder: async (params: UpdateBlockOrderRequest) => {
    const response = await api.post<UpdateBlockOrderResponse>(
      `/pages/${params.id}/orderBlocks`,
      params
    );
    return response.result;
  },
  updateDefaultHomePage: async (params: UpdateDefaultHomePageRequest) => {
    const response = await api.post<UpdateDefaultHomePageResponse>(
      `/pages/default/${params.id}`
    );
    return response.result;
  },
  getHomePage: async () => {
    const response = await api.get<GetHomePageResponse>("/pages/default");
    return response.result;
  },
};
