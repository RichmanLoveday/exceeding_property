import {
  checkTransactionStatus,
  dateFormat,
  formatNigerianPrice,
} from "@/lib/utils";
import { Dropdown, Table, Badge } from "flowbite-react";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import useUpdateTransStatus from "./useUpdateTransStatus";
import useDeleteTransaction from "./useDeleteTransaction";

function TransactionRow({ index, transaction }) {
  const {
    _id,
    user,
    amount,
    type,
    installment,
    description,
    status,
    deleted,
    createdAt,
  } = transaction;

  const { transUpdate, isUpdating } = useUpdateTransStatus();
  const { deleteTrans, isDeleting } = useDeleteTransaction();

  if (!deleted)
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{index + 1}</Table.Cell>

        <Table.Cell className="items-baseline text-left text-white">
          <span className="text-center font-bold">{user.username}</span>
        </Table.Cell>
        <Table.Cell>
          <span className="text-left font-bold">{type}</span>
        </Table.Cell>
        <Table.Cell>
          <span className="text-left font-bold">{description}</span>
        </Table.Cell>
        <Table.Cell>
          <span className="text-center font-bold">
            {formatNigerianPrice(+amount)}
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="text-center font-bold text-white">
            {installment}
          </span>
        </Table.Cell>
        <Table.Cell className="w-10 text-center">
          <Badge
            className="text-center"
            color={checkTransactionStatus(status)?.className}
          >
            {status}
          </Badge>
        </Table.Cell>
        <Table.Cell className="w-40 text-start">
          {dateFormat(createdAt)}
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            label=""
            renderTrigger={() => <MoreVertical className="cursor-pointer" />}
            dismissOnClick={true}
          >
            <Dropdown.Item>
              <Link to={`/transaction/${user._id}`}>Customer Transactions</Link>
            </Dropdown.Item>

            {status == "Verified" ? (
              <Dropdown.Item
                onClick={() =>
                  //@ts-ignore
                  transUpdate({ status: "unverified", transID: _id })
                }
              >
                Unverify
              </Dropdown.Item>
            ) : (
              ""
            )}
            {status == "unverified" ? (
              <Dropdown.Item
                onClick={() =>
                  //@ts-ignore
                  transUpdate({ status: "Verified", transID: _id })
                }
              >
                Verify
              </Dropdown.Item>
            ) : (
              ""
            )}
            <Dropdown.Item onClick={() => deleteTrans(_id)}>
              Delete Transaction
            </Dropdown.Item>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
}

export default TransactionRow;
