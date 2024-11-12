import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useFormContext } from "react-hook-form"
import { SBB_KYC_FIELD_NAMES, type SbbKycFormValue } from "./const"
import { type LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { RHFOptionInput } from "@/modules/form-template/components/molecules"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"

interface Props {
  step: LOAN_APPLICATION_STEPS
  onSubmit: (data: SbbKycFormValue) => void
}

export function ControlAuthorization({ step, onSubmit }: Props) {
  const form = useFormContext<SbbKycFormValue>()

  return (
    <Card className="flex h-fit flex-col gap-2xl rounded-lg p-4xl">
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
        name={`${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION}`}
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
        styleProps={{
          radioGroupItemLabelClassName: "text-xs"
        }}
      />

      {!isReviewApplicationStep(step) && (
        <FormSubmitButton
          isDisabled={!form.formState.isValid}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </Card>
  )
}

interface DetailsProps {
  value: string
}

export function ControlAuthorizationDetails({ value }: DetailsProps) {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-sm font-semibold">Control Authorization</h5>
      <p className="text-sm font-normal text-primary">
        A single individual with significant responsibility to control, manage,
        or direct a legal entity customer, including an executive officer or
        senior manager (e.g., a Chief Executive Officer, Chief Financial
        Officer, Chief Operating Officer, Managing Member, General Partner,
        President, Vice President or Treasurer); or any other individual who
        regularly performs similar functions.
      </p>
      <div className="flex flex-col gap-2">
        {value === BINARY_VALUES.YES ? (
          <AnswersTextDisplay
            label=""
            value="Yes, I am the significant responsible person to control, manage, or direct this company indicated in the application."
            valueClassName="text-xs font-semibold"
          />
        ) : (
          <AnswersTextDisplay
            label=""
            value="No, I am not the significant responsible person to control, manage, or direct this company indicated in the application."
            valueClassName="text-xs font-semibold"
          />
        )}
      </div>
    </div>
  )
}
