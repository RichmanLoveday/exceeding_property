import {
  checkTransactionStatus,
  dateFormat,
  formatNigerianPrice,
} from "@/lib/utils";
import { Dropdown, Table, Badge } from "flowbite-react";
import { MoreVertical } from "lucide-react";

function CustomerTransactionRow({ index, transaction }) {
  const { user, amount, type, installment, description, status, createdAt } =
    transaction;
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
        <span className="text-center font-bold text-white">{installment}</span>
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
          <Dropdown.Item>Verify</Dropdown.Item>
          <Dropdown.Item>Unverify</Dropdown.Item>
          <Dropdown.Item>Delete Transaction</Dropdown.Item>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
}

export default CustomerTransactionRow;
