import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import ProductsTable from "@/Features/Products/ProductsTable";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Products() {
  const [cookies, setCookie] = useCookies();
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

      <PageHeader title="products">
        <Button className="flex items-center gap-5" asChild>
          <Link to={"/add-product"}>
            <PlusCircle className="w-5" />
            Add New Product
          </Link>
        </Button>
      </PageHeader>

      <ProductsTable />
    </>
  );
}
