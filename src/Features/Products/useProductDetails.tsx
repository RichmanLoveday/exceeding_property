import { getProductById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

function useProductDatails() {
  const { productId } = useParams();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      getProductById({ productId: productId, token: cookies.exc_prop_user }),
  });

  return { productData, isLoading, error };
}

export default useProductDatails;
