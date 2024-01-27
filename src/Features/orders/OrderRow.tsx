import {
  checkOrderStatus,
  checkPaidStatus,
  formatNigerianPrice,
} from "@/lib/utils";
import { Badge, Dropdown, Table } from "flowbite-react";
import { MoreVertical, X } from "lucide-react";
import { Link } from "react-router-dom";

function OrderRow({ order, index, handleUpdateOrder, handleOrderId }) {
  const { _id, products, user, totalPrice, orderStatus, paymentStatus } = order;

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <span>{user}</span>
      </Table.Cell>
      <Table.Cell className="flex justify-start items-baseline">
        <X size="12" />
        {products.length}
      </Table.Cell>
      <Table.Cell>{formatNigerianPrice(+totalPrice)}</Table.Cell>
      <Table.Cell className="w-10 text-center">
        <Badge color={checkOrderStatus(orderStatus)?.className}>
          {checkOrderStatus(orderStatus)?.text}
        </Badge>
      </Table.Cell>
      <Table.Cell className="w-10 text-center">
        <Badge color={checkPaidStatus(paymentStatus)?.className}>
          {checkPaidStatus(paymentStatus)?.text}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Dropdown
          label=""
          renderTrigger={() => <MoreVertical className="cursor-pointer" />}
          dismissOnClick={true}
        >
          <Dropdown.Item>
            <Link to={`/order/${_id}`}>View Order</Link>
            {/* <a href="#">View Order</a> */}
          </Dropdown.Item>

          {orderStatus == "PENDING" ? (
            <Dropdown.Item onClick={() => handleUpdateOrder(_id, "processing")}>
              Processing
            </Dropdown.Item>
          ) : (
            ""
          )}

          {orderStatus == "PROCESSING" ? (
            <Dropdown.Item onClick={() => handleUpdateOrder(_id, "delivered")}>
              Delivered
            </Dropdown.Item>
          ) : (
            ""
          )}

          <Dropdown.Item onClick={() => handleOrderId(_id)}>
            Delete Order
          </Dropdown.Item>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
}

export default OrderRow;
