import { BlockTypeEntity } from "./block-type.entity";

export interface GetBlockTypesResponse {
  result: BlockTypeEntity[];
}

export type CreateBlockTypeRequest = BlockTypeEntity;

export interface CreateBlockTypeResponse {
  result: BlockTypeEntity;
}

export interface DeleteBlockTypeRequest {
  id: string;
}

export interface DeleteBlockTypeResponse {
  result: {
    id: string;
  };
}

export type UpdateBlockTypeRequest = BlockTypeEntity;

export interface UpdateBlockTypeResponse {
  result: BlockTypeEntity;
}
