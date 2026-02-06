"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateIssueData,
  PatchIssueData,
} from "../issues/_component/IssueForm";
import { createIssueSchema, patchIssueSchema } from "../validationSchemas";

export async function createIssue(data: CreateIssueData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const validation = createIssueSchema.safeParse(data);
  if (!validation.success) throw new Error(validation.error.message);

  await prisma.issue.create({
    data,
  });

  revalidatePath("/issues/list");
  redirect("/issues/list");
}

export async function updateIssue(id: number, data: PatchIssueData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const validation = patchIssueSchema.safeParse(data);
  if (!validation.success) throw new Error(validation.error.message);

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) throw new Error("Issue not found");

  if (validation.data.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: validation.data.assignedToUserId },
    });
    if (!user) throw new Error("Assigned user not found");
  }

  await prisma.issue.update({
    where: { id },
    data: validation.data,
  });

  revalidatePath("/issues/list");
  redirect("/issues/list");
}

export async function deleteIssue(id: number) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) throw new Error("Issue not found");
  await prisma.issue.delete({
    where: { id },
  });

  revalidatePath("/issues/list");
  redirect("/issues/list");
}
