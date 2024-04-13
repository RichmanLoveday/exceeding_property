import { Modal, Table } from "flowbite-react";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useRef, useState } from "react";
import DeleteComp from "@/components/ui/Delete";
import PaginationCounter from "@/components/ui/pagination";
import UsersTableHeader from "./UsersTableHeader";
import UsersRow from "./UsersRow";
import useUsersPaginate from "./useUsersPaginate";

function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, loadingUsers, error } = useUsersPaginate(currentPage);

  const toatalPages = users?.totalPages;
  const userDatas = users?.users;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loadingUsers)
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;

  if (error) return <p className="mt-[10%]">Check your internet connection</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable className="mb-10">
          <UsersTableHeader />
          <Table.Body>
            {userDatas?.length > 0
              ? userDatas
                  .reverse()
                  .map((userDatas, index) => (
                    <UsersRow key={index} index={index} userData={userDatas} />
                  ))
              : ""}
          </Table.Body>
        </Table>
        {userDatas?.length == 0 ? (
          <p className="w-full text-center -mt-5 py-1">Users is empty</p>
        ) : (
          ""
        )}
      </div>

      <PaginationCounter
        count={toatalPages}
        handlePageChange={handlePageChange}
        currentpage={currentPage}
      />
    </>
  );
}
export default UsersTable;
