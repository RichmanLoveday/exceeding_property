import AddCategory from "@/Features/Category/AddCategory";
import CategoryTable from "@/Features/Category/CategoryTable";
import UsersTable from "@/Features/Users/UsersTable";
import PageHeader from "@/components/ui/PageHeader";
import { Button, Modal } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Users() {
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
      <PageHeader title="Users">
        <h1></h1>
      </PageHeader>
      <UsersTable />
    </>
  );
}
