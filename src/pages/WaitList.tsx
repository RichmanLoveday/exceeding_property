import WaitlistTable from "@/Features/WaitList/WaitlistTable";
import PageHeader from "@/components/ui/PageHeader";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Waitlist() {
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
      <PageHeader title="Waitlist">
        <h1></h1>
      </PageHeader>
      <WaitlistTable />
    </>
  );
}
