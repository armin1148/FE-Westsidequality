import { configureStore } from "@reduxjs/toolkit";
import blockTypesReducer from "./features/block-types/block-types.slice";
import blockTemplatesReducer from "./features/block-templates/block-templates.slice";
import pagesReducer from "./features/pages/pages.slice";

export const store = configureStore({
  reducer: {
    blockTypes: blockTypesReducer,
    blockTemplates: blockTemplatesReducer,
    pages: pagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
