import AddCategory from "@/Features/Category/AddCategory";
import CategoryTable from "@/Features/Category/CategoryTable";
import PageHeader from "@/components/ui/PageHeader";
import { Button, Modal } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [openModal, setOpenModal] = useState(false);

  const [cookies] = useCookies();
  const navigate = useNavigate();

  //? check user login
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "object") {
      navigate("/login");
    }
  }, [cookies.exc_prop_user]);

  //? handle close modal
  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <div className="h-1 my-10" />
      <PageHeader title="Category">
        <Button
          onClick={() => setOpenModal(!openModal)}
          className="flex justify-between items-center align-baseline space-x-3"
        >
          <PlusCircle className="w-5 mr-2" />
          <h1>Add New Category</h1>
        </Button>
      </PageHeader>
      <CategoryTable />

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <AddCategory handleCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}
