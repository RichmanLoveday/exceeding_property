import { formatNigerianPrice } from "@/lib/utils";
import { Button } from "flowbite-react";

function WaitlistProduct({
  image,
  name,
  price,
  productID,
  userID,
  handleRemoveProduct,
}) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex justify-between space-x-2 mt-3 items-center p-3">
        <div className="w-14  ">
          <img src={image} className="w-full" alt={name} />
        </div>
        <div className="flex justify-start flex-col items-start italic text-[12px] font-normal text-white/80">
          <span>{name}</span>
          <span>{formatNigerianPrice(+price)}</span>
        </div>
      </div>
      <div className="p-2">
        <Button
          onClick={() => handleRemoveProduct(userID, productID)}
          color="blue"
          size="xs"
          pill
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default WaitlistProduct;
