import { dateFormat } from "@/lib/utils";
import { Dropdown, Table, Button } from "flowbite-react";
import { MoreVertical } from "lucide-react";

function CategoryRow({
  index,
  categoryName,
  description,
  createdAt,
  categoryID,
  storeCategoryID,
  handleEditCategory,
  images,
}) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <span>{categoryName}</span>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <img src={images[0]} className=" w-16 h-16" alt="" />
      </Table.Cell>
      <Table.Cell className="items-baseline text-left">
        <span className="text-center font-bold text-white">{description}</span>
      </Table.Cell>
      <Table.Cell className="items-baseline text-left">
        <span className="text-center font-bold text-white">
          {dateFormat(createdAt)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-center items-center space-x-2">
          <Dropdown
            label=""
            renderTrigger={() => <MoreVertical className="cursor-pointer" />}
            dismissOnClick={true}
          >
            <Dropdown.Item
              className="space-x-1"
              onClick={() => handleEditCategory(categoryID)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                />
              </svg>

              <span>Edit</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="space-x-1"
              onClick={() => storeCategoryID(categoryID)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
              <span>Delete</span>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default CategoryRow;
