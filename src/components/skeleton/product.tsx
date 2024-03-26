import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Image } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ProductSkeleton() {
  return (
    <>
      <div className="h-1 my-10" />
      <Table>
        <TableCaption>A list of your products...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[20rem]">Product</TableHead>
            <TableHead className="text-left w-52">Created At</TableHead>
            <TableHead className="text-lef w-52">Status</TableHead>
            <TableHead className="text-right ">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-3 font-medium text-left w-80">
                  <div className="w-[140px] h-[100px] bg-muted rounded-md grid place-items-center">
                    <Image />
                  </div>

                  <div>
                    <p className="h-8 font-semibold capitalize animate-pulse" />
                    <p className="h-4 animate-pulse bg-muted" />
                  </div>
                </TableCell>
                <TableCell className="text-left w-52">
                  <p className="h-4 animate-pulse bg-muted" />{" "}
                  {/* {dateFormatter.format(product.createdAt as unknown as Date)} */}
                </TableCell>
                <TableCell className="text-left w-52">
                  <Button
                    variant="ghost"
                    className={`
                 min-w-[107px] bg-muted animate-pulse
                `}
                  ></Button>
                </TableCell>
                <TableCell>
                  <div className="w-[127px] h-6 bg-muted animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
