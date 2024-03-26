import { TableCell, TableRow } from "@/components/ui/table";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
import { formatNigerianPrice } from "@/lib/utils";
import { determineStatus } from "@/lib/utils";
import Options from "@/components/ui/Options";
import { ProductRowProps } from "@/types";
import { Badge } from "flowbite-react";

function ProductRow({ products }: ProductRowProps) {
  const { _id, name, description, createdAt, stock, price, images, status } =
    products;

  return (
    <TableRow>
      <TableCell>
        <Link
          to={`/product/${_id}`}
          className="flex items-center gap-5 font-medium text-left w-80"
        >
          {!images[0] ? (
            <div className="min-w-[140px] min-h-[100px] bg-muted rounded-md grid place-items-center">
              <Image />
            </div>
          ) : (
            <div className="min-w-[140px] min-h-[100px] relative">
              <img
                src={images[0]}
                alt={name}
                className="absolute inset-0 object-fill w-full h-full rounded-md"
              />
            </div>
          )}
          <div>
            <p className="font-semibold capitalize">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </Link>
      </TableCell>
      <TableCell className="text-left w-52">
        {new Date(createdAt).toDateString()}
        {/* {dateFormatter.format(product.createdAt as unknown as Date)} */}
      </TableCell>
      <TableCell>
        <div className="w-1/2 text-center">
          <Badge className="px-4" color={determineStatus(stock)?.color}>
            {determineStatus(stock)?.text}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end py-3">
          {formatNigerianPrice(price as number)}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex justify-end">
          <Options productId={_id} status={status} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
