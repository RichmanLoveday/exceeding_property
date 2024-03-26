import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAddCategory from "./useAddCategory";
import { useEffect, useState } from "react";

function AddCategory({ handleCloseModal }: { handleCloseModal: Function }) {
  const {
    handleAddCategory,
    isAddingCategory,
    errorCategory,
    isAddedCategory,
  } = useAddCategory();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [image, setImage] = useState();

  //? check if category is added and close modal
  useEffect(() => {
    //? close modal
    if (isAddedCategory) {
      handleCloseModal();
    }
  }, [isAddedCategory]);

  //? send data to api
  function onSubmit(data) {
    //? send result to server
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("name", data.name);
    formData.append("images", image);

    handleAddCategory(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Add New Category
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
            required
            onChange={(e) => {
              //@ts-ignore
              setImage(e.target.files[0]);
            }}
          />

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
        </div>
      </div>
      <div className="w-full">
        <Button disabled={isAddingCategory} type="submit" className="mx-auto">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddCategory;
