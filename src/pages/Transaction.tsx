import TransactionTable from "@/Features/Transactions/TransactionTable";
import PageHeader from "@/components/ui/PageHeader";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  //? check user login
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "object") {
      navigate("/login");
    }
  }, [cookies.exc_prop_user]);

  return (
    <>
      <div className="h-1 my-10" />
      <PageHeader title="All Transactions">
        <h1></h1>
      </PageHeader>
      <TransactionTable />
    </>
  );
}
