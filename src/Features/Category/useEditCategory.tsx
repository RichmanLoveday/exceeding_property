import { updateCategory } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function useEditCategory() {
  const queryclient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    mutate: handleEditCategory,
    isPending: isEditingCategory,
    error: errorCategory,
    isSuccess: isEditedCategory,
  } = useMutation({
    mutationFn: ({
      category,
      categoryID,
    }: {
      category: object;
      categoryID: string;
    }) => updateCategory(category, categoryID, cookies.exc_prop_user),

    onSuccess: (res) => {
      toast.success(res.message);
      queryclient.invalidateQueries({
        queryKey: ["all_category"],
      });
    },
    onError: () => toast.error("Unable to update category, try again.."),
  });

  return {
    handleEditCategory,
    isEditingCategory,
    isEditedCategory,
    errorCategory,
  };
}
