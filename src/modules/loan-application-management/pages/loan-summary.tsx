import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InformationCard } from "../components/molecules/InformationCard"
import { BusinessInfoSummary } from "../components/organisms/loan-summary/BusinessInfoSummary"
import { ChecklistsSummary } from "../components/organisms/loan-summary/ChecklistsSummary"
import { PersonalInfoSummary } from "../components/organisms/loan-summary/PersonalInfoSummary"
import { CashFlowSummary } from "../components/organisms/loan-summary/CashFlowSummary"

import { useRef } from "react"
import { DownloadButton } from "../components/atoms/DownloadButton"
import { useLoanApplicationDetailContext } from "../providers/LoanApplicationDetailProvider"
import { getUseOfLoan } from "../services"
import { Badge } from "@/components/ui/badge"

export function Component() {
  const elementToExportRef = useRef<HTMLDivElement>(null)
  const { loanSummary, isFetchingSummary, isFetchingCashflow } =
    useLoanApplicationDetailContext()

  return (
    <div ref={elementToExportRef} className="w-full flex-col gap-3xl lg:flex">
      <Card className="size-full flex-1 space-y-4xl p-4xl">
        <div className="mt-lg flex flex-wrap justify-between gap-2 space-y-lg">
          <div className="flex flex-col gap-sm">
            <p className="text-4xl font-semibold ">Application Summary</p>
            <div className="flex gap-2">
              <Badge border>
                <p className="text-sm font-medium">
                  {getUseOfLoan(loanSummary?.proposeUseOfLoan)}
                </p>
              </Badge>

              <Badge border>
                <p className="text-sm font-medium">{loanSummary?.loanType}</p>
              </Badge>
            </div>
          </div>

          <div>
            <DownloadButton
              disabled={isFetchingSummary || isFetchingCashflow}
              elementToExportRef={[elementToExportRef]}
            />
          </div>
        </div>

        <InformationCard title="Business Info">
          <BusinessInfoSummary />
        </InformationCard>

        {!!loanSummary?.cashFlowDocumentation?.length && (
          <>
            <Separator />

            <InformationCard title="Cash Flow Documentation">
              <CashFlowSummary />
            </InformationCard>
          </>
        )}
        <Separator />

        <InformationCard title="Personal Info">
          <PersonalInfoSummary />
        </InformationCard>

        {!!Object.keys(loanSummary?.checkLists ?? {}).length && (
          <>
            <Separator />

            <InformationCard title="Checklists">
              <ChecklistsSummary />
            </InformationCard>
          </>
        )}
      </Card>
    </div>
  )
}

Component.displayName = "LoanSummary"
