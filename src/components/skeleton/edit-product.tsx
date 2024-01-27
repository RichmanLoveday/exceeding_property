import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import BackButton from "../back"

export default function EditProductSkeleton() {
  return (
    <>
      <div className="h-1 my-10" />
      <BackButton />

      <Card className="max-w-3xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold ">
            Edit Product
          </CardTitle>
          <CardDescription>Edit product here</CardDescription>
        </CardHeader>

        <CardContent>
          <section className="flex flex-col w-full gap-5 ">
            <div className="flex flex-col items-start w-full gap-5 lg:flex-row">
              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discountPrice">Name</Label>
                  <div className="h-10 mt-2 rounded bg-muted animate-pulse"></div>
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discountPrice">Description</Label>
                  <div className="h-10 mt-2 rounded bg-muted animate-pulse"></div>
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discountPrice">Category</Label>
                  <div className="h-10 mt-2 rounded bg-muted animate-pulse"></div>
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discountPrice"> Price</Label>
                  <div className="h-10 mt-2 rounded bg-muted animate-pulse"></div>
                </div>
              </section>

              <section className="w-full space-y-2">
                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="discountPrice">Discount Price</Label>
                  <div className="h-10 mt-2 rounded bg-muted animate-pulse"></div>
                </div>

                <div className="w-full space-y-1 text-left">
                  <Label htmlFor="stock">Stock</Label>
                  <div className="h-10 mt-2 rounded bg-muted animate-pulse"></div>
                </div>
              </section>
            </div>

            <Button>Edit</Button>
          </section>
        </CardContent>
      </Card>
    </>
  )
}
