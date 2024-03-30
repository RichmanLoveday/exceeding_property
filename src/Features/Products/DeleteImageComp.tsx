import useDeleteProductImage from "@/Features/Products/useDeleteProductImage";
import { MySpinner } from "../../components/spinner";

export function DeleteProductImageComp({ productID, image_url }) {
  const { imageDelete, isDeleting } = useDeleteProductImage();

  if (!isDeleting)
    return (
      <span
        className="absolute -top-4 -right-2 cursor-pointer rounded-full border-2 border-white font-bold"
        onClick={() =>
          //@ts-ignore
          imageDelete({ productID: productID, image_url: image_url })
        }
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </span>
    );

  if (isDeleting)
    return (
      <div className="absolute -top-5 -right-2 cursor-pointer">
        <MySpinner />
      </div>
    );
}
