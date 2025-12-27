import { RootState } from "@/store/store";

export const selectBlockTemplatesState = (state: RootState) =>
  state.blockTemplates;
