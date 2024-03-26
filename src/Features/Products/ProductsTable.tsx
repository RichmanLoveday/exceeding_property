import ProductSkeleton from "@/components/skeleton/product";
import PaginationCounter from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRow from "@/Features/Products/productRow";
import { useProduct } from "@/Features/Products/useProduct";
import { useState } from "react";

function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loadingProducts, error } = useProduct(currentPage);

  const productData = products?.docs;
  const toatalPages = products?.totalPages;

  if (error) return <p className="mt-[10%]">No product could be found</p>;

  if (loadingProducts || !productData || !Array.isArray(productData)) {
    return <ProductSkeleton />;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[20rem]">Product</TableHead>
            <TableHead className="text-left w-52">Created At</TableHead>
            <TableHead className="text-left w-52">Status</TableHead>
            <TableHead className="text-right ">Amount</TableHead>
            <TableHead className="text-right ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData.map((product) => (
            <ProductRow key={product._id} products={product} />
          ))}
        </TableBody>
      </Table>

      <PaginationCounter
        count={toatalPages}
        handlePageChange={handlePageChange}
        currentpage={currentPage}
      />
    </div>
  );
}

export default ProductsTable;
