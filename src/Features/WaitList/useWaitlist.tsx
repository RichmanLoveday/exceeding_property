import { getWaitlists } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useWaitlist() {
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    data: waitlist,
    isLoading: loadingWaitlist,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getWaitlists(cookies.exc_prop_user),
    queryKey: ["all_waitlist"],
  });

  return { waitlist, loadingWaitlist, refetch, error };
}
