import { z } from "zod";
import { BlockStatus } from "@/types/common/block-entity";

export const PageFormSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .refine((value) => {
      if (!value) return true;
      return /^[a-z0-9-/]+$/.test(value);
    }, "Slug must contain only lowercase letters, numbers, and hyphens"),
  seo: z.string().superRefine((value, ctx) => {
    if (!value) return; // Allow empty

    let seoObj: unknown;

    // Parse the JSON
    try {
      seoObj = JSON.parse(value);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SEO must be a valid JSON object",
      });
      return;
    }

    // Must be a JSON object
    if (
      typeof seoObj !== "object" ||
      seoObj === null ||
      Array.isArray(seoObj)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SEO must be a JSON object",
      });
      return;
    }

    const requiredKeys = ["title", "description", "keywords"];
    const keys = Object.keys(seoObj);

    // Missing keys
    const missing = requiredKeys.filter((k) => !keys.includes(k));
    if (missing.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `SEO missing fields: ${missing.join(", ")}`,
      });
    }

    // Extra keys
    const extra = keys.filter((k) => !requiredKeys.includes(k));
    if (extra.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `SEO has invalid keys: ${extra.join(", ")}`,
      });
    }

    // Validate từng field
    if (typeof (seoObj as { title: string }).title !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "seo.title must be a string",
      });
    }

    if (typeof (seoObj as { description: string }).description !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "seo.description must be a string",
      });
    }

    if (!Array.isArray((seoObj as { keywords: string[] }).keywords)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "seo.keywords must be an array of strings",
      });
    } else {
      // Check each keyword must be a string
      const invalid = (seoObj as { keywords: string[] }).keywords.filter(
        (k: unknown) => typeof k !== "string"
      );
      if (invalid.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Each keyword must be a string",
        });
      }
    }
  }),
});

export type PageFormType = z.infer<typeof PageFormSchema>;

export const PageDetailFormSchema = z.object({
  seo: z.object({
    title: z.string().min(0),
    description: z.string().min(0),
    keywords: z.string().min(0),
  }),

  data: z.array(
    z.object({
      key: z.string().min(0),
      title: z.string().min(0),
      schemaJson: z.string().min(0),
      content: z.object({}),
      status: z.nativeEnum(BlockStatus),
    })
  ),
});

export type PageDetailFormType = z.infer<typeof PageDetailFormSchema>;
