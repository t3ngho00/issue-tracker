import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title can't be more than 255 characters"),
  description: z.string().min(1, "Description is required").max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title can't be more than 255 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedUserId is required")
    .max(255)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});
