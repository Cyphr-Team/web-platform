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
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { LoanProgramDetailApply } from "./LoanProgramDetailApply"
import { LoanProgramDetailUnderConstruction } from "./LoanProgramDetailApply copy"

export const LoanProgramDetailFAQ = () => {
  const { loanProgramDetail } = useLoanProgramDetailContext()

  return (
    <section>
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

        <Accordion type="multiple" className="w-full">
          {Object.keys(loanProgramDetail?.faqs ?? {}).map((key) => {
            const answer = loanProgramDetail?.faqs?.[key]
            return (
              <AccordionItem value={key} key={key} className="w-full">
                <AccordionTrigger
                  className={cn(
                    "justify-between w-full hover:no-underline text-xl sm:text-2xl font-semibold text-left",
                    "[&[data-state=closed]>.open-icon]:animate-spin-once",
                    "[&[data-state=open]>.close-icon]:animate-spin-once"
                  )}
                  openIcon={<Plus className="h-5 w-5" />}
                  closeIcon={<Minus className="h-5 w-5" />}
                >
                  {capitalizeWords(snakeCaseToText(key))}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <section className="block md:hidden mt-6">
        <LoanProgramDetailContactCard />
      </section>

      <section className="mt-8 px-8 py-9 bg-primary-solid rounded-2xl flex justify-between flex-wrap gap-4 items-center">
        <h2 className="text-white text-2xl md:text-3xl font-semibold mx-auto md:mx-0">
          Ready to Apply?
        </h2>
        <div className="mx-auto md:mx-0">
          {loanProgramDetail?.isUnderConstruction ? (
            <LoanProgramDetailUnderConstruction />
          ) : (
            <LoanProgramDetailApply />
          )}
        </div>
      </section>
    </section>
  )
}
