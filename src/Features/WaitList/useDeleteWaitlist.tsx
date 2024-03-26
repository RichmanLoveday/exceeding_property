import { waitlistRemove } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteWaitlist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: waitlistDelete, isPending: isDeleting } = useMutation({
    // communicate with api disable product
    mutationFn: ({ userID, productID }) =>
      waitlistRemove(userID, productID, cookies.exc_prop_user),

    onSuccess: (data) => {
      toast.success(`Product removed from waitlist successful`);

      queryClient.invalidateQueries({
        queryKey: ["all_waitlist"],
      });

      // navigate to produts
      navigate("/waitlist");
    },

    onError: () => toast.error("Unable to remove product"),
  });

  return { waitlistDelete, isDeleting };
}

export default useDeleteWaitlist;
