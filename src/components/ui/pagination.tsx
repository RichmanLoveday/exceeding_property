import { Pagination } from "flowbite-react";
import { useState } from "react";

function PaginationCounter({ count, handlePageChange, currentpage }) {
  const [currentPage, setCurrentPage] = useState(currentpage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    handlePageChange(page);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center my-5">
      <Pagination
        currentPage={currentPage}
        totalPages={count}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}

export default PaginationCounter;
