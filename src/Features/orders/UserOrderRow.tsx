import {
  checkOrderStatus,
  checkPaidStatus,
  dateFormat,
  formatNigerianPrice,
} from "@/lib/utils";
import { Badge, Dropdown, Modal, Table } from "flowbite-react";
import { MoreVertical, X } from "lucide-react";
import { Link } from "react-router-dom";
import useUpdateOrderStatus from "./useUpdateOrderStatus";
import { useState } from "react";
import ActionComp from "@/components/ui/ActionComp";
import useOrderDelete from "./useDeleteOrder";

function UserOrderRow({ order, index }) {
  const {
    _id,
    products,
    user,
    totalPrice,
    orderStatus,
    paymentStatus,
    createdAt,
  } = order;

  const [openModal, setOpenModal] = useState(false);
  const { updateStatus, isUpdating } = useUpdateOrderStatus();
  const { orderDelete, isDeleting, isDeleted } = useOrderDelete();

  const handleDeleteOrder = () => {
    orderDelete(_id);
  };

  // const handleOrderId = (orderId: string) => {
  //   setOpenModal(!openModal);
  //   //@ts-ignore
  //   setOrderId(orderId);
  // };

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell className="w-30 text-start">
          <span>{dateFormat(createdAt)}</span>
        </Table.Cell>
        <Table.Cell className="text-center items-baseline">
          <span className="text-center font-extrabold">{products.length}</span>
        </Table.Cell>
        <Table.Cell>{formatNigerianPrice(+totalPrice)}</Table.Cell>
        <Table.Cell className="w-10 text-center">
          <Badge color={checkOrderStatus(orderStatus)?.className}>
            {checkOrderStatus(orderStatus)?.text}
          </Badge>
        </Table.Cell>
        <Table.Cell className="w-10 text-center">
          <Badge color={checkPaidStatus(paymentStatus)?.className}>
            {checkPaidStatus(paymentStatus)?.text}
          </Badge>
        </Table.Cell>

        <Table.Cell>
          <Dropdown
            label=""
            renderTrigger={() => <MoreVertical className="cursor-pointer" />}
            dismissOnClick={true}
          >
            <Dropdown.Item>
              <Link to={`/order/${_id}`}>View Order</Link>
              {/* <a href="#">View Order</a> */}
            </Dropdown.Item>

            {orderStatus == "PENDING" ? (
              <Dropdown.Item
                onClick={() =>
                  //@ts-ignore
                  updateStatus({ orderId: _id, type: "preparing" })
                }
              >
                Processing
              </Dropdown.Item>
            ) : (
              ""
            )}

            {orderStatus == "PREPARING" ? (
              <Dropdown.Item
                onClick={() =>
                  //@ts-ignore
                  updateStatus({ orderId: _id, type: "delivered" })
                }
              >
                Delivered
              </Dropdown.Item>
            ) : (
              ""
            )}

            <Dropdown.Item onClick={() => setOpenModal(!openModal)}>
              Delete Order
            </Dropdown.Item>
          </Dropdown>
        </Table.Cell>
      </Table.Row>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <ActionComp
            message="Are you sure you want to delete this order"
            handleAction={handleDeleteOrder}
            inProgress={isDeleting}
            setOpenModal={setOpenModal}
            isCompleted={isDeleted}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserOrderRow;
