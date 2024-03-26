import { Button, Dropdown, Modal } from "flowbite-react";
import OrderHeader from "./orderHeader";
import BackButton from "@/components/back";
import { formatNigerianPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import useOrderDelete from "./useDeleteOrder";
import { useNavigate, useParams } from "react-router-dom";
import useOrderDetails from "./useOrderDetails";
import ClipLoader from "react-spinners/ClipLoader";
import OrderItems from "./orderItems";
import DeleteComp from "@/components/ui/Delete";
import useUpdateOrderStatus from "./useUpdateOrderStatus";
import { useCookies } from "react-cookie";

function OrderDetails() {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  //? check user login
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "object") {
      navigate("/login");
    }
  }, [cookies.exc_prop_user]);

  const { orderId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { orderDelete, isDeleting, isDeleted } = useOrderDelete();
  const { orderData, isLoading } = useOrderDetails();
  const { updateStatus, isUpdating } = useUpdateOrderStatus();

  function handleDeleteOrder() {
    orderDelete(orderId);
  }

  function handleOrderStatus(orderId, type) {
    updateStatus({ orderId, type });
  }

  console.log(orderData);
  if (isLoading) {
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;
  }

  return (
    <div className="my-[5%]">
      <div>
        <BackButton />
      </div>
      <OrderHeader orders={orderData} />

      <OrderItems orders={orderData} />

      <div className="float-right space-y-5">
        <div className="flex flex-col justify-end text-right space-y-2">
          <span>WAITLIST: None</span>
          <span>GRAND TOTAL: {formatNigerianPrice(orderData.totalPrice)}</span>
        </div>
        <div className="flex justify-around items-center space-x-5">
          <Dropdown label="Edit Order Status" dismissOnClick={true}>
            <Dropdown.Item
              onClick={() => handleOrderStatus(orderId, "pending")}
              disabled={isUpdating}
            >
              PENDING
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleOrderStatus(orderId, "preparing")}
              disabled={isUpdating}
            >
              PROCESSING
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleOrderStatus(orderId, "delivered")}
              disabled={isUpdating}
            >
              DELIVERED
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleOrderStatus(orderId, "cancelled")}
              disabled={isUpdating}
            >
              CANCELLED
            </Dropdown.Item>
          </Dropdown>
          <Button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            color="failure"
          >
            Delete
          </Button>
        </div>
      </div>

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
            deleted={isDeleted}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default OrderDetails;
