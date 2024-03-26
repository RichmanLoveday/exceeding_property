import PaginationCounter from "@/components/ui/pagination";
import { Modal, Table } from "flowbite-react";
import OrdersTableHeader from "./OrdersTableHeader";
import DeleteComp from "@/components/ui/Delete";
import { useOrders } from "@/Features/orders/useOrders";
import useOrderDelete from "@/Features/orders/useDeleteOrder";
import ClipLoader from "react-spinners/ClipLoader";
import OrderRow from "./OrderRow";
import useUpdateOrderStatus from "./useUpdateOrderStatus";
import { useState } from "react";
// import orders from "../../services/data/orders.json";

function OrdersTable() {
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { loadingOrders, orders, error } = useOrders(currentPage);
  const { updateStatus, isUpdating } = useUpdateOrderStatus();
  const { orderDelete, isDeleting, isDeleted } = useOrderDelete();
  const Orders = orders?.docs;

  const toatalPages = orders?.totalDocs;
  const handleOrderId = (orderId: string) => {
    setOpenModal(!openModal);
    setOrderId(orderId);
  };

  const handleUpdateOrder = (orderId: string, type: string) => {
    updateStatus({ orderId, type });
  };

  const handleDeleteOrder = () => {
    orderDelete(orderId);
  };

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
          <OrdersTableHeader />
          <Table.Body>
            {Orders?.length == 0 ? (
              <p className="mt-[10%]">Order is empty</p>
            ) : (
              Orders?.map((order, index) => (
                <OrderRow
                  order={order}
                  index={index}
                  handleOrderId={handleOrderId}
                  handleUpdateOrder={handleUpdateOrder}
                  key={order._id}
                />
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

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <DeleteComp
            message="Are you sure you want to delete this order"
            handleDelete={handleDeleteOrder}
            isDeleting={isDeleting}
            setOpenModal={setOpenModal}
            isDeleted={isDeleted}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default OrdersTable;
