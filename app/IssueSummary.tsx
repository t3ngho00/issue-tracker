import { Status } from "./generated/prisma/enums";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const IssueSummary = ({
  open,
  inProgress,
  closed,
}: {
  open: number;
  inProgress: number;
  closed: number;
}) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "In progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "CLOSED" },
  ];

  return (
    <div className="flex gap-4">
      {statuses.map((container) => (
        <Card
          key={container.label}
          className="flex-1 hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4 text-center">
            <Link
              href={`/issues/list/?status=${container.status}`}
              className="text-lg font-semibold hover:underline"
            >
              {container.label}
            </Link>
            <p className="text-2xl font-bold mt-2">{container.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
