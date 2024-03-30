import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { ProductProps } from "@/types";
import React, { FormEvent, useEffect, useState } from "react";
import BackButton from "@/components/back";
import EditProductSkeleton from "@/components/skeleton/edit-product";
import useProductDatails from "../Features/Products/useProductDetails";
import useEditProduct from "../Features/Products/useEditProduct";
import useCategory from "@/Features/Category/useCategory";
import { Select, Spinner, TextInput } from "flowbite-react";
import { useCookies } from "react-cookie";
import { Loader } from "lucide-react";
import { DeleteProductImageComp } from "@/Features/Products/DeleteImageComp";

export default function EditProduct() {
  const { productData, isLoading } = useProductDatails();
  const { handleEditing, isEditing } = useEditProduct();
  const { category, error, loadingCatgory } = useCategory();

  const [cookies] = useCookies();
  const navigate = useNavigate();

  //? check user login
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "object") {
      navigate("/login");
    }
  }, [cookies.exc_prop_user]);

  const product = productData?.data;

  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState(product?.name);
  const [cat, setCategory] = useState(product?.category._id);
  const [price, setPrice] = useState(product?.price);
  const [discount, setDiscount] = useState(product?.discountPrice);
  const [description, setdescription] = useState(product?.description);
  const [stock, setStock] = useState(product?.stock);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newImages = Array.from(selectedFiles);
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  async function handleEditProduct(e) {
    e.preventDefault();
    let formData = new FormData();

    if (images.length > 0) {
      console.log("yessssss");
      images.forEach((image) => {
        formData.append(`images`, image);
      });
    } else {
      product.images.forEach((image) => {
        formData.append(`images`, image);
      });
    }

    formData.append("name", productName);
    formData.append("category", cat);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("discountPrice", discount);
    formData.append("description", description);
    console.log(product?.id);
    //@ts-ignore
    handleEditing({ productID: product?.id, formData: formData });
  }

  function deleteImage(image_url) {
    //@ts-ignore
    imageDelete({ productID: product?.id, image_url: image_url });
  }

  if (isLoading) {
    return <EditProductSkeleton />;
  }

  if (error) return <p className=" mt-[10%]">Product could not be found</p>;

  return (
    <>
      <div className="h-1 my-10" />
      <BackButton />

      <Card className="max-w-3xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold ">
            Edit Product {product?.name}
          </CardTitle>
          <CardDescription>Edit product here</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleEditProduct}
            className="flex flex-col w-full gap-5 "
          >
            <div className="flex flex-col items-start w-full gap-5 lg:flex-row">
              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="name">Name</Label>
                  <TextInput
                    className=""
                    name="name"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="description">description</Label>
                  <TextInput
                    name="description"
                    type="text"
                    defaultValue={description}
                    onChange={(e) => setdescription(e.target.value)}
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
                    {loadingCatgory ? (
                      <Spinner aria-label="Default status example" />
                    ) : (
                      category?.map((cat) => {
                        let selected =
                          product?.category._id == cat._id ? true : false;
                        return (
                          <option
                            selected={selected}
                            key={cat._id}
                            value={cat.name}
                          >
                            {cat.name}
                          </option>
                        );
                      })
                    )}
                  </Select>
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="price">Price</Label>
                  <TextInput
                    className=""
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    defaultValue={product?.price}
                    min={0}
                    required
                  />
                </div>
              </section>

              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discountPrice">Discount Price</Label>
                  <TextInput
                    className=""
                    name="discountPrice"
                    type="number"
                    defaultValue={product?.discountPrice}
                    onChange={(e) => setDiscount(e.target.value)}
                    min={0}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="stock">Stock</Label>
                  <TextInput
                    className=""
                    name="stock"
                    type="number"
                    defaultValue={product?.stock}
                    onChange={(e) => setStock(e.target.value)}
                    min={0}
                    required
                  />
                </div>
              </section>
            </div>
            <div>
              <div className="w-full space-y-1 text-left">
                <Label htmlFor="images">Images</Label>
                <TextInput
                  className="cursor-pointer"
                  name="images"
                  type="file"
                  min={0}
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  required={product?.images.length == 0 ? true : false}
                />
              </div>
              <div className="flex justify-center space-x-2 items-center w-full p-2 mt-8 flex-wrap">
                {product?.images.map((img) => {
                  return (
                    <div className="relative">
                      <img
                        title="images"
                        key={img}
                        src={img}
                        width={100}
                        height={100}
                      />
                      <DeleteProductImageComp
                        productID={product?.id}
                        image_url={img}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Button>
              {isEditing ? (
                <>
                  Editing.... <Loader className="ml-2 animate-spin" />
                </>
              ) : (
                "Edit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
