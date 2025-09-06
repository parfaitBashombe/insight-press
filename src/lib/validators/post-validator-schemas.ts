import { z } from "zod";

export const submitPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(100, "Minimum 100 characters for the content"),
  coverImage: z
    .instanceof(File, { message: "Cover image is required" })
    .nullable()
    .refine((file) => file !== null, {
      message: "Cover image is required",
    }),
  tags: z
    .array(z.string().min(2, "At 2 letters for the tag"))
    .min(1, "At least one tag is required"),
  category: z
    .string()
    .nullable()
    .refine((cat) => cat !== null, {
      message: "Category is required",
    }),
});

export type SubmitPostSchema = z.infer<typeof submitPostSchema>;
