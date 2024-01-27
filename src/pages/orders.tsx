import OrdersTable from "@/Features/orders/OrdersTable";
import PageHeader from "@/components/ui/PageHeader";

export default function Orders() {
  return (
    <>
      <div className="h-1 my-10" />
      <PageHeader title="Orders" />
      <OrdersTable />
    </>
  );
}
