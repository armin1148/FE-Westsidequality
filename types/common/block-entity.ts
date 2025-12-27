import { BaseEntity } from "./base-entity";

export interface BlockEntity extends BaseEntity {
  pageId: number;
  templateId: number;
  blockOrder: number;
  blockTypeId: number;
}

export enum BlockStatus {
  HIDDEN = 0,
  ACTIVE = 1,
}
