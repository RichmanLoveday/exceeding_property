import { getProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useProduct(pageNum) {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: products,
    isLoading: loadingProducts,
    error,
  } = useQuery({
    queryKey: [`all_products-page-${pageNum}`],
    queryFn: () => getProducts(cookies.exc_prop_user, pageNum),
  });

  return { products, loadingProducts, error };
}
