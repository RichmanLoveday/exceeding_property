import { getOrders } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useOrders(pageNum: number) {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useQuery({
    queryFn: () => getOrders(cookies.exc_prop_user, pageNum),
    queryKey: [`all_orders-page-${pageNum}`],
  });

  return { orders, loadingOrders, error };
}
