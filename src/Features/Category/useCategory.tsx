import { getCategories } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useCategory() {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: category,
    isLoading: loadingCatgory,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getCategories(cookies.exc_prop_user),
    queryKey: ["all_category"],
  });

  return { category, loadingCatgory, refetch, error };
}
