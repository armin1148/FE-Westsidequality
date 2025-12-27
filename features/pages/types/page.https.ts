import { PageEntity } from "./page.entity";

export interface GetPagesResponse {
  result: PageEntity[];
}

export interface GetPageByIdRequest {
  id: string;
}

export interface GetPageByIdResponse {
  result: PageEntity;
}

export interface GetPageBySlugRequest {
  slug: string;
}

export interface GetPageBySlugResponse {
  result: PageEntity;
}

export interface DeletePageRequest {
  id: string;
}

export interface DeletePageResponse {
  result: {
    id: string;
  };
}

export interface CreatePageRequest {
  title?: string;
  slug?: string;
  seo?: string;
}

export interface CreatePageResponse {
  result: PageEntity;
}

export interface UpdatePageRequest {
  id: string;
  title?: string;
  slug?: string;
  seo?: string;
}

export interface UpdatePageResponse {
  result: PageEntity;
}

export interface UpdateBlockOrderRequest {
  id: number;
  blocks: {
    id: number;
    blockOrder: number;
  }[];
}

export interface UpdateBlockOrderResponse {
  result: {
    id: number;
    blockOrder: number;
  };
}

export interface UpdateDefaultHomePageRequest {
  id: number;
}

export interface UpdateDefaultHomePageResponse {
  result: PageEntity;
}

export interface GetHomePageResponse {
  result: PageEntity;
}
