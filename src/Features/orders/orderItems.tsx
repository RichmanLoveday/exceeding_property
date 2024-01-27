import { formatNigerianPrice } from "@/lib/utils";
import { Button } from "flowbite-react";
import { Pencil, X } from "lucide-react";

function OrderItems({ orders = {}, handleOrderEdit }) {
  console.log(orders);
  const { products } = orders;
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mt-5 py-5 border-b border-b-gray-300 dark:border-b-gray-300/10">
        <div className="text-slate-400 capitalize dark:text-white dark:font-light">
          Product
        </div>
        <div className="text-slate-400 capitalize dark:text-white dark:font-light">
          Cost
        </div>
        <div className="text-slate-400 capitalize dark:text-white dark:font-light">
          Quantity
        </div>
        <div className="text-slate-400 capitalize dark:text-white dark:font-light">
          Sub-Total
        </div>
        <div className="text-slate-400 capitalize dark:text-white dark:font-light">
          <Pencil />
        </div>
      </div>

      {products.map((prod, index) => (
        <div
          key={prod.product._id}
          className="flex justify-between items-center mb-5 py-5 border-b border-b-gray-300 dark:border-b-gray-300/10 p"
        >
          <div className="flex justify-center items-center text-left font-normal tracking-wide w-[10%]">
            <span className="w-50">{prod.product.name}</span>
          </div>
          <div className="font-normal tracking-wide -ml-[50px] w-[10%] float-left">
            <span>{formatNigerianPrice(prod.product.price)}</span>
          </div>
          <div className="font-normal flex justify-center -ml-[50px] items-baseline w-[10%] text-center">
            <X size="12" />
            {prod.quantity}
          </div>
          <div className="font-normal flex justify-center items-baseline w-[10%] text-center">
            {formatNigerianPrice(prod.product.price * prod.quantity)}
          </div>
          <Button
            onClick={() => handleOrderEdit(prod.quantity, prod.product._id)}
            size="sm"
            color="blue"
          >
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
}

export default OrderItems;
