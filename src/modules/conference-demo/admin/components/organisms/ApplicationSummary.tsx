import { Card } from "@/components/ui/card"
import { ApplicationOverview } from "./ApplicationOverview"
import FormReview from "@/modules/conference-demo/admin/components/molecules/FormReview.tsx"

export function ApplicationSummary() {
  return (
    <div className="lg:flex gap-3xl w-full" id="loan-summary">
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl">
        <div className="flex flex-col gap-3xl" id="application-overview">
          <div className="space-y-lg mt-lg flex justify-between gap-2 flex-wrap items-center">
            <p className="text-4xl font-semibold ">Application Overview</p>
          </div>
        </div>
        <ApplicationOverview />
        <div className="space-y-3xl flex flex-col">
          <p className="text-4xl font-semibold ">Loan Application</p>
          <div className="space-y-3xl flex flex-col" id="application-overview">
            <KybFormDetail />
          </div>
          <div className="space-y-3xl flex flex-col">
            <KycFormDetail />
          </div>
        </div>
      </Card>
    </div>
  )
}

function KybFormDetail() {
  const mock = [
    {
      label: "Business Legal Name",
      value: "Larry's Latte LLC"
    },
    {
      label: "Business Street Address",
      value: "123 Coffee Lane"
    },
    {
      label: "Employer Identification Number (EIN)",
      value: "12-3456789"
    },
    {
      label: "Business Website",
      value: "https://larryslatte.com"
    }
  ]

  return <FormReview data={mock} title="Business Information" />
}

function KycFormDetail() {
  const mock = [
    {
      label: "Full name",
      value: "Larry's Latte"
    },
    {
      label: "Resident address",
      value: "456 Bean Avenue, Suite 789, Seattle, WA, 977531 "
    },
    {
      label: "Email address",
      value: "larry@latte.com"
    },
    {
      label: "Date of birth",
      value: "01-01-1991"
    },
    {
      label: "SSN/TIN",
      value: "123456789"
    },
    {
      label: "Your role",
      value: "CEO"
    },
    {
      label: "Percentage of the business you own",
      value: "75%"
    }
  ]

  return <FormReview data={mock} title="Owner / Guarantor Information" />
}
