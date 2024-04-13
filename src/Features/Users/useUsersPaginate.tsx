import { getPaginatedCategories, getPaginatedUsers } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useUsersPaginate(pageNum) {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: users,
    isLoading: loadingUsers,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getPaginatedUsers(cookies.exc_prop_user, pageNum),
    queryKey: [`all_users-page-${pageNum}`],
  });

  return { users, loadingUsers, refetch, error };
}
