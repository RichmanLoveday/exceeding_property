import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useProduct } from "../Products/useProduct";
import useAddWailist from "../orders/useAddWaitList";

function AddWaitlist({ userId, customerName }) {
  const { products, loadingProducts } = useProduct();
  const { handleAddWaitlist, isAddingWaitlist } = useAddWailist();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: userId,
      customerName: customerName,
    },
  });

  // send data to api
  function onSubmit(data) {
    handleAddWaitlist(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Add to Waitlist
        </h3>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="userId" value="Customer Name" />
          </div>
          <TextInput
            id="customerName"
            className="mb-1"
            {...register("customerName")}
            value={customerName}
            disabled={true}
          />

          <TextInput id="userId" type="hidden" {...register("userId")} />

          <div className="mb-2 block">
            <Label htmlFor="products" value="Select product" />
          </div>
          <Select id="products" {...register("productId")} required>
            <option value="">Select Product</option>
            {loadingProducts ? (
              <Spinner aria-label="Default status example" />
            ) : (
              products?.data?.map((prod) => (
                <option value={prod._id}>{prod.name}</option>
              ))
            )}
          </Select>
        </div>
      </div>
      <div className="w-full">
        <Button disabled={isAddingWaitlist} type="submit" className="mx-auto">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddWaitlist;
