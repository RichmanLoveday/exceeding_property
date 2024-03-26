import { deleteCategory } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function useCategoryDelete() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    mutate: categoryDelete,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useMutation({
    //? communicate with api to delete category
    mutationFn: (categoryID: string) =>
      deleteCategory(categoryID, cookies.exc_prop_user),

    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["all_category"],
      });
    },

    onError: () => toast.error("Unable to delete category"),
  });

  return { categoryDelete, isDeleting, isDeleted };
}

export default useCategoryDelete;
