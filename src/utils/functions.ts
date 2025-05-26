export const getPaginatedPages = (currentPage: number, totalPages: number) => {
  if (currentPage > totalPages) {
    return [-1];
  }
  const finalArray: number[] = [];
  const window = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= totalPages
  );
  finalArray.push(1);
  window[0] > 3 ? finalArray.push(-1) : finalArray.push(2);

  finalArray.push(...window);

  window[window.length - 1] < totalPages - 2
    ? finalArray.push(-2)
    : finalArray.push(totalPages - 1);

  finalArray.push(totalPages);

  return Array.from(new Set(finalArray)).map((page) =>
    page > 0 ? page.toString() : "..."
  );
};
