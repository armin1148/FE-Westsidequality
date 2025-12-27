import {
  CreateBlockTypeRequest,
  DeleteBlockTypeRequest,
  UpdateBlockTypeRequest,
} from "@/features/block-types/types";
import { blockTypeService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET ALL
export const fetchAllBlockTypes = createAsyncThunk(
  "blockTypes/fetchAll",
  async () => await blockTypeService.getAll()
);

// DELETE ONE
export const deleteBlockType = createAsyncThunk(
  "blockTypes/delete",
  async (params: DeleteBlockTypeRequest) =>
    await blockTypeService.deleteById(params)
);

// CREATE ONE
export const createBlockType = createAsyncThunk(
  "blockTypes/create",
  async (params: CreateBlockTypeRequest) =>
    await blockTypeService.create(params)
);

// UPDATE ONE
export const updateBlockType = createAsyncThunk(
  "blockTypes/update",
  async (params: UpdateBlockTypeRequest) =>
    await blockTypeService.update(params)
);
