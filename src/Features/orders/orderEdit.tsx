import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useEditOrder from "./useEditOrder";

function OrderEdit({ orderId, productId, quantityValue }) {
  const { orderEdit, isEditing } = useEditOrder();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      quantity: quantityValue,
    },
  });

  // get errors
  const { errors } = formState;

  // send data to api
  function onSubmit(data) {
    // send data to api
    orderEdit(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Edit Order Quantity
        </h3>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="quantity" value="Quantity" />
          </div>
          <TextInput
            className="mb-1"
            id="quantity"
            placeholder="Enter quantity"
            {...register("quantity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Quantity should be atleast one",
              },
            })}
          />
          {errors?.quantity ? (
            <div className=" bg-red-600/70 text-white font-light italic w-full p-1 rounded-sm">
              {errors?.quantity?.message}
            </div>
          ) : (
            ""
          )}
          <TextInput type="hidden" {...register("orderId")} value={orderId} />
          <TextInput
            type="hidden"
            {...register("productId")}
            value={productId}
          />
        </div>
        <div className="w-full">
          <Button type="submit" disabled={isEditing} className="mx-auto">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default OrderEdit;
