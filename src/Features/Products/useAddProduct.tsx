import { createProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useAddProduct() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: handleAddProcduct, isPending: isAddingProduct } = useMutation(
    {
      mutationFn: (products) => createProduct(products, cookies.exc_prop_user),
      onSuccess: (res) => {
        toast.success(res.message);
        //@ts-ignore
        queryclient.invalidateQueries({ active: true });

        navigate("/products");
      },
      //@ts-ignore
      onError: (err) => toast.error(err.response.data.message),
    }
  );

  return { handleAddProcduct, isAddingProduct };
}
