import { createAsyncThunk } from "@reduxjs/toolkit";
import { pageService } from "@/services";
import {
  CreatePageRequest,
  DeletePageRequest,
  GetPageByIdRequest,
  GetPageBySlugRequest,
  UpdatePageRequest,
} from "@/features/pages/types/page.https";

// GET ALL
export const fetchAllPages = createAsyncThunk(
  "pages/fetchAll",
  async () => await pageService.getAll()
);

// GET BY ID
export const fetchPageById = createAsyncThunk(
  "pages/fetchById",
  async (params: GetPageByIdRequest) => await pageService.getById(params)
);

// GET BY SLUG
export const fetchPageBySlug = createAsyncThunk(
  "pages/fetchBySlug",
  async (params: GetPageBySlugRequest) => await pageService.getBySlug(params)
);

// DELETE
export const deletePage = createAsyncThunk(
  "pages/delete",
  async (params: DeletePageRequest) => await pageService.deleteById(params)
);

// CREATE
export const createPage = createAsyncThunk(
  "pages/create",
  async (params: CreatePageRequest) => await pageService.create(params)
);

// UPDATE
export const updatePage = createAsyncThunk(
  "pages/update",
  async (params: UpdatePageRequest) => await pageService.update(params)
);

// GET HOME PAGE
export const fetchHomePage = createAsyncThunk(
  "pages/fetchHomePage",
  async () => await pageService.getHomePage()
);
