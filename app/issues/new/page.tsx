"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_component/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_component/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const page = () => {
  return <IssueForm />;
};

export default page;
