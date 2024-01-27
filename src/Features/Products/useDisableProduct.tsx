import { disableProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDisableProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: productDisable, isPending: isDisabaling } = useMutation({
    // communicate with api disable product
    mutationFn: (productId) => disableProduct(productId),

    onSuccess: (data) => {
      toast.success(`Product disabled successfully`);
      queryClient.invalidateQueries({
        queryKey: ["all_products"],
      });

      // navigate to produts
      navigate("/products");
    },

    onError: () => toast.error("Unable to disable product"),
  });

  return { productDisable, isDisabaling };
}

export default useDisableProduct;
