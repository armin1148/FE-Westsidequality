import { BlockTemplateEntity } from "./block-template.entity";

export interface GetBlockTemplatesResponse {
  result: BlockTemplateEntity[];
}

export type CreateBlockTemplateRequest = BlockTemplateEntity;

export interface CreateBlockTemplateResponse {
  result: BlockTemplateEntity;
}

export interface DeleteBlockTemplateRequest {
  id: string;
}

export interface DeleteBlockTemplateResponse {
  result: {
    id: string;
  };
}

export type UpdateBlockTemplateRequest = BlockTemplateEntity;

export interface UpdateBlockTemplateResponse {
  result: BlockTemplateEntity;
}
