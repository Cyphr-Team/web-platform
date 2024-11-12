import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { LoanProgramDetailContactCard } from "./LoanProgramDetailContactCard"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { snakeCaseToText } from "@/utils"
import { LoanProgramDetailApply } from "./LoanProgramDetailApply"
import { LoanProgramDetailUnderConstruction } from "./LoanProgramDetailUnderConstruction"
import { Skeleton } from "@/components/ui/skeleton"
import { isSbb } from "@/utils/domain.utils"

export function LoanProgramDetailFAQ() {
  const { loanProgramInfo, isLoading } = useLoanProgramDetailContext()
  const isExistFAQs = Object.keys(loanProgramInfo?.faqs ?? {}).length > 0

  return (
    <section>
      {isExistFAQs ? (
        <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-6">
          <div className="relative flex flex-col justify-between">
            <div>
              <h2 className="mb-3 text-3xl font-semibold md:text-4xl">FAQs</h2>
              <p className="text-xl">You have questions.</p>
              <p className="text-xl">We have answers.</p>
            </div>
            <div className="sticky bottom-0 hidden pb-4 pt-32 md:block">
              <LoanProgramDetailContactCard />
            </div>
          </div>
          {isLoading ? <FAQSkeleton /> : <FAQ />}
        </div>
      ) : null}

      {isExistFAQs ? (
        <section className="mt-6 block md:hidden">
          <LoanProgramDetailContactCard />
        </section>
      ) : null}

      <section className="mt-8 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary-solid px-8 py-9">
        <h2 className="mx-auto text-2xl font-semibold text-white md:mx-0 md:text-3xl">
          Ready to apply?
        </h2>
        <div className="mx-auto md:mx-0">
          {loanProgramInfo?.isUnderConstruction ? (
            <LoanProgramDetailUnderConstruction />
          ) : (
            <LoanProgramDetailApply
              btnText={loanProgramInfo?.startBtn}
              className={cn(
                isSbb() && "bg-lime-400 text-black hover:bg-lime-300"
              )}
            />
          )}
        </div>
      </section>
    </section>
  )
}

function FAQ() {
  const { loanProgramInfo } = useLoanProgramDetailContext()

  return (
    <Accordion className="w-full" type="multiple">
      {Object.keys(loanProgramInfo?.faqs ?? {}).map((key) => {
        const answer = loanProgramInfo?.faqs?.[key]

        return (
          <AccordionItem key={key} className="w-full" value={key}>
            <AccordionTrigger
              className={cn(
                "justify-between w-full hover:no-underline text-xl sm:text-2xl font-semibold text-left",
                "[&[data-state=closed]>.open-icon]:animate-spin-once",
                "[&[data-state=open]>.close-icon]:animate-spin-once"
              )}
              closeIcon={<Minus className="size-5" />}
              openIcon={<Plus className="size-5" />}
            >
              {snakeCaseToText(key)}
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap">
              {Array.isArray(answer)
                ? answer.map((ans, idx) => (
                    <p key={ans} className="mb-2">
                      {idx + 1}. {ans}
                    </p>
                  ))
                : answer}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

function FAQSkeleton() {
  return (
    <div className="flex w-full flex-col gap-5">
      {new Array(5).fill(null).map((_, key) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Skeleton key={key} className="h-16 w-full" />
      })}
    </div>
  )
}
