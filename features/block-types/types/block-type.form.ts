import { z } from "zod";

export const BlockTypeFormSchema = z.object({
  name: z.string().min(1),
  code: z
    .string()
    .min(1)
    .regex(/^[A-Z]+$/),
  descriptions: z.string().optional(),
});

export type BlockTypeFormType = z.infer<typeof BlockTypeFormSchema>;
