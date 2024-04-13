import ActionComp from "@/components/ui/ActionComp";
import { dateFormat } from "@/lib/utils";
import { Dropdown, Table, Button, Modal } from "flowbite-react";
import { MoreVertical } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function UsersRow({ index, userData }) {
  const { _id, name, username, email, createdAt } = userData;
  const [status, setStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const message = useRef("");

  function enableUser() {
    console.log("Enable user");
  }

  function disableUser() {
    console.log("Disable user");
  }

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <span>{dateFormat(createdAt)}</span>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <span>{username}</span>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <span>{email}</span>
        </Table.Cell>
        <Table.Cell>
          <div className="flex justify-center items-center space-x-2">
            <Dropdown
              label=""
              renderTrigger={() => <MoreVertical className="cursor-pointer" />}
              dismissOnClick={true}
            >
              <Dropdown.Item className="space-x-1">
                <Link to={`/order/user/${_id}`}>Orders</Link>
              </Dropdown.Item>
              <Dropdown.Item className="space-x-1">
                <Link to={`/transaction/${_id}`}>Transactions</Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="space-x-1"
                onClick={() => {
                  setOpenModal(!openModal);
                  setStatus("enable");
                  message.current = "Are you sure you want to enable this user";
                }}
              >
                <span>Enabale</span>
              </Dropdown.Item>
              <Dropdown.Item
                className="space-x-1"
                onClick={() => {
                  setOpenModal(!openModal);
                  setStatus("disable");
                  message.current =
                    "Are you sure you want to disable this user";
                }}
              >
                <span>Disable</span>
              </Dropdown.Item>
            </Dropdown>
          </div>
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
            message={message.current}
            handleAction={status == "enable" ? enableUser : disableUser}
            inProgress={false}
            setOpenModal={setOpenModal}
            isCompleted={false}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UsersRow;
