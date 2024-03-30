import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useEditCategory from "./useEditCategory";
import { DeleteCategoryImage } from "./DeleteCategoryImage";

function EditCategory({ handleCloseModal, category }) {
  const {
    handleEditCategory,
    isEditingCategory,
    errorCategory,
    isEditedCategory,
  } = useEditCategory();

  const [image, setImage] = useState("");
  const [images, setImages] = useState(category.images);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      categoryID: category._id,
      images: category.images[0],
    },
  });

  //? check if category is added and close modal
  useEffect(() => {
    //? close modal
    if (isEditedCategory) {
      handleCloseModal();
    }
  }, [isEditedCategory]);

  // send data to api
  function onSubmit(data) {
    //? send result to server

    let formData = new FormData();

    formData.append("description", data.description);
    formData.append("name", data.name);

    //? check if new image is uploaded
    if (image.length > 0) {
      formData.append("images", image);
    } else {
      formData.append("images", category.images[0]);
    }

    handleEditCategory({ category: formData, categoryID: data.categoryID });
  }

  //? function to set image to empty for validation
  function emptyImages() {
    setImages([]);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-4"
      >
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Category
          </h3>

          {/*When error is encountered*/}
          {errorCategory ? (
            <small className="text-red-500 font-bold text-center">
              Error Adding Category, try again...
            </small>
          ) : (
            ""
          )}

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Category Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              className="mb-1"
              required
              {...register("name")}
            />

            <div className="mb-2 block">
              <Label htmlFor="name" value="Category Image" />
            </div>
            <TextInput
              id="image"
              type="file"
              className="mb-1"
              onChange={(e) => {
                //@ts-ignore
                setImage(e.target.files[0]);
              }}
              required={category.images.length == 0 ? true : false}
            />

            <div className="mb-1 w-20 h-20 relative">
              {images.length > 0 ? (
                <>
                  {" "}
                  <img
                    src={images.length > 0 ? images[0] : ""}
                    alt="no_image"
                    className="w-20 h-20"
                  />
                  <DeleteCategoryImage
                    categoryID={category._id}
                    image_url={category.images[0]}
                    emptyImage={emptyImages}
                  />
                </>
              ) : (
                ""
              )}
            </div>

            <div className="mb-2 block">
              <Label htmlFor="description" value="Category Description" />
            </div>
            <Textarea
              id="description"
              placeholder="Enter category description..."
              rows={4}
              className="mb-1 resize-none"
              required
              {...register("description")}
            />

            <TextInput
              id="categoryID"
              type="hidden"
              className="mb-1"
              {...register("categoryID")}
            />

            <TextInput
              id="images"
              type="hidden"
              className="mb-1"
              {...register("images")}
            />
          </div>
        </div>
        <div className="w-full">
          <Button
            disabled={isEditingCategory}
            type="submit"
            className="mx-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditCategory;
