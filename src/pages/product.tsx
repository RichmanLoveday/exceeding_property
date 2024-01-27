import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { Link } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import ProductsTable from "@/Features/Products/ProductsTable";

export default function Products() {
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
