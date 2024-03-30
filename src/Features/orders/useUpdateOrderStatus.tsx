import { updateOrderStatus } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    //@ts-ignore
    mutationFn: ({ orderId, type }) =>
      updateOrderStatus(orderId, type, cookies.exc_prop_user),

    onSuccess: (data) => {
      toast.success(`Order is set to ${data.orderStatus}`);
      //@ts-ignore
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("Unable to update order"),
  });

  return { updateStatus, isUpdating };
}

export default useUpdateOrderStatus;
