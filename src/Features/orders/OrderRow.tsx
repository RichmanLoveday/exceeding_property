import {
  checkDeliveryStatus,
  checkOrderStatus,
  checkPaidStatus,
  dateFormat,
  formatNigerianPrice,
} from "@/lib/utils";
import { Badge, Dropdown, Table } from "flowbite-react";
import { MoreVertical, X } from "lucide-react";
import { Link } from "react-router-dom";

function OrderRow({ order, index, handleUpdateOrder, handleOrderId }) {
  const {
    _id,
    products,
    user,
    totalPrice,
    orderStatus,
    paymentStatus,
    createdAt,
  } = order;

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <span>{user.username}</span>
      </Table.Cell>
      <Table.Cell className="text-center items-baseline">
        <span className="text-center font-extrabold">{products.length}</span>
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
      <Table.Cell className="w-30 text-start">
        <span>{dateFormat(createdAt)}</span>
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
            <Dropdown.Item onClick={() => handleUpdateOrder(_id, "preparing")}>
              Processing
            </Dropdown.Item>
          ) : (
            ""
          )}

          {orderStatus == "PREPARING" ? (
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
