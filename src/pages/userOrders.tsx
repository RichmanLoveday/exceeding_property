import UserOrdersTable from "@/Features/orders/UserOrdersTable";
import PageHeader from "@/components/ui/PageHeader";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function UserOrders() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const { userId } = useParams();

  //? check user login
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "object") {
      navigate("/login");
    }
  }, [cookies.exc_prop_user]);

  return (
    <>
      <div className="h-1 my-10" />
      <PageHeader title="Orders">
        <h1></h1>
      </PageHeader>
      <UserOrdersTable />
    </>
  );
}
