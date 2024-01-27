import { getOrders } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useOrders() {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useQuery({
    queryFn: () => getOrders(cookies.exc_prop_user),
    queryKey: ["all_orders"],
  });

  return { orders, loadingOrders, error };
}
