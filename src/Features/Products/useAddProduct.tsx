import { createProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useAddProduct() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  const { mutate: handleAddProcduct, isPending: isAddingProduct } = useMutation(
    {
      mutationFn: (products) => createProduct(products),
      onSuccess: (res) => {
        toast.success(res.message);
        queryclient.invalidateQueries({ active: true });

        navigate("/products");
      },
      onError: (err) => toast.error(err.response.data.message),
    }
  );

  return { handleAddProcduct, isAddingProduct };
}
