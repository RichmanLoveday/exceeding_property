import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Image } from "lucide-react";
import { formatNigerianPrice } from "@/lib/utils";

type ProductProps = {
  stock: string | number;
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: string | number;
  discountPrice: string | number;
  createdAt: string;
  updatedAt: string;
};

export default function ProductCard(product: ProductProps) {
  return (
    <Card>
      <Link to={`/product/${product._id}`} aria-label={`View ${product.name}`}>
        <CardHeader>
          <AspectRatio ratio={4 / 3} className="w-full h-full">
            {product?.images?.length ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Image
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className=" p-4">
          <CardTitle className="line-clamp-1 capitalize">
            {product.name}
          </CardTitle>
          <CardDescription>
            {formatNigerianPrice(product.price as number)}
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
