import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RHFCheckbox } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  SBB_PRE_APPLICATION_DISCLOSURES,
  sbbPreApplicationDisclosuresSchema,
  type SbbPreApplicationDisclosuresValue
} from "./const"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

export function SbbPatriotAct() {
  const { dispatchFormAction, patriotAct } = useLoanApplicationFormContext()

  const form = useForm({
    resolver: zodResolver(sbbPreApplicationDisclosuresSchema),
    reValidateMode: "onChange",
    values: patriotAct,
    defaultValues: {
      [SBB_PRE_APPLICATION_DISCLOSURES.PATRIOT_ACT]: false
    }
  })

  const { finishCurrentStep } = useLoanApplicationProgressContext()

  const onSubmit = (data: SbbPreApplicationDisclosuresValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.PATRIOT_ACT,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.PATRIOT_ACT)

  return (
    <FormLayout title="USA Patriot Act">
      <h5 className="text-lg font-semibold">USA Patriot Act</h5>
      <Separator />
      <p>Important Information About Procedures for Opening a New Account.</p>
      <p>
        To help the government fight the funding of terrorism and money
        laundering activities, Federal law requires all financial institutions
        to obtain, verify, and record information that identifies each person
        who opens an account.
      </p>
      <p>
        What this means for you: When you open an account, we will ask for your
        name, address, date of birth, and other information that will allow us
        to identify you. We may also ask to see your driver’s license or other
        identifying documents.
      </p>
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2xl">
          <RHFCheckbox
            control={form.control}
            label="I acknowledge receipt of the USA Patriot Act Notification"
            name={SBB_PRE_APPLICATION_DISCLOSURES.PATRIOT_ACT}
            styleProps={{
              labelClassName: "text-xs"
            }}
          />
          <Button
            disabled={
              !form.getValues(SBB_PRE_APPLICATION_DISCLOSURES.PATRIOT_ACT)
            }
          >
            Next
          </Button>
        </div>
      </RHFProvider>{" "}
    </FormLayout>
  )
}
