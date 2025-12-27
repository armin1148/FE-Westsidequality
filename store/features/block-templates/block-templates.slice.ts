import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOption } from "@/types";
import { BlockTemplateEntity } from "@/features/block-templates/types";
import {
  createBlockTemplate,
  fetchAllBlockTemplates,
  updateBlockTemplate,
  deleteBlockTemplate,
} from "./block-templates.thunks";
import { toast } from "sonner";

interface BlockTemplatesState {
  blockTemplates: BlockTemplateEntity[];
  blockTemplateOptions: IOption[];
  loading: boolean;
  error: string | null;
  selectedBlockTemplate: BlockTemplateEntity | null;
}

const initialState: BlockTemplatesState = {
  blockTemplates: [],
  blockTemplateOptions: [],
  loading: true,
  error: null,
  selectedBlockTemplate: null,
};

export const blockTemplatesSlice = createSlice({
  name: "blockTemplates",
  initialState,
  reducers: {
    setSelectedBlockTemplate: (
      state,
      action: PayloadAction<BlockTemplateEntity | null>
    ) => {
      state.selectedBlockTemplate = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllBlockTemplates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBlockTemplates.fulfilled, (state, action) => {
      state.blockTemplates = action.payload;
      state.blockTemplateOptions = action.payload.map((template) => ({
        value: template.id,
        label: template.name,
      }));
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchAllBlockTemplates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch block templates";
    });
    // DELETE
    builder.addCase(deleteBlockTemplate.fulfilled, (state, action) => {
      state.blockTemplates = state.blockTemplates.filter(
        (b) => b.id !== action.payload.id
      );
      state.blockTemplateOptions = state.blockTemplateOptions.filter(
        (o) => o.value !== action.payload.id
      );
      toast.success("Block template deleted successfully");
    });
    builder.addCase(deleteBlockTemplate.rejected, () => {
      toast.error("Failed to delete block template");
    });
    // CREATE
    builder.addCase(createBlockTemplate.fulfilled, (state, action) => {
      state.blockTemplates.push(action.payload);
      state.blockTemplateOptions.push({
        value: action.payload.id,
        label: action.payload.name,
      });
      toast.success("Block template created successfully");
    });
    builder.addCase(createBlockTemplate.rejected, () => {
      toast.error("Failed to create block template");
    });
    // UPDATE
    builder.addCase(updateBlockTemplate.fulfilled, (state, action) => {
      const index = state.blockTemplates.findIndex(
        (b) => b.id === action.payload.id
      );
      if (index !== -1) {
        state.blockTemplates[index] = action.payload;
        state.blockTemplateOptions[index] = {
          value: action.payload.id,
          label: action.payload.name,
        };
      }
      toast.success("Block template updated successfully");
    });
    builder.addCase(updateBlockTemplate.rejected, () => {
      toast.error("Failed to update block template");
    });
  },
});

export const { setSelectedBlockTemplate } = blockTemplatesSlice.actions;

export default blockTemplatesSlice.reducer;
