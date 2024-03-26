import PaginationCounter from "@/components/ui/pagination";
import { Table } from "flowbite-react";
import ClipLoader from "react-spinners/ClipLoader";
import useUserTransactions from "./useUserTransactions";
import TransactionTableHeader from "./TransactionTableHeader";
import CustomerTransactionRow from "./CustomerTransactionRow";
import { useState } from "react";

function CustomerTransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { transaction, loadingTransaction, error } =
    useUserTransactions(currentPage);

  //? check for undefined
  const transactions = transaction?.data ? transaction?.data : "";
  const toatalPages = transaction?.pagination.totalPages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loadingTransaction)
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;

  //? check for empty transactions
  if (transactions?.length == 0 || error)
    return <p className="mt-[10%]">No transaction found for this user</p>;

  if (error) return <p className="mt-[10%]">Check your internet connection</p>;
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
                <CustomerTransactionRow
                  key={index}
                  index={index}
                  transaction={transaction}
                />
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      <PaginationCounter
        count={toatalPages}
        handlePageChange={handlePageChange}
        currentpage={currentPage}
      />
    </>
  );
}
export default CustomerTransactionTable;
