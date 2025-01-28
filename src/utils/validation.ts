import { z } from "zod";

export const taskValidationSchema = z.object({
  title: z.string().min(1),
  color: z.string().optional().default("white"),
});
