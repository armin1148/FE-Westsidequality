import { BlockEntity, BlockStatus } from "../common/block-entity";

export interface CreateBlockRequest {
  pageId?: number;
  templateId?: number;
  blockOrder?: number;
  blockTypeId?: number;
  status?: BlockStatus;
}

export interface CreateBlockResponse {
  result: BlockEntity;
}

export interface UpdateBlockRequest {
  id: number;
  pageId?: number;
  templateId?: number;
  status?: BlockStatus;
  blockOrder?: number;
  blockTypeId?: number;
}

export interface UpdateBlockResponse {
  result: BlockEntity;
}

export interface DeleteBlockRequest {
  id: number;
}

export interface DeleteBlockResponse {
  result: {
    id: number;
  };
}

export interface CreateBlockContentRequest {
  blockId: number;
  contentJson: string;
}

export interface CreateBlockContentResponse {
  result: {
    blockId: number;
    contentJson: string;
  };
}

export interface UpdateBlockContentRequest {
  id: number;
  blockId: number;
  contentJson: string;
}

export interface UpdateBlockContentResponse {
  result: {
    id: number;
    blockId: number;
    contentJson: string;
  };
}
