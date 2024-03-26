import { getOrderById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function useOrderDetails() {
  const { orderId } = useParams();
  const [cookies] = useCookies(["exc_prop_user"]);

  console.log(orderId);

  const {
    data: orderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId, cookies.exc_prop_user),
  });

  return { orderData, isLoading, error };
}

export default useOrderDetails;
