import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import { BUSINESS_PLAN_QUESTIONS } from "@/modules/conference-demo/applicant/constants/data"
import { type BusinessPlanRequest } from "./BusinessPlanForm"

export default function BusinessPlanDetails() {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Business Plan</h5>
      <Separator />
      <div className="flex flex-col gap-6">
        <AnswersTextDisplay
          key="businessPlan"
          className="!flex-row justify-between"
          label="Do you have a business plan?"
          value="No"
        />
        {Object.keys(BUSINESS_PLAN_QUESTIONS).map((key) => (
          <AnswersTextDisplay
            key={key}
            label={
              BUSINESS_PLAN_QUESTIONS[key as keyof BusinessPlanRequest].question
            }
            value={
              BUSINESS_PLAN_QUESTIONS[key as keyof BusinessPlanRequest].answer
            }
          />
        ))}
      </div>
    </Card>
  )
}
