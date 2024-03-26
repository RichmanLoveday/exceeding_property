import { addNewCategory } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function useAddCategory() {
  const queryclient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    mutate: handleAddCategory,
    isPending: isAddingCategory,
    error: errorCategory,
    isSuccess: isAddedCategory,
  } = useMutation({
    mutationFn: (category: object) =>
      addNewCategory(category, cookies.exc_prop_user),

    onSuccess: (res) => {
      toast.success(res.message);
      queryclient.invalidateQueries({
        queryKey: ["all_category"],
      });
    },
    onError: () => toast.error("Unable to add category, try again.."),
  });

  return {
    handleAddCategory,
    isAddingCategory,
    isAddedCategory,
    errorCategory,
  };
}
