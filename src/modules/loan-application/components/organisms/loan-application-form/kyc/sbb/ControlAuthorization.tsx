import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { ArrowRight } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { SBB_KYC_FIELD_NAMES, SbbKycFormValue } from "./const"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { RHFOptionInput } from "@/modules/form-template/components/molecules"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"

type Props = {
  step: LOAN_APPLICATION_STEPS
  onSubmit: (data: SbbKycFormValue) => void
}

export const ControlAuthorization: React.FC<Props> = ({ step, onSubmit }) => {
  const form = useFormContext<SbbKycFormValue>()

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
      <h5 className="text-lg font-semibold">Control Authorization</h5>
      <Separator />
      <p className="text-sm text-primary">
        A single individual with significant responsibility to control, manage,
        or direct a legal entity customer, including an executive officer or
        senior manager (e.g., a Chief Executive Officer, Chief Financial
        Officer, Chief Operating Officer, Managing Member, General Partner,
        President, Vice President or Treasurer); or any other individual who
        regularly performs similar functions.
      </p>

      <RHFOptionInput
        label=""
        styleProps={{
          radioGroupItemLabelClassName: "text-xs"
        }}
        options={[
          {
            label:
              "Yes, I am the significant responsible person to control, manage, or direct this company indicated in the application.",
            value: BINARY_VALUES.YES
          },
          {
            label:
              "No, I am not the significant responsible person to control, manage, or direct this company indicated in the application.",
            value: BINARY_VALUES.NO
          }
        ]}
        name={`${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION}`}
      />

      {!isReviewApplicationStep(step) && (
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Next <ArrowRight className="ml-1 w-4" />
        </Button>
      )}
    </Card>
  )
}
