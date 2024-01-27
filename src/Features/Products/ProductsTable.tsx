import ProductSkeleton from "@/components/skeleton/product";
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
import { ProductProps } from "@/types";

function ProductsTable() {
  const { products, loadingProducts, error } = useProduct();

  const productData = products?.data as ProductProps[];

  if (error) return <p className=" mt-[10%]">No product could be found</p>;

  if (loadingProducts || !productData || !Array.isArray(productData)) {
    return <ProductSkeleton />;
  }

  return (
    <Table>
      <TableCaption>A list of your products...</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[20rem]">Product</TableHead>
          <TableHead className="text-left w-52">Created At</TableHead>
          <TableHead className="text-left w-52">Status</TableHead>
          <TableHead className="text-right ">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productData.map((product) => (
          <ProductRow key={product._id} products={product} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ProductsTable;
