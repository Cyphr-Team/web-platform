import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InformationCard } from "../components/molecules/InformationCard"
import { BusinessInfoSummary } from "../components/organisms/loan-summary/BusinessInfoSummary"
import { BusinessPlanSummary } from "../components/organisms/loan-summary/BusinessPlanSummary"
import { FinancialStatementsSummary } from "../components/organisms/loan-summary/FinancialStatementsSummary"
import { ChecklistsSummary } from "../components/organisms/loan-summary/ChecklistsSummary"
import { IDCheckSummary } from "../components/organisms/loan-summary/IDCheckSummary"
import { PersonalInfoSummary } from "../components/organisms/loan-summary/PersonalInfoSummary"
import { CollateralDocumentationSummary } from "../components/organisms/loan-summary/CollateralDocumentationSummary"
import { CashFlowSummary } from "../components/organisms/loan-summary/CashFlowSummary"
import { SBAFormsSummary } from "../components/organisms/loan-summary/SBAFormsSummary"

import { useRef } from "react"
import { DownloadButton } from "../components/atoms/DownloadButton"

export function Component() {
  const elementToExportRef = useRef<HTMLDivElement>(null)

  return (
    <div className="lg:flex gap-3xl w-full flex-col" ref={elementToExportRef}>
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl">
        <div className="space-y-lg mt-lg flex justify-between">
          <div className="flex items-center gap-sm">
            <p className="text-4xl font-semibold ">Loan Summary</p>
          </div>
          <div>
            <DownloadButton elementToExportRef={elementToExportRef} />
          </div>
        </div>

        <InformationCard title="Business Info">
          <BusinessInfoSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="Business Plan">
          <BusinessPlanSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="Financial Statements">
          <FinancialStatementsSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="SBA 7(a) Forms">
          <SBAFormsSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="Cash Flow Documentation">
          <CashFlowSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="Collateral Documentation">
          <CollateralDocumentationSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="Personal Info">
          <PersonalInfoSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="ID Check">
          <IDCheckSummary />
        </InformationCard>

        <Separator />

        <InformationCard title="Checklists">
          <ChecklistsSummary />
        </InformationCard>
      </Card>
    </div>
  )
}

Component.displayName = "LoanSummary"
