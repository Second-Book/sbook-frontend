export const getPaginatedPages = (currentPage: number, totalPages: number) => {
  if (currentPage > totalPages || currentPage < 1 || totalPages < 1) {
    throw new Error("Invalid page parameter");
  }
  const finalArray: number[] = [];
  const window = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= totalPages
  );
  finalArray.push(1);

  if (window[0] > 3) {
    finalArray.push(-1);
  } else {
    finalArray.push(2);
  }

  finalArray.push(...window);

  if (window[window.length - 1] < totalPages - 2) {
    finalArray.push(-2);
  } else {
    finalArray.push(totalPages - 1);
  }

  finalArray.push(totalPages);

  return Array.from(new Set(finalArray)).map((page) =>
    page > 0 ? page.toString() : "..."
  );
};
