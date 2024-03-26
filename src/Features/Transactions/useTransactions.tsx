import { getTransactions } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useTransactions(pageNum: number) {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: transaction,
    isLoading: loadingTransaction,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getTransactions(cookies.exc_prop_user, pageNum),
    queryKey: [`all_transactions-page-${pageNum}`],
  });

  return { transaction, loadingTransaction, refetch, error };
}
