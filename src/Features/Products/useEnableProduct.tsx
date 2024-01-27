import { disableProduct, enableProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useEnableProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: productEnable, isPending: isEnabling } = useMutation({
    // communicate with api disable product
    mutationFn: (productId) => enableProduct(productId),

    onSuccess: (data) => {
      toast.success(`Product enabled successfully`);
      queryClient.invalidateQueries({
        queryKey: ["all_products"],
      });

      // navigate to produts
      navigate("/products");
    },

    onError: () => toast.error("Unable to enable product"),
  });

  return { productEnable, isEnabling };
}

export default useEnableProduct;
