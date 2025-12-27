import { BaseEntity } from "@/types";

export interface BlockTemplateEntity extends BaseEntity {
  blockTypeId?: string;
  blockTypeCode?: string;
  name?: string;
  descriptions?: string;
  schemaJson?: string;
  css?: string;
  previewThumbnail?: string;
}
