import { BlockTemplateEntity } from "@/features/block-templates/types";
import { BaseEntity } from "@/types";
import { BlockStatus } from "@/types/common/block-entity";

export enum EnumPageIsDefault {
  NO = 0,
  YES = 1,
}

export interface PageBlockEntity extends BaseEntity {
  blockOrder?: number;
  status?: BlockStatus;
  content?: {
    contentJson?: string;
  };
  template?: BlockTemplateEntity;
}
export interface PageEntity extends BaseEntity {
  title?: string;
  slug?: string;
  seo?: string;
  blocks?: PageBlockEntity[];
  domain?: string;
  isDefault?: EnumPageIsDefault;
}
