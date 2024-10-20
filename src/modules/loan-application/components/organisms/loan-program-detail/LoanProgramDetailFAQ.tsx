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
        <div className="flex gap-2 md:gap-6 flex-wrap md:flex-nowrap">
          <div className="flex flex-col justify-between relative">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">FAQs</h2>
              <p className="text-xl">You have questions.</p>
              <p className="text-xl">We have answers.</p>
            </div>
            <div className="sticky bottom-0 pt-32 pb-4 hidden md:block">
              <LoanProgramDetailContactCard />
            </div>
          </div>
          {isLoading ? <FAQSkeleton /> : <FAQ />}
        </div>
      ) : null}

      {isExistFAQs ? (
        <section className="block md:hidden mt-6">
          <LoanProgramDetailContactCard />
        </section>
      ) : null}

      <section className="mt-8 px-8 py-9 bg-primary-solid rounded-2xl flex justify-between flex-wrap gap-4 items-center w-full">
        <h2 className="text-white text-2xl md:text-3xl font-semibold mx-auto md:mx-0">
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
              closeIcon={<Minus className="h-5 w-5" />}
              openIcon={<Plus className="h-5 w-5" />}
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
    <div className="flex flex-col w-full gap-5">
      {new Array(5).fill(null).map((_, key) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Skeleton key={key} className="w-full h-16" />
      })}
    </div>
  )
}
