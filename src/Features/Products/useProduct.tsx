import { getProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useProduct() {
  const {
    data: products,
    isLoading: loadingProducts,
    error,
  } = useQuery({
    queryKey: ["all_products"],
    queryFn: getProducts,
  });

  return { products, loadingProducts, error };
}
