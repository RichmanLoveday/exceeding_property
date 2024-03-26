import { getUserTransactions } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export default function useUserTransactions(pageNum: number) {
  const [cookies] = useCookies(["exc_prop_user"]);
  const { userID } = useParams();

  const {
    data: transaction,
    isLoading: loadingTransaction,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getUserTransactions(cookies.exc_prop_user, pageNum, userID),
    queryKey: [`userTrans-page-${pageNum}`, userID],
  });

  return { transaction, loadingTransaction, refetch, error };
}
