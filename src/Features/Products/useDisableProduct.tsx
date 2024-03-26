import { disableProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function useDisableProduct() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    mutate: productDisable,
    isPending: isDisabaling,
    isError,
  } = useMutation({
    // communicate with api disable product
    mutationFn: (productId: string) =>
      disableProduct(productId, cookies.exc_prop_user),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        type: "active",
      });
    },

    onError: (data) => toast.error(data.message),
  });

  return { productDisable, isDisabaling, isError };
}

export default useDisableProduct;
