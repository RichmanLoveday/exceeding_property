import { deletCategoryImage, deletProductImage } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function useDeleteCategoryImage() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["exc_prop_user"]);

  const {
    mutate: imageDelete,
    isPending: isDeleting,
    isSuccess: deleted,
  } = useMutation({
    //@ts-ignore
    mutationFn: ({ categoryID, image_url }) =>
      deletCategoryImage(categoryID, image_url, cookies.exc_prop_user),
    onSuccess: () => {
      toast.success("Category image deleted successfully");
      //@ts-ignore
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("Unable to delete image"),
  });

  return { imageDelete, isDeleting, deleted };
}
