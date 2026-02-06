"use server";

import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateIssueData,
  PatchIssueData,
} from "../issues/_component/IssueForm";
import { createIssueSchema, patchIssueSchema } from "../validationSchemas";

export async function createIssue(data: CreateIssueData) {
  await requireAuth();

  const validation = createIssueSchema.safeParse(data);
  if (!validation.success) throw new Error(validation.error.message);

  await prisma.issue.create({
    data,
  });

  revalidatePath("/issues/list");
  redirect("/issues/list");
}

export async function updateIssue(id: number, data: PatchIssueData) {
  await requireAuth();

  const validation = patchIssueSchema.safeParse(data);
  if (!validation.success) throw new Error(validation.error.message);

  await prisma.issue.findUniqueOrThrow({
    where: { id },
  });

  if (validation.data.assignedToUserId) {
    await prisma.user.findUniqueOrThrow({
      where: { id: validation.data.assignedToUserId },
    });
  }

  await prisma.issue.update({
    where: { id },
    data: validation.data,
  });

  revalidatePath("/issues/list");
  redirect("/issues/list");
}

export async function assignIssue(id: number, assignedToUserId: string | null) {
  await requireAuth();

  await prisma.issue.findUniqueOrThrow({
    where: { id },
  });

  await prisma.issue.update({
    where: { id },
    data: {
      assignedToUserId,
    },
  });

  return { success: true };
}

export async function updateIssueStatus(
  id: number,
  status: "OPEN" | "IN_PROGRESS" | "CLOSED",
) {
  await requireAuth();

  await prisma.issue.findUniqueOrThrow({
    where: { id },
  });

  await prisma.issue.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/issues/${id}`);
  revalidatePath("/issues/list");

  return { success: true };
}

export async function deleteIssue(id: number) {
  await requireAuth();

  const issue = await prisma.issue.findUniqueOrThrow({
    where: { id },
  });

  if (!issue) throw new Error("Issue not found");
  await prisma.issue.delete({
    where: { id },
  });

  revalidatePath("/issues/list");
  redirect("/issues/list");
}
