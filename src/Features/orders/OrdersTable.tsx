import PaginationCounter from "@/components/ui/pagination";
import { Table } from "flowbite-react";
import OrdersTableHeader from "./OrdersTableHeader";
import ModalComp from "@/components/ui/Modal";
import DeleteComp from "@/components/ui/Delete";
import { useOrders } from "@/Features/orders/useOrders";
import { MyContext } from "@/pages/MyContext";
import { useContext, useState } from "react";
import useOrderDelete from "@/Features/orders/useDeleteOrder";
import ClipLoader from "react-spinners/ClipLoader";
import OrderRow from "./OrderRow";
import useUpdateOrderStatus from "./useUpdateOrderStatus";
// import orders from "../../services/data/orders.json";

function OrdersTable() {
  const { loadingOrders, orders, error } = useOrders();
  const { openModal, setOpenModal } = useContext(MyContext);
  const { updateStatus, isUpdating } = useUpdateOrderStatus();
  const { orderDelete, isDeleting } = useOrderDelete();
  const [orderId, setOrderId] = useState();
  const Orders = orders;

  const handleOrderId = (orderId: string) => {
    setOpenModal(!openModal);
    setOrderId(orderId);
  };

  const handleUpdateOrder = (orderId, type) => {
    updateStatus({ orderId, type });
  };

  const handleDeleteOrder = () => {
    orderDelete(orderId);
    setOpenModal(!openModal);
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
      <PaginationCounter count={Orders?.length} />

      <ModalComp>
        <DeleteComp
          message="Are you sure you want to delete this order"
          handleDelete={handleDeleteOrder}
          isDeleting={isDeleting}
        />
      </ModalComp>
    </>
  );
}
export default OrdersTable;
