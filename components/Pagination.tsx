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
  const pageCount = Math.ceil(itemCount / pageSize);
  console.log(pageCount);
  if (pageCount <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      Page {currentPage} of {pageCount}
      <Button variant={"ghost"} disabled={currentPage == 1}>
        <FaAngleDoubleLeft />
      </Button>
      <Button variant={"ghost"} disabled={currentPage == 1}>
        <FaAngleLeft />
      </Button>
      <Button variant={"ghost"} disabled={currentPage == pageCount}>
        <FaAngleRight />
      </Button>
      <Button variant={"ghost"} disabled={currentPage == pageCount}>
        <FaAngleDoubleRight />
      </Button>
    </div>
  );
};

export default Pagination;
