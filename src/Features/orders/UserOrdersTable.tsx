import PaginationCounter from "@/components/ui/pagination";
import { Table } from "flowbite-react";
import { useOrders } from "@/Features/orders/useOrders";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import UserOrdersTableHeader from "./UserOrderTableHeader";
import UserOrderRow from "./UserOrderRow";
import useUserOrders from "./useUserOrders";
// import orders from "../../services/data/orders.json";

function UserOrdersTable() {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { loadingOrders, orders, error } = useUserOrders(currentPage);
  const Orders = orders?.docs;

  const toatalPages = orders?.hasNextPage ? orders?.totalDocs : 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loadingOrders)
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;

  if (Orders?.length == 0) return <p className="mt-[10%]">Order is empty</p>;

  if (error) return <p className="mt-[10%]">Check your internet connection</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable className="mb-10">
          <UserOrdersTableHeader />
          <Table.Body>
            {Orders?.length == 0 ? (
              <p className="mt-[10%]">Order is empty</p>
            ) : (
              Orders?.map((order, index) => (
                <UserOrderRow order={order} index={index} key={order._id} />
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {toatalPages > 1 ? (
        <PaginationCounter
          count={toatalPages}
          handlePageChange={handlePageChange}
          currentpage={currentPage}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default UserOrdersTable;
