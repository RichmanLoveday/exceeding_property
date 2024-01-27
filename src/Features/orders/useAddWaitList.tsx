import { addToWaitlist } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useAddWailist() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);
  console.log(cookies.exc_prop_user);

  const { mutate: handleAddWaitlist, isPending: isAddingWaitlist } =
    useMutation({
      mutationFn: ({ userId, productId, userName }) =>
        addToWaitlist(userId, productId, cookies.exc_prop_user),

      onSuccess: (res) => {
        toast.success(res.message);
        queryclient.invalidateQueries({ active: true });

        navigate("/waitlist");
      },
      onError: (err) => toast.error(err.response.data.message),
    });

  return { handleAddWaitlist, isAddingWaitlist };
}
