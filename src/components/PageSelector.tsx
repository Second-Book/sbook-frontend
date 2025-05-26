import { getPaginatedPages } from "@/utils/functions";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PageSelector = ({
  results,
  currentPage,
  resultsPerPage,
}: {
  results: number;
  currentPage: number;
  resultsPerPage: number;
}) => {
  const pageNumber = Math.ceil(results / resultsPerPage);
  const pagesArray = getPaginatedPages(10, 20);
  console.log(pagesArray);
  return (
    pageNumber > 1 && (
      <div className="flex items-center text-xl gap-4">
        <FontAwesomeIcon icon={faChevronLeft} />
        {pagesArray.map((page, index) =>
          page === "..." ? (
            <span key={index}>{page}</span>
          ) : (
            <Link
              className={`w-10 aspect-square flex items-center justify-center bg-(--cool-gray-20) rounded-md hover:bg-(--cool-gray-30) ${
                page === currentPage.toString()
                  ? "bg-(--cool-gray-70) text-white hover:bg-(--cool-gray-90)"
                  : ""
              }`}
              href={"#"}
              key={index}>
              {page}
            </Link>
          )
        )}
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    )
  );
};

export default PageSelector;
