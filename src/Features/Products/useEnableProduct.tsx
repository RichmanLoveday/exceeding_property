import { enableProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function useEnableProduct() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: productEnable, isPending: isEnabling } = useMutation({
    mutationFn: (productId: string) =>
      enableProduct(productId, cookies.exc_prop_user),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        type: "active",
      });
    },

    onError: () => toast.error("Unable to enable product"),
  });

  return { productEnable, isEnabling };
}

export default useEnableProduct;
