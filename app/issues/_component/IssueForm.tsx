"use client";

import { createIssue, updateIssue } from "@/app/actions/issues";
import { Issue } from "@/app/types";
import { createIssueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export type CreateIssueData = z.infer<typeof createIssueSchema>;
export type PatchIssueData = z.infer<typeof patchIssueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: issue
      ? {
          title: issue.title,
          description: issue.description,
        }
      : {},
  });

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const onSubmit = handleSubmit(async (data: CreateIssueData) => {
    startTransition(async () => {
      try {
        if (issue) {
          await updateIssue(issue.id, data);
        } else {
          await createIssue(data);
        } 
      } catch {
          setError("An unexpected error occured.");
        }
    }) 
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Alert variant="destructive" className="mb-5">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input placeholder="Title" {...register("title")} />
        {errors.title?.message && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description?.message && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
        <Button disabled={isPending} type="submit">
          {issue ? "Update issue" : "Submit New Issue"}{" "}
          {isPending && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
