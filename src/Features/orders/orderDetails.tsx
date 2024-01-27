import { Button, Dropdown } from "flowbite-react";
import OrderHeader from "./orderHeader";
import BackButton from "@/components/back";
import { formatNigerianPrice } from "@/lib/utils";
import ModalComp from "@/components/ui/Modal";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../pages/MyContext";
import useOrderDelete from "./useDeleteOrder";
import { useParams } from "react-router-dom";
import useOrderDetails from "./useOrderDetails";
import ClipLoader from "react-spinners/ClipLoader";
import OrderItems from "./orderItems";
import OrderEdit from "./orderEdit";
import DeleteComp from "@/components/ui/Delete";
import useUpdateOrderStatus from "./useUpdateOrderStatus";

function OrderDetails() {
  const { orderId } = useParams();
  const { openModal, setOpenModal } = useContext(MyContext);
  const { orderDelete, isDeleting } = useOrderDelete();
  const { orderData, isLoading } = useOrderDetails();
  const { updateStatus, isUpdating } = useUpdateOrderStatus();
  const [del, setDel] = useState(false);
  const [form, setForm] = useState(false);

  const quantity = useRef(0);
  const product = useRef(0);

  useEffect(() => {
    if (!openModal) {
      setDel(false);
      setForm(false);
    }
  }, [openModal]);

  function handleDeleteOrder() {
    orderDelete(orderId);
    setDel(!del);
    setOpenModal(!openModal);
  }

  function handleEditOrder(qtyVal: string, productId: string) {
    product.current = productId;
    quantity.current = qtyVal;

    setForm(true);
    setOpenModal(!openModal);
  }

  function handleOrderStatus(orderId, type) {
    updateStatus({ orderId, type });
  }

  // if (isLoading) {
  //   console.log("loaiding");
  //   return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;
  // }

  return (
    <></>
    // <div className="my-[5%]">
    //   <div>
    //     <BackButton />
    //   </div>
    //   <OrderHeader orders={orderData} />

    //   <OrderItems handleOrderEdit={handleEditOrder} orders={orderData} />

    //   <div className="float-right space-y-5">
    //     <div className="flex flex-col justify-end text-right space-y-2">
    //       <span>WAITLIST: None</span>
    //       <span>GRAND TOTAL: {formatNigerianPrice(orderData.totalPrice)}</span>
    //     </div>
    //     <div className="flex justify-around items-center space-x-5">
    //       <Dropdown label="Edit Order Status" dismissOnClick={true}>
    //         <Dropdown.Item
    //           onClick={() => handleOrderStatus(orderId, "pending")}
    //           disabled={isUpdating}
    //         >
    //           PENDING
    //         </Dropdown.Item>
    //         <Dropdown.Item
    //           onClick={() => handleOrderStatus(orderId, "processing")}
    //           disabled={isUpdating}
    //         >
    //           PROCESSING
    //         </Dropdown.Item>
    //         <Dropdown.Item
    //           onClick={() => handleOrderStatus(orderId, "delivered")}
    //           disabled={isUpdating}
    //         >
    //           DELIVERED
    //         </Dropdown.Item>
    //         <Dropdown.Item
    //           onClick={() => handleOrderStatus(orderId, "cancelled")}
    //           disabled={isUpdating}
    //         >
    //           CANCELLED
    //         </Dropdown.Item>
    //       </Dropdown>
    //       <Button
    //         onClick={() => {
    //           setDel(!del);
    //           setOpenModal(!openModal);
    //         }}
    //         color="failure"
    //       >
    //         Delete
    //       </Button>
    //     </div>
    //   </div>

    //   <ModalComp>
    //     {del ? (
    //       <DeleteComp
    //         message="Are you sure you want to delete this order"
    //         isDeleting={isDeleting}
    //         handleDelete={handleDeleteOrder}
    //       />
    //     ) : (
    //       ""
    //     )}
    //     {form ? (
    //       <OrderEdit
    //         orderId={4423}
    //         productId={product.current}
    //         quantityValue={quantity.current}
    //       />
    //     ) : (
    //       ""
    //     )}
    //   </ModalComp>
    // </div>
  );
}

export default OrderDetails;
