import PaginationCounter from "@/components/ui/pagination";
import { Table } from "flowbite-react";
import ModalComp from "@/components/ui/Modal";
import WaitlistTableHeader from "./WaitlistTableHeader";
import useWaitlist from "./useWaitlist";
import WaitlistRow from "./WaitlistRow";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "@/pages/MyContext";
import WaitlistProduct from "./WaitlistProduct";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteWaitlist from "./useDeleteWaitlist";
import AddWaitlist from "./WaitListEdit";
import ClipLoader from "react-spinners/ClipLoader";

function WaitlistTable() {
  const { openModal, setOpenModal } = useContext(MyContext);
  const { waitlist, loadingWaitlist, error } = useWaitlist();
  const { waitlistDelete, isDeleting } = useDeleteWaitlist();
  const [product, setProduct] = useState([]);
  const [form, setForm] = useState(false);
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState("");

  const waitlists = waitlist?.waitlists ? waitlist?.waitlists : "";
  console.log(waitlists);
  const pagination = waitlist?.pagination;

  const productID = useRef("");
  const userID = useRef("");

  //   console.log(waitlists);

  useEffect(() => {
    if (!openModal) {
      setProduct([]);
      setForm(false);
    }
  }, [openModal]);

  const handleWaitlistId = (userId: string, productId: string) => {
    productID.current = productId;
    userID.current = userId;

    setOpenModal(!openModal);

    const keyExists = queryClient.getQueryData(["all_waitlist"]) !== undefined;
    // console.log(keyExists);

    // Set new data only if the key does not exist
    if (!keyExists) {
      queryClient.setQueryData(["all_waitlist"], waitlist);
    }
  };

  const handleRemoveProduct = (userID: string, productID: string) => {
    const keyExists = queryClient.getQueryData(["all_waitlist"]) !== undefined;

    // Set new data only if the key does not exist
    if (!keyExists) {
      queryClient.setQueryData(["all_waitlist"], waitlist);
    }

    waitlistDelete({ userID, productID });

    if (product.length == 0) setOpenModal(false);
  };

  const handleForm = (userId, userName) => {
    userID.current = userId;
    setUserName(userName);

    setForm(true);
    setOpenModal(!openModal);
  };

  const handleSetProduct = (userId) => {
    // console.log(userId);
    let prodcut = waitlists?.find((order) => {
      if (order.user._id === userId) return order.waitlist;
    });

    //  console.log(prodcut);
    setProduct(prodcut);
    setOpenModal(!openModal);

    const keyExists = queryClient.getQueryData(["all_waitlist"]) !== undefined;

    // Set new data only if the key does not exist
    if (!keyExists) {
      queryClient.setQueryData(["all_waitlist"], waitlist);
    }
  };

  if (loadingWaitlist)
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;

  if (waitlist?.length == 0 || error)
    return <p className="mt-[10%]">Waitlist is empty</p>;

  if (error) return <p className="mt-[10%]">Check your internet connection</p>;
  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable className="mb-10">
          <WaitlistTableHeader />
          <Table.Body>
            {waitlists?.length == 0 ? (
              <p className="mt-[10%]">Order is empty</p>
            ) : (
              waitlists?.map((waitlist, index) => (
                <WaitlistRow
                  key={index}
                  index={index}
                  userId={waitlist.user._id}
                  handleView={handleSetProduct}
                  handleForm={handleForm}
                  prodcuctId={waitlist.waitlist}
                  customer_name={waitlist.user.username}
                  no_of_waitlist={waitlist.waitlist.length}
                />
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      <PaginationCounter count={waitlists?.length || 0} />

      <ModalComp>
        {product.length !== 0 && (
          <h1 className="ml-2 mb-2">Customer Name: {product?.user.name}</h1>
        )}
        {product.length !== 0
          ? product?.waitlist.map((prod) => (
              <WaitlistProduct
                key={prod._id}
                image={prod.images[0]}
                userID={product?.user._id}
                name={prod.name}
                price={prod.price}
                productID={prod._id}
                customer_name={product?.user.name}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))
          : ""}

        {form ? (
          <AddWaitlist userId={userID.current} customerName={userName} />
        ) : (
          ""
        )}
      </ModalComp>
    </>
  );
}
export default WaitlistTable;
