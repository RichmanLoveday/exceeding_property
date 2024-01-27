import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BadgeX, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import useDisableProduct from "@/Features/Products/useDisableProduct";

const Options = ({ productId, status }: { productId: string }) => {
  const { productDisable, isDisabaling } = useDisableProduct();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link to={`/product/${productId}`}>Product Details</Link>
        </DropdownMenuItem>

        {!status ? (
          <DropdownMenuItem>
            <button
              type="button"
              disabled={isDisabaling}
              onClick={() => productDisable(productId)}
              className=" flex justify-between p-2 my-2 cursor-pointer"
            >
              Disable
              <BadgeX />
            </button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link to={`/product/${productId}`}>Disable Product</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
