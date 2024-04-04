import { updateStatus } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function useUpdateTransStatus() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: transUpdate, isPending: isUpdating } = useMutation({
    //@ts-ignore
    mutationFn: ({ status, transID }) =>
      updateStatus(cookies.exc_prop_user, transID, status),

    onSuccess: (data) => {
      //@ts-ignore
      toast.success("Transaction Updated Successfully");
      queryClient.invalidateQueries({
        type: "active",
      });
    },

    onError: () => toast.error("Unable to update status"),
  });

  return { transUpdate, isUpdating };
}

export default useUpdateTransStatus;
