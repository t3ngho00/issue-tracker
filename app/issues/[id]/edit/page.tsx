import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_component/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../../_component/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default page;
