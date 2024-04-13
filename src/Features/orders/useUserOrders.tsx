import { getOrderById, getUserOrdersById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function useUserOrders(currentPage) {
  const { userId } = useParams();
  const [cookies] = useCookies(["exc_prop_user"]);
  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useQuery({
    queryKey: [`user-order-page-${currentPage}`, userId],
    queryFn: () =>
      getUserOrdersById(userId, currentPage, cookies.exc_prop_user),
  });

  return { orders, loadingOrders, error };
}

export default useUserOrders;
