import { prisma } from "@/lib/prisma";
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
  const issue = await prisma.issue.findUniqueOrThrow({
    where: {
      id: parseInt(id),
    },
  });

  return <IssueForm issue={issue} />;
};

export default page;
