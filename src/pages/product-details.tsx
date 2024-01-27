import BackButton from "@/components/back";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import ProductDetailsSkeleton from "@/components/skeleton/product-details";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calculateDiscountPercentage, formatNigerianPrice } from "@/lib/utils";
import { ProductProps } from "@/types";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import useProductDatails from "../Features/Products/useProductDetails";
import useDisableProduct from "../Features/Products/useDisableProduct";
import useEnableProduct from "../Features/Products/useEnableProduct";

export default function ProductDetails() {
  const { productData, isLoading, error } = useProductDatails();
  const { productDisable, isDisabaling } = useDisableProduct();
  const { productEnable, isEnabling } = useEnableProduct();

  const product = productData?.data as ProductProps;

  const discount = calculateDiscountPercentage(
    product?.price as number,
    product?.discountPrice as number
  );

  // handle loading state
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // handle error
  if (error) return <p className=" mt-[10%]">Product could not be found</p>;

  return (
    <>
      <div className="h-1 my-10" />
      <BackButton />

      <h1 className="py-10 text-2xl font-semibold text-left capitalize">
        {product?.name}
      </h1>

      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product?.images ?? []}
          options={{
            loop: true,
          }}
        />

        <Separator className="mt-4 md:hidden" />

        <div className="w-full space-y-5 text-left md:w-1/2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold capitalize">{product?.name}</h2>
            <Button variant={"link"}>
              <Link to={`/product/${product?._id}/edit`}>
                <Edit />
              </Link>
            </Button>
          </div>

          <Button asChild>
            <p>{product?.category}</p>
          </Button>

          <div>
            <p>Description: </p>
            <p>{product?.description}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <div>
              <p>Price: </p>
              <div className="flex items-center gap-5">
                <p
                  className={`text-base text-muted-foreground ${
                    Number(product?.discountPrice) <= Number(product?.price)
                      ? "line-through"
                      : ""
                  }`}
                >
                  {formatNigerianPrice(product?.price as number)}
                </p>
                <p className="text-red-500">{discount}%</p>
              </div>
              <p className="text-base text-muted-foreground">
                {formatNigerianPrice(product?.discountPrice as number)}
              </p>
            </div>

            <p>{product?.stock} stock left</p>
          </div>
          {product?.status ? (
            <button
              className="float-right border-0 rounded-sm bg-slate-300 text-sm text-black p-4 hover:shadow-md hover:bg-slate-400 transition-all font-medium"
              onClick={() => productDisable(product?._id)}
              disabled={isDisabaling}
            >
              <p>Disable Product</p>
            </button>
          ) : (
            <button
              className="float-right border-0 rounded-sm bg-slate-300 text-sm text-black p-4 hover:shadow-md hover:bg-slate-400 transition-all font-medium"
              onClick={() => productEnable(product?._id)}
              disabled={isEnabling}
            >
              <p>Enable Product</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
