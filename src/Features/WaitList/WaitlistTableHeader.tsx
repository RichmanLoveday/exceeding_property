import { Table } from "flowbite-react";
import { GanttChart } from "lucide-react";

function WaitlistTableHeader() {
  return (
    <Table.Head>
      <Table.HeadCell>SN</Table.HeadCell>
      <Table.HeadCell>Customer name</Table.HeadCell>
      <Table.HeadCell className="text-center">NO of waitlist</Table.HeadCell>
      <Table.HeadCell>
        <GanttChart className=" mx-auto" />
      </Table.HeadCell>
    </Table.Head>
  );
}

export default WaitlistTableHeader;
