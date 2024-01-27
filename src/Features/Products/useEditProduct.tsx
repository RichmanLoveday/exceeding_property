import { editProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleEditing, isPending: isEditing } = useMutation({
    mutationFn: (products) => editProduct(products),
    onSuccess: () => {
      toast.success("Product Edited Successfully");
      queryClient.invalidateQueries({ active: true });

      navigate("/products");
    },

    onError: () => toast.error("Unable to edit product"),
  });

  return { handleEditing, isEditing };
}
