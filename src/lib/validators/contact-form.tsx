import { z } from "zod";

export const contactFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .trim(),

  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .trim()
    .toLowerCase(),

  message: z
    .string()
    .min(1, "Message is required")
    .min(30, "Message must be at least 30 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
