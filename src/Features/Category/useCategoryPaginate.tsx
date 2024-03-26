import { getPaginatedCategories } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useCategoryPaginate(pageNum) {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: category,
    isLoading: loadingCatgory,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getPaginatedCategories(cookies.exc_prop_user, pageNum),
    queryKey: [`all_category-page-${pageNum}`],
  });

  return { category, loadingCatgory, refetch, error };
}
