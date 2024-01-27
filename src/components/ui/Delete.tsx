import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { MyContext } from "@/pages/MyContext";

function DeleteComp({ message, isDeleting, handleDelete }) {
  const { setOpenModal } = useContext(MyContext);

  return (
    <div className="text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        {message}
      </h3>
      <div className="flex justify-center gap-4">
        <Button
          color="failure"
          disabled={isDeleting}
          onClick={() => handleDelete()}
        >
          Yes, I'm sure
        </Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          No, cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteComp;
