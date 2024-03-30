import { deletProductImage } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteProductImage() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: imageDelete, isPending: isDeleting } = useMutation({
    //@ts-ignore
    mutationFn: ({ productID, image_url }) =>
      deletProductImage(productID, image_url, cookies.exc_prop_user),
    onSuccess: () => {
      toast.success("Product image deleted successfully");
      //@ts-ignore
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("Unable to delete image"),
  });

  return { imageDelete, isDeleting };
}
