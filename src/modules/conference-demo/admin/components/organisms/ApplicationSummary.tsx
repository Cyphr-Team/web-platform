import { Card } from "@/components/ui/card"
import { ApplicationOverview } from "./ApplicationOverview"
import FormReview from "@/modules/conference-demo/admin/components/molecules/FormReview.tsx"
import { MOCK_CONNECTED_BANK_ACCOUNTS } from "@/modules/conference-demo/admin/constants/data.ts"
import { BankAccountReport } from "@/modules/conference-demo/admin/components/molecules"

export function ApplicationSummary() {
  return (
    <div className="w-full gap-3xl lg:flex" id="loan-summary">
      <Card className="size-full flex-1 space-y-4xl p-4xl">
        <div className="flex flex-col gap-3xl" id="application-overview">
          <div className="mt-lg flex flex-wrap items-center justify-between gap-2 space-y-lg">
            <p className="text-4xl font-semibold ">Application Overview</p>
          </div>
        </div>
        <ApplicationOverview />
        <div className="flex flex-col space-y-3xl">
          <p className="text-4xl font-semibold ">Loan Application</p>
          <div className="flex flex-col space-y-3xl" id="application-overview">
            <KybFormDetail />
          </div>
          <div className="flex flex-col space-y-3xl">
            <KycFormDetail />
          </div>
        </div>
        <div>
          <p className="mb-6 text-4xl font-semibold">Connected Bank Accounts</p>
          {MOCK_CONNECTED_BANK_ACCOUNTS?.map((data, index) => (
            <BankAccountReport key={index} data={data} />
          ))}
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
