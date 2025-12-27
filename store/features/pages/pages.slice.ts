import { EnumPageIsDefault, PageEntity } from "@/features/pages/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createPage,
  deletePage,
  fetchAllPages,
  fetchHomePage,
  fetchPageById,
  fetchPageBySlug,
  updatePage,
} from "./pages.thunks";
import { toast } from "sonner";

interface PagesState {
  pages: PageEntity[];
  loading: boolean;
  loadingDetail: boolean;
  errorDetail: string | null;
  error: string | null;
  selectedPage: PageEntity | null;
  homePageId: string | null;
}

const initialState: PagesState = {
  pages: [],
  loading: true,
  loadingDetail: true,
  errorDetail: null,
  error: null,
  selectedPage: null,
  homePageId: null,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPages.fulfilled, (state, action) => {
      state.pages = action.payload;
      state.loading = false;
      state.homePageId =
        String(
          action.payload.find((p) => p.isDefault === EnumPageIsDefault.YES)?.id
        ) || null;
    });
    builder.addCase(fetchAllPages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch pages";
    });
    // DELETE
    builder.addCase(deletePage.fulfilled, (state, action) => {
      state.pages = state.pages.filter((p) => p.id !== action.payload.id);
      toast.success("Page deleted successfully");
    });
    builder.addCase(deletePage.rejected, () => {
      toast.error("Failed to delete page");
    });
    // CREATE
    builder.addCase(createPage.fulfilled, (state, action) => {
      state.pages.push(action.payload);
      toast.success("Page created successfully");
    });
    // GET BY ID
    builder.addCase(fetchPageById.pending, (state) => {
      state.loadingDetail = true;
    });
    builder.addCase(fetchPageById.fulfilled, (state, action) => {
      state.selectedPage = action.payload;
      state.loadingDetail = false;
    });
    builder.addCase(fetchPageById.rejected, (state, action) => {
      state.loadingDetail = false;
      state.errorDetail = action.error.message || "Failed to fetch page";
    });
    // GET BY SLUG
    builder.addCase(fetchPageBySlug.pending, (state) => {
      state.loadingDetail = true;
    });
    builder.addCase(fetchPageBySlug.fulfilled, (state, action) => {
      state.selectedPage = action.payload;
      state.loadingDetail = false;
    });
    builder.addCase(fetchPageBySlug.rejected, (state, action) => {
      state.loadingDetail = false;
      state.errorDetail = action.error.message || "Failed to fetch page";
    });
    // UPDATE
    builder.addCase(updatePage.fulfilled, (state, action) => {
      const index = state.pages.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.pages[index] = action.payload;
      }
      toast.success("Page updated successfully");
    });
    // GET HOME PAGE
    builder.addCase(fetchHomePage.fulfilled, (state, action) => {
      state.selectedPage = action.payload;
    });
  },
});

export default pagesSlice.reducer;
