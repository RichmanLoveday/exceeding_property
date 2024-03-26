import { Image } from "lucide-react"
import { Separator } from "../ui/separator"

export default function ProductDetailsSkeleton() {
  return (
    <>
      <div className="h-1 my-10" />
      <div className="w-64 h-10 mb-5 animate-pulse bg-muted" />
      <div className="w-56 h-6 mb-5 animate-pulse bg-muted" />

      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
        <div
          aria-label="Product Placeholder"
          role="img"
          aria-roledescription="placeholder"
          className="flex items-center justify-center flex-1 w-full h-full aspect-square bg-secondary"
        >
          <Image className="h-9 w-9 text-muted-foreground" aria-hidden="true" />
        </div>

        <Separator className="mt-4 md:hidden" />

        <div className="w-full space-y-5 text-left md:w-1/2">
          <div className="w-56 h-6 bg-muted animate-pulse" />

          <div className="w-56 h-6 bg-muted animate-pulse" />

          <div className="w-56 h-6 bg-muted animate-pulse" />
          <div className="w-56 h-6 bg-muted animate-pulse" />

          <div className="flex items-center justify-between w-full">
            <div>
              <p>Price: </p>
              <div className="flex items-center gap-5">
                <p className="w-32 h-4 animate-pulse bg-muted" />
                <p className="w-24 h-4 animate-pulse bg-muted" />{" "}
              </div>
              <p className="w-32 h-4 animate-pulse bg-muted" />
            </div>

            <p className="w-32 h-4 animate-pulse bg-muted" />
          </div>
        </div>
      </div>
    </>
  )
}
