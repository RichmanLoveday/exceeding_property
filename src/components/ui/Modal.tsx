import { MyContext } from "@/pages/MyContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";

function ModalComp({ children }) {
  const { openModal, setOpenModal } = useContext(MyContext);

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalComp;
