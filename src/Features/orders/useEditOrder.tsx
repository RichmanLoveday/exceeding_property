// import { editOrder } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { MyContext } from "../../pages/MyContext";

function useEditOrder() {
  const queryClient = useQueryClient();

  // const { mutate: orderEdit, isPending: isEditing } = useMutation({
  //   mutationFn: ({
  //     orderId,
  //     productId,
  //     quantity,
  //   }: {
  //     orderId: string;
  //     productId: string;
  //     quantity: string;
  //   }) => editOrder(orderId, productId, quantity),

  //   onSuccess: () => {
  //     toast.success("Order successfully edited");
  //     //@ts-ignore
  //     queryClient.invalidateQueries({ active: true });
  //   },

  //   onError: () => toast.error("Unable to edit order"),
  // });

  return { orderEdit: 1, isEditing: 1 };
}

export default useEditOrder;
