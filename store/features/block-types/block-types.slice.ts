import { BlockTypeEntity } from "@/features/block-types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOption } from "@/types";
import {
  createBlockType,
  deleteBlockType,
  fetchAllBlockTypes,
  updateBlockType,
} from "./block-types.thunks";
import { toast } from "sonner";

interface BlockTypesState {
  blockTypes: BlockTypeEntity[];
  loading: boolean;
  error: string | null;
  blockTypeOptions: IOption[];
  selectedBlockType: BlockTypeEntity | null;
}

const initialState: BlockTypesState = {
  blockTypes: [],
  loading: true,
  error: null,
  blockTypeOptions: [],
  selectedBlockType: null,
};

export const blockTypesSlice = createSlice({
  name: "blockTypes",
  initialState,
  reducers: {
    setBlockTypes: (state, action: PayloadAction<BlockTypeEntity[]>) => {
      state.blockTypes = action.payload;
    },
    setSelectedBlockType: (
      state,
      action: PayloadAction<BlockTypeEntity | null>
    ) => {
      state.selectedBlockType = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllBlockTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBlockTypes.fulfilled, (state, action) => {
      state.blockTypes = action.payload;
      state.blockTypeOptions = action.payload.map((b) => ({
        value: b.id,
        label: b.code,
      }));
      state.loading = false;
    });
    builder.addCase(fetchAllBlockTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch block types";
    });
    // DELETE
    builder.addCase(deleteBlockType.fulfilled, (state, action) => {
      state.blockTypes = state.blockTypes.filter(
        (b) => b.id !== action.payload.id
      );
      state.blockTypeOptions = state.blockTypeOptions.filter(
        (o) => o.value !== action.payload.id
      );
      toast.success("Block type deleted successfully");
    });
    builder.addCase(deleteBlockType.rejected, () => {
      toast.error("Failed to delete block type");
    });
    // CREATE
    builder.addCase(createBlockType.fulfilled, (state, action) => {
      state.blockTypes.push(action.payload);
      state.blockTypeOptions.push({
        value: action.payload.id,
        label: action.payload.code,
      });
      toast.success("Block type created successfully");
    });
    builder.addCase(createBlockType.rejected, () => {
      toast.error("Failed to create block type");
    });
    // UPDATE
    builder.addCase(updateBlockType.fulfilled, (state, action) => {
      const index = state.blockTypes.findIndex(
        (b) => b.id === action.payload.id
      );
      if (index !== -1) {
        state.blockTypes[index] = action.payload;
        state.blockTypeOptions[index] = {
          value: action.payload.id,
          label: action.payload.code,
        };
      }
      toast.success("Block type updated successfully");
    });
    builder.addCase(updateBlockType.rejected, () => {
      toast.error("Failed to update block type");
    });
  },
});

export const { setBlockTypes, setSelectedBlockType } = blockTypesSlice.actions;

export default blockTypesSlice.reducer;
