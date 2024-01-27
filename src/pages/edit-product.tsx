import { useNavigate, useParams } from "react-router-dom";

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
import { AddProductProps, ProductProps } from "@/types";
import { Loader } from "lucide-react";
import { FormEvent } from "react";
import BackButton from "@/components/back";
import EditProductSkeleton from "@/components/skeleton/edit-product";
import useProductDatails from "../Features/Products/useProductDetails";
import useEditProduct from "../Features/Products/useEditProduct";

export default function EditProduct() {
  const { productId } = useParams();

  const { productData, isLoading, error } = useProductDatails();
  const { handleEditing, isEditing } = useEditProduct();

  const product = productData?.data as ProductProps;

  function handleEditProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as AddProductProps;

    const payload = {
      ...formData,
      _id: productId,
    };

    console.log(payload);

    // send data
    handleEditing(payload);
  }

  if (error) return <p className=" mt-[10%]">Product could not be found</p>;

  if (isLoading) {
    return <EditProductSkeleton />;
  }

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
                  <Input
                    className=""
                    name="name"
                    type="text"
                    defaultValue={product?.name}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    className=""
                    name="description"
                    type="text"
                    defaultValue={product?.description}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    className=""
                    name="category"
                    type="text"
                    defaultValue={product?.description}
                    required
                  />
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    className=""
                    name="price"
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
                  <Input
                    className=""
                    name="discountPrice"
                    type="number"
                    defaultValue={product?.discountPrice}
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
                    defaultValue={product?.stock}
                    min={0}
                    required
                  />
                </div>

                {/* {
                  product?.images.map((img) => {
                    return (
                      <img key={img} src={img} width={200} height={200} />
                    )
                  })
                } */}

                {/* <div className="w-full space-y-1 text-left">
                  <Label htmlFor="images">Images</Label>
                  <Input className="cursor-pointer" name="images" type="file" defaultValue={product?.images} min={0} multiple />
                </div> */}
              </section>
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
