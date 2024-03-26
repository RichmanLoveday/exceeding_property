import PaginationCounter from "@/components/ui/pagination";
import { Modal, Table } from "flowbite-react";
import WaitlistTableHeader from "./WaitlistTableHeader";
import useWaitlist from "./useWaitlist";
import WaitlistRow from "./WaitlistRow";
import { useEffect, useRef, useState } from "react";
import WaitlistProduct from "./WaitlistProduct";
import useDeleteWaitlist from "./useDeleteWaitlist";
import AddWaitlist from "./WaitListEdit";
import ClipLoader from "react-spinners/ClipLoader";

function WaitlistTable() {
  const [openModal, setOpenModal] = useState(false);
  const { waitlist, loadingWaitlist, error } = useWaitlist();
  const { waitlistDelete, isDeleting } = useDeleteWaitlist();
  const [product, setProduct] = useState([]);
  const [form, setForm] = useState(false);

  const waitlists = waitlist?.waitlists ? waitlist?.waitlists : "";
  const toatalPages = waitlist?.pagination.totalPages;

  const productID = useRef("");
  const userID = useRef("");
  const [userName, setUsername] = useState("");

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
  };

  const handleRemoveProduct = (userID: string, productID: string) => {
    waitlistDelete({ userID, productID });

    if (product.length == 0) setOpenModal(false);
  };

  const handleForm = (userId, userName) => {
    userID.current = userId;
    setUsername(userName);

    setForm(true);
    setOpenModal(!openModal);
  };

  const handleSetProduct = (userId) => {
    let product = waitlists?.find((order) => {
      if (order.user._id === userId) {
        setUsername(order.user.username);
        return order.waitlist;
      }
    });

    setProduct(product);
    setOpenModal(!openModal);
  };

  //? close modal
  function handleCloseModal() {
    setOpenModal(!openModal);
  }

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

      {toatalPages > 1 ? <PaginationCounter count={toatalPages} /> : ""}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          {product.length !== 0 && (
            <h1 className="ml-2 mb-2">Customer Name: {userName}</h1>
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
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))
            : ""}

          {form ? (
            <AddWaitlist
              userId={userID.current}
              customerName={userName}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default WaitlistTable;
