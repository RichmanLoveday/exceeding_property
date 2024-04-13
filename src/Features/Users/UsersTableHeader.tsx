import { Table } from "flowbite-react";

function UsersTableHeader() {
  return (
    <Table.Head>
      <Table.HeadCell>SN</Table.HeadCell>
      <Table.HeadCell>Date</Table.HeadCell>
      <Table.HeadCell>Username</Table.HeadCell>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Action</Table.HeadCell>
    </Table.Head>
  );
}

export default UsersTableHeader;
