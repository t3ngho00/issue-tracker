"use client";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/components/ErrorMessage";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: { title: "", description: "" },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data: IssueForm) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues/new", data);
      router.push("/issues");
      router.refresh();
    } catch {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
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
        <Button disabled={isSubmitting} type="submit">
          Submit New Issue {isSubmitting && "Creating..."}
        </Button>
      </form>
    </div>
  );
}
