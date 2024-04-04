import { deleteTransaction } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const { mutate: deleteTrans, isPending: isDeleting } = useMutation({
    //@ts-ignore
    mutationFn: (transID) => deleteTransaction(cookies.exc_prop_user, transID),

    onSuccess: (data) => {
      //@ts-ignore
      toast.success("Transaction Deleted Successfully");
      queryClient.invalidateQueries({
        type: "active",
      });
    },

    onError: () => toast.error("Unable to delete transaction"),
  });

  return { deleteTrans, isDeleting };
}

export default useDeleteTransaction;
