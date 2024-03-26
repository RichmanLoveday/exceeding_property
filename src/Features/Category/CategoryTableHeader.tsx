import { Table } from "flowbite-react";

function CategoryTableHeader() {
  return (
    <Table.Head>
      <Table.HeadCell>SN</Table.HeadCell>
      <Table.HeadCell>Category name</Table.HeadCell>
      <Table.HeadCell>Image</Table.HeadCell>
      <Table.HeadCell>Description</Table.HeadCell>
      <Table.HeadCell>Date</Table.HeadCell>
      <Table.HeadCell>Action</Table.HeadCell>
    </Table.Head>
  );
}

export default CategoryTableHeader;
