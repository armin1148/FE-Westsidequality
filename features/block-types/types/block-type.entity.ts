import { BaseEntity } from "@/types";

export interface BlockTypeEntity extends BaseEntity {
  code?: string;
  name?: string;
  descriptions?: string;
}
