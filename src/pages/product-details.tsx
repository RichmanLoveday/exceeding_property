import BackButton from "@/components/back";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import ProductDetailsSkeleton from "@/components/skeleton/product-details";

import { Separator } from "@/components/ui/separator";
import { calculateDiscountPercentage, formatNigerianPrice } from "@/lib/utils";
import { ProductProps } from "@/types";
import { Edit } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useProductDatails from "../Features/Products/useProductDetails";
import useDisableProduct from "../Features/Products/useDisableProduct";
import useEnableProduct from "../Features/Products/useEnableProduct";
import { Button } from "flowbite-react";
import useCategory from "@/Features/Category/useCategory";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function ProductDetails() {
  const { productData, isLoading, error } = useProductDatails();
  const { productDisable, isDisabaling } = useDisableProduct();
  const { productEnable, isEnabling } = useEnableProduct();
  const { category, loadingCatgory } = useCategory();

  const [cookies] = useCookies();
  const navigate = useNavigate();

  //? check user login
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "object") {
      navigate("/login");
    }
  }, [cookies.exc_prop_user]);

  const product = productData?.data as ProductProps;

  const discount = calculateDiscountPercentage(
    product?.price as number,
    product?.discountPrice as number
  );

  //? handle loading state
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
            <Button
              size="xs"
              className="transition-all  hover:shadow-md hover:bg-slate-400"
            >
              <Link to={`/product/${product?._id}/edit`}>
                <Edit />
              </Link>
            </Button>
          </div>

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
                {formatNigerianPrice(product?.discountPrice)}
              </p>
            </div>

            <p>{product?.stock} stock left</p>
          </div>
          {product?.status ? (
            <Button
              size="xs"
              color="failure"
              className="float-right border-0 rounded-sm text-sm text-white p-1 hover:shadow-md hover:bg-slate-400 transition-all font-medium"
              onClick={() => productDisable(product?._id)}
              disabled={isDisabaling}
            >
              <p>Disable Product</p>
            </Button>
          ) : (
            <Button
              size="xs"
              color="success"
              className="float-right border-0 rounded-sm text-sm text-white p-1 hover:shadow-md hover:bg-slate-400 transition-all font-medium"
              onClick={() => productEnable(product?._id)}
              disabled={isEnabling}
            >
              <p>Enable Product</p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
