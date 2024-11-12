import { AspectRatio } from "@/components/ui/aspect-ratio"
import { isKccBank } from "@/utils/domain.utils"
import { CheckCircle } from "lucide-react"

export function LoanDecisionSubmitted() {
  return (
    <div className="flex size-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col space-y-8 sm:w-[360px]">
        <div className="flex flex-col gap-4xl text-center">
          <div className="relative flex justify-center">
            <div className="w-14 self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="flex size-full items-center justify-center rounded-full bg-success-secondary">
                  <CheckCircle className="size-7 text-success" />
                </div>
              </AspectRatio>
            </div>
          </div>
          <div className="flex flex-col space-y-lg">
            <h1 className="text-3xl font-semibold tracking-tight">
              Decision confirmed
            </h1>
          </div>

          <div className="text-muted-foreground">
            <p>
              Your loan decision has been submitted.{" "}
              {!isKccBank() && "A notification has been sent to the applicant."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
