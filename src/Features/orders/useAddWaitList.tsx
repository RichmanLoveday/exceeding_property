import { addToWaitlist } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function useAddWailist() {
  const queryclient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);
  console.log(cookies.exc_prop_user);

  const {
    mutate: handleAddWaitlist,
    isPending: isAddingWaitlist,
    isSuccess: isAddedWaitlist,
  } = useMutation({
    mutationFn: ({
      userId,
      productId,
    }: {
      userId: string;
      productId: string;
    }) => addToWaitlist(userId, productId, cookies.exc_prop_user),

    onSuccess: (res) => {
      toast.success(res.message);
      queryclient.invalidateQueries({
        queryKey: ["all_waitlist"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { handleAddWaitlist, isAddingWaitlist, isAddedWaitlist };
}
