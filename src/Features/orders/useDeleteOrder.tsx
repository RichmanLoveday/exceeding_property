import { disableProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useOrderDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: orderDelete, isPending: isDeleting } = useMutation({
    // communicate with api disable product
    mutationFn: (orderId) => disableProduct(orderId),

    onSuccess: (data) => {
      toast.success(`Order deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ["all_orders"],
      });

      // navigate to produts
      navigate("/orders");
    },

    onError: () => toast.error("Unable to delete prder"),
  });

  return { orderDelete, isDeleting };
}

export default useOrderDelete;
