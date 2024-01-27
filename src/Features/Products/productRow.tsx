import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
import { formatNigerianPrice } from "@/lib/utils";
import { determineStatus } from "@/lib/utils";
import Options from "@/components/ui/Options";
import { ProductRowProps } from "@/types";

function ProductRow({ products }: ProductRowProps) {
  const { _id, name, description, createdAt, stock, price, images } = products;

  return (
    <TableRow>
      <TableCell>
        <Link
          to={`/product/${_id}`}
          className="flex items-center gap-5 font-medium text-left w-80"
        >
          {!images[0] ? (
            <div className="min-w-[140px] min-h-[100px] bg-muted rounded-md grid place-items-center">
              <Image className="" />
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
      <TableCell className="text-left w-52">
        <Button
          variant="ghost"
          className={`
        ${
          +stock < 1
            ? "bg-red-300 text-red-700"
            : +stock < 5
            ? "bg-amber-100 text-amber-700"
            : "bg-green-100 text-green-900"
        }
      `}
        >
          {determineStatus(stock)}
        </Button>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-3">
          {formatNigerianPrice(price as number)}
          <Options productId={_id} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
