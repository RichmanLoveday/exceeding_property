import { Table } from "flowbite-react";

function OrdersTableHeader() {
  return (
    <Table.Head>
      <Table.HeadCell>SN</Table.HeadCell>
      <Table.HeadCell>Customer name</Table.HeadCell>
      <Table.HeadCell>NO of products</Table.HeadCell>
      <Table.HeadCell>Price</Table.HeadCell>
      <Table.HeadCell>Order Status</Table.HeadCell>
      <Table.HeadCell>Payment Status</Table.HeadCell>
      <Table.HeadCell>
        <span className="sr-only">Edit</span>
      </Table.HeadCell>
    </Table.Head>
  );
}

export default OrdersTableHeader;
