import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CheckCircle } from "lucide-react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"

export function LoanDecisionSubmitted() {
  return (
    <div className="p-4 lg:p-8 h-full w-full flex items-center">
      <div className="mx-auto flex w-full flex-col space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center gap-4xl">
          <div className="flex justify-center relative">
            <img
              className="max-w-[100vw] absolute w-[756px] h-[756px] -z-10 left-1/2 -translate-x-1/2 top-[28px] -translate-y-1/2 dark:opacity-15"
              src={backgroundPatternDecorative}
              alt="Pattern decorative"
              width={756}
              height={756}
            />
            <div className="w-14 self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-success-secondary">
                  <CheckCircle className="w-7 h-7 text-success" />
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
              Your loan decision has been submitted. A notification has been
              sent to the applicant.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
