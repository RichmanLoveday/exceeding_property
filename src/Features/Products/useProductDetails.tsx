import { getProductById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useProductDatails() {
  const { productId } = useParams();
  console.log(productId);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById({ productId: productId }),
  });

  return { productData, isLoading, error };
}

export default useProductDatails;
