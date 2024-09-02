import { Card } from "@/components/ui/card"
import { KybFormDetails } from "../../../../loan-application/components/organisms/loan-application-form/kyb/KybFormDetails"
import { KycFormDetails } from "../../../../loan-application/components/organisms/loan-application-form/kyc/KycFormDetails"
import { MOCK_LOAN_SUMMARY } from "../../constants/data"
import { ApplicationOverview } from "./ApplicationOverview"

export const ApplicationSummary = () => {
  return (
    <div className="lg:flex gap-3xl w-full" id="loan-summary">
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl">
        <div id="application-overview" className="flex flex-col gap-3xl">
          <div className="space-y-lg mt-lg flex justify-between gap-2 flex-wrap items-center">
            <p className="text-4xl font-semibold ">Application Overview</p>
          </div>
        </div>
        <ApplicationOverview />
        <div className="space-y-3xl flex flex-col">
          <p className="text-4xl font-semibold ">Loan Application</p>
          <div className="space-y-3xl flex flex-col" id="application-overview">
            <KybFormDetails kybFormData={MOCK_LOAN_SUMMARY?.kybForm} />
          </div>
          <div className="space-y-3xl flex flex-col">
            <KycFormDetails kycFormData={MOCK_LOAN_SUMMARY?.kycForm} />
          </div>
        </div>
      </Card>
    </div>
  )
}
