"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      setOpen(false);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch {
      setDeleting(false);
      setError(true);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" disabled={isDeleting}>
            <Trash className="w-4 h-4" />
            Delete issue
            {isDeleting && <Spinner />}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              issue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteIssue}>
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={error} onOpenChange={setError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              An unexpected error occurred while deleting the issue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setError(false)}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteIssueButton;
