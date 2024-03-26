import { editProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: handleEditing, isPending: isEditing } = useMutation({
    //@ts-ignore
    mutationFn: ({ productID, formData }) =>
      editProduct(productID, formData, cookies.exc_prop_user),
    onSuccess: () => {
      toast.success("Product Edited Successfully");
      //@ts-ignore
      queryClient.invalidateQueries({ active: true });

      navigate("/products");
    },

    onError: () => toast.error("Unable to edit product"),
  });

  return { handleEditing, isEditing };
}
