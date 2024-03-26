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
import React, { FormEvent, useState } from "react";
import useAddProduct from "../Features/Products/useAddProduct";
import { Select, Spinner } from "flowbite-react";
import useCategory from "@/Features/Category/useCategory";

export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [cat, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const { isAddingProduct, handleAddProcduct } = useAddProduct();
  const { category, error, loadingCatgory } = useCategory();

  /**
   * Generates a base64 string from a given File object.
   *
   * @param {File | null} file - The File object to generate the base64 string from.
   * @return {void}
   */
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newImages = Array.from(selectedFiles);
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  async function handleCreateProduct(e) {
    e.preventDefault();
    let formData = new FormData();
    console.log(images);

    images.forEach((image) => {
      formData.append(`images`, image);
    });

    formData.append("name", productName);
    formData.append("category", cat);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("discountPrice", discount);
    formData.append("description", description);

    //@ts-ignore
    handleAddProcduct(formData);
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
            className="flex flex-col w-full gap-5"
          >
            <div className="flex flex-col items-start w-full gap-5 lg:flex-row">
              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className=""
                    onChange={(e) => setProductName(e.target.value)}
                    name="name"
                    type="text"
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    onChange={(e) => setDescription(e.target.value)}
                    className=""
                    name="description"
                    type="text"
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onChange={(e) => setCategory(e.target.value)}
                    id="category"
                    name="category"
                    required
                  >
                    <option value="">Select Category</option>
                    {category?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    className=""
                    name="price"
                    type="number"
                    min={0}
                    onChange={(e) => setPrice(e.target.value)}
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
                    onChange={(e) => setDiscount(e.target.value)}
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
                    onChange={(e) => setStock(e.target.value)}
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
                    required
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
