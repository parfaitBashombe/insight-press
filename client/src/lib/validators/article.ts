import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title is too long"),
  content: z.string().min(10, "Content is too short"),
  cover_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const promotionRequestSchema = z.object({
  reason: z.string().min(20, "Please write at least 20 characters"),
});
