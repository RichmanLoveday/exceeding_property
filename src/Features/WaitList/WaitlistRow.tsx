import { Dropdown, Table, Button } from "flowbite-react";

function WaitlistRow({
  index,
  customer_name,
  userId,
  prodcuctId,
  no_of_waitlist,
  handleForm,
  handleView,
}) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <span>{customer_name}</span>
      </Table.Cell>
      <Table.Cell className="items-baseline text-center">
        <span className="text-center font-bold">{no_of_waitlist}</span>
      </Table.Cell>

      <Table.Cell>
        <div className="flex justify-center items-center space-x-2">
          <Button
            onClick={() => handleView(userId)}
            color="blue"
            size="xs"
            pill
          >
            View Waitlist
          </Button>
          <Button
            onClick={() => handleForm(userId, customer_name)}
            color="blue"
            size="xs"
            pill
          >
            Add to waitlist
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default WaitlistRow;
