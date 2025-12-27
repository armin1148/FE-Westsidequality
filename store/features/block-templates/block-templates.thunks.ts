import {
  CreateBlockTemplateRequest,
  DeleteBlockTemplateRequest,
  UpdateBlockTemplateRequest,
} from "@/features/block-templates/types";
import { blockTemplateService } from "@/services/block-template.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET ALL
export const fetchAllBlockTemplates = createAsyncThunk(
  "blockTemplates/fetchAll",
  async () => await blockTemplateService.getAll()
);

// DELETE ONE
export const deleteBlockTemplate = createAsyncThunk(
  "blockTemplates/delete",
  async (params: DeleteBlockTemplateRequest) =>
    await blockTemplateService.deleteById(params)
);

// CREATE ONE
export const createBlockTemplate = createAsyncThunk(
  "blockTemplates/create",
  async (params: CreateBlockTemplateRequest) =>
    await blockTemplateService.create(params)
);

// UPDATE ONE
export const updateBlockTemplate = createAsyncThunk(
  "blockTemplates/update",
  async (params: UpdateBlockTemplateRequest) =>
    await blockTemplateService.update(params)
);
