"use client";

import useFormFilterSubmit from "@/hooks/useFormFilterSubmit";
import { getPaginatedPages } from "@/utils/functions";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageSelector = ({
  results,
  currentPage,
  resultsPerPage,
}: {
  results: number;
  currentPage: number;
  resultsPerPage: number;
}) => {
  console.log(currentPage);
  const handleSubmit = useFormFilterSubmit("/textbooks");
  const pageNumber = Math.ceil(results / resultsPerPage);
  const pagesArray = getPaginatedPages(currentPage, pageNumber);
  return (
    pageNumber > 1 && (
      <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+var(--spacing)*10)] flex items-center text-xl gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            handleSubmit({
              offset: String((currentPage - 2) * resultsPerPage),
            })
          }
          className="cursor-pointer hover:text-rose-800 disabled:text-(--cool-gray-30) disabled:cursor-default">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pagesArray.map((page, index) =>
          page === "..." ? (
            <span key={index}>{page}</span>
          ) : (
            <button
              className={`w-10 aspect-square flex items-center justify-center bg-(--cool-gray-20) rounded-md hover:bg-(--cool-gray-30) cursor-pointer ${
                page === currentPage.toString()
                  ? "bg-(--cool-gray-70) text-white hover:bg-(--cool-gray-90)"
                  : ""
              }`}
              onClick={() =>
                handleSubmit({
                  offset: String((parseInt(page) - 1) * resultsPerPage),
                })
              }
              key={index}>
              {page}
            </button>
          )
        )}
        <button
          disabled={currentPage === pageNumber}
          onClick={() =>
            handleSubmit({
              offset: String(currentPage * resultsPerPage),
            })
          }
          className="cursor-pointer hover:text-rose-800 disabled:text-(--cool-gray-30) disabled:cursor-default">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    )
  );
};

export default PageSelector;
