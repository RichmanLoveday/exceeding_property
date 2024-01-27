import BackButton from "@/components/back";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddProductProps } from "@/types";
import { Loader } from "lucide-react";
import React, { FormEvent } from "react";
import useAddProduct from "../Features/Products/useAddProduct";

export default function AddProduct() {
  const [images, setImages] = React.useState<string[]>([]);
  const { isAddingProduct, handleAddProcduct } = useAddProduct();

  /**
   * Generates a base64 string from a given File object.
   *
   * @param {File | null} file - The File object to generate the base64 string from.
   * @return {void}
   */
  const getBase64Strings = (file: File | null) => {
    const reader = new FileReader();
    let dataUrl: string | null | ArrayBuffer | undefined = null;

    reader.onload = (e) => {
      dataUrl = e.target?.result;
      // console.log("Image Data as String:", dataUrl)
      setImages((prev) => [...prev, dataUrl as string] || (dataUrl as string));
    };

    reader.readAsDataURL(file as File);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      getBase64Strings(file);
    }

    // setSelectedFiles(files)
  };

  async function handleCreateProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as AddProductProps;

    const payload = {
      ...formData,
      images: images,
    };

    console.log(payload);
    handleAddProcduct(payload);
  }

  return (
    <>
      <div className="my-20" />

      <BackButton />

      <Card className="max-w-3xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold ">Add Product</CardTitle>
          <CardDescription>Add a new product here</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleCreateProduct}
            className="flex flex-col w-full gap-5 "
          >
            <div className="flex flex-col items-start w-full gap-5 lg:flex-row">
              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="name">Name</Label>
                  <Input className="" name="name" type="text" required />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="description">Description</Label>
                  <Input className="" name="description" type="text" required />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="category">Category</Label>
                  <Input className="" name="category" type="text" required />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    className=""
                    name="price"
                    type="number"
                    min={0}
                    required
                  />
                </div>
              </section>

              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discount">Discount Price</Label>
                  <Input
                    className=""
                    name="discountPrice"
                    type="number"
                    min={0}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    className=""
                    name="stock"
                    type="number"
                    min={0}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="images">Images</Label>
                  <Input
                    className="cursor-pointer"
                    // name="images"
                    type="file"
                    min={0}
                    multiple
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
              </section>
            </div>

            <Button>
              {isAddingProduct ? (
                <>
                  Submitting.... <Loader className="ml-2 animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
