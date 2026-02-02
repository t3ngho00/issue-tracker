import Pagination from "@/components/Pagination";

interface Props {
  searchParams: Promise<{ page: string }>;
}
export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  return (
    <Pagination itemCount={100} pageSize={11} currentPage={parseInt(page!)} />
  );
}
