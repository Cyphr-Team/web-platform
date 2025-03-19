import { cn } from "@/lib/utils"
import DocumentReviewOnly from "../molecules/DocumentReviewOnly"

export default function DocumentationDetails() {
  return (
    <div className={cn("flex flex-col gap-2", "md:grid md:grid-cols-4")}>
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Documentations</h3>
        </div>
      </div>
      <div className="col-span-3 max-w-screen-sm flex flex-col gap-4">
        <DocumentReviewOnly />
      </div>
    </div>
  )
}
