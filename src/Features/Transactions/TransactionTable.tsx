import PaginationCounter from "@/components/ui/pagination";
import { Table } from "flowbite-react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useTransactions from "./useTransactions";
import TransactionTableHeader from "./TransactionTableHeader";
import TransactionRow from "./TransactionRow";

function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { transaction, loadingTransaction, error } =
    useTransactions(currentPage);

  //? check for undefined
  const transactions = transaction?.transactions
    ? transaction?.transactions
    : "";
  const toatalPages = transaction?.pagination.totalPages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loadingTransaction)
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;

  //? check for empty transactions
  if (transactions?.length == 0 || error)
    return <p className="mt-[10%]">Waitlist is empty</p>;

  // if (error) return <p className="mt-[10%]">Check your internet connection</p>;
  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable className="mb-10">
          <TransactionTableHeader />
          <Table.Body>
            {transactions?.length == 0 ? (
              <p className="mt-[10%]">Transaction Is Empty</p>
            ) : (
              transactions?.map((transaction, index) => (
                <TransactionRow
                  key={index}
                  index={index}
                  transaction={transaction}
                />
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      {toatalPages > 1 ? (
        <PaginationCounter
          count={toatalPages}
          currentpage={currentPage}
          handlePageChange={handlePageChange}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default TransactionTable;
