import { z } from "zod";

export const BlockTemplateFormSchema = z.object({
  blockTypeId: z.any().default(""),
  name: z.string().min(1).default(""),
  descriptions: z.string().default(""),
  schemaJson: z
    .string()
    .min(1)
    .refine((value) => {
      if (!value) return true;

      try {
        const parsed = JSON.parse(value);

        return (
          typeof parsed === "object" &&
          !Array.isArray(parsed) &&
          parsed !== null &&
          Object.keys(parsed).length > 0
        );
      } catch {
        return false;
      }
    }, "Invalid JSON object"),

  css: z.string().nullable().default(""),
  previewThumbnail: z.string().default(""),
});

export type BlockTemplateFormType = z.infer<typeof BlockTemplateFormSchema>;
