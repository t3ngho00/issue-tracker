"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

interface Props {
  itemCount: number;
  currentPage: number;
  pageSize: number;
}
const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      Page {currentPage} of {pageCount}
      <Button
        variant={"ghost"}
        disabled={currentPage == 1}
        onClick={() => changePage(1)}
      >
        <FaAngleDoubleLeft />
      </Button>
      <Button
        variant={"ghost"}
        disabled={currentPage == 1}
        onClick={() => changePage(currentPage-1)}
      >
        <FaAngleLeft />
      </Button>
      <Button
        variant={"ghost"}
        disabled={currentPage == pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <FaAngleRight />
      </Button>
      <Button
        variant={"ghost"}
        disabled={currentPage == pageCount}
        onClick={() => changePage(pageCount)}
      >
        <FaAngleDoubleRight />
      </Button>
    </div>
  );
};

export default Pagination;
