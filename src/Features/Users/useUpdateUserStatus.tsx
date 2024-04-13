import { deleteOrder } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    mutate: orderDelete,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useMutation({
    // communicate with api to delete order
    mutationFn: (orderId: string) =>
      deleteOrder(orderId, cookies.exc_prop_user),

    onSuccess: () => {
      toast.success(`Order deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ["all_orders"],
      });

      //? goback to all order page
      navigate(-1);
    },

    onError: () => toast.error("Unable to delete prder"),
  });

  return { orderDelete, isDeleting, isDeleted };
}

export default useUpdateUserStatus;
