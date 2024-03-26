import { Table } from "flowbite-react";
import { GanttChart } from "lucide-react";

function TransactionTableHeader() {
  return (
    <Table.Head>
      <Table.HeadCell>SN</Table.HeadCell>
      <Table.HeadCell>Customer name</Table.HeadCell>
      <Table.HeadCell>Payment Type</Table.HeadCell>
      <Table.HeadCell>Description</Table.HeadCell>
      <Table.HeadCell>Amount</Table.HeadCell>
      <Table.HeadCell>Installment</Table.HeadCell>
      <Table.HeadCell>Transaction Status</Table.HeadCell>
      <Table.HeadCell>Date</Table.HeadCell>
      <Table.HeadCell>
        <GanttChart className=" mx-auto" />
      </Table.HeadCell>
    </Table.Head>
  );
}

export default TransactionTableHeader;
