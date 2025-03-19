import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { Separator } from "@/components/ui/separator.tsx"
import { SbbReviewSectionLayout } from "@/modules/loan-application/components/organisms/loan-application-form/review-application/SbbReviewSectionLayout.tsx"

export function PreApplicationDisclosuresDetails() {
  return (
    <SbbReviewSectionLayout>
      <h5 className="text-lg font-semibold">Pre-Application Disclosures</h5>

      <Separator />

      <div className="flex flex-col gap-4xl">
        <AnswersTextDisplay
          key="patriotAct"
          className="!flex-row justify-between"
          label="USA Patriot Act"
          value="Acknowledged receipt of the USA Patriot Act Notification"
        />
        <AnswersTextDisplay
          key="privacyPolicy"
          className="!flex-row justify-between"
          label="Privacy Policy"
          value="Acknowledged receipt of the SBB’s Privacy Policy"
        />
      </div>
    </SbbReviewSectionLayout>
  )
}
