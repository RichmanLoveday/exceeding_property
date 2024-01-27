import { Pagination } from "flowbite-react";
import { useState } from "react";

function PaginationCounter({ count }) {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center mb-5">
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
