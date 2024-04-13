import { Table } from "flowbite-react";

function UserOrdersTableHeader() {
  return (
    <Table.Head>
      <Table.HeadCell>SN</Table.HeadCell>
      <Table.HeadCell>Date</Table.HeadCell>
      <Table.HeadCell className="text-center">NO of products</Table.HeadCell>
      <Table.HeadCell>Price</Table.HeadCell>
      <Table.HeadCell>Order Status</Table.HeadCell>
      <Table.HeadCell>Payment Status</Table.HeadCell>
      <Table.HeadCell>Action</Table.HeadCell>
    </Table.Head>
  );
}

export default UserOrdersTableHeader;
