import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  SBB_KYB_FORM_BLOCKS_PART_TWO,
  SBB_KYB_FORM_FIELDS,
  type SbbKybFormPartTwoValue,
  sbbKybFormSchemaPartTwo
} from "./const"
import { ComponentMapper } from "@/modules/form-template/components/templates/FormTemplate"
import {
  RHFCurrencyInput,
  RHFOptionInput
} from "@/modules/form-template/components/molecules"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useMemo } from "react"
import { get } from "lodash"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"

export function SBBKybFormPartTwo() {
  const { step, finishCurrentStep } = useLoanApplicationProgressContext()

  const { sbbBusinessInformationPartTwo, dispatchFormAction } =
    useLoanApplicationFormContext()

  const onSubmit = (data: SbbKybFormPartTwoValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO,
      state: {
        ...data
      }
    })
    finishCurrentStep()
  }

  const defaultValues = useMemo(
    () => getOrDefault(sbbBusinessInformationPartTwo),
    [sbbBusinessInformationPartTwo]
  )
  const form = useForm<SbbKybFormPartTwoValue>({
    resolver: zodResolver(sbbKybFormSchemaPartTwo),
    mode: "onBlur",
    defaultValues
  })

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO
  )

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
          {SBB_KYB_FORM_BLOCKS_PART_TWO.map(({ type, props, name }) => {
            if (name !== SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES) {
              const Component = ComponentMapper[type]

              return (
                <Component
                  key={name}
                  className="col-span-12"
                  name={name}
                  {...props}
                />
              )
            } else {
              return (
                <div
                  key={SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES}
                  className="flex flex-col col-span-12"
                >
                  <RHFOptionInput
                    className="col-span-12"
                    name={SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES}
                    {...props}
                    label="Do you anticipate the regular deposit or withdrawal of cash with this SBB account?"
                    options={YES_NO_OPTIONS}
                  />
                  {form.watch(
                    SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES
                  ) === BINARY_VALUES.YES && (
                    <RHFCurrencyInput
                      key={SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_AMOUNT}
                      className="col-span-12 flex items-end gap-1"
                      label="If yes, please enter the anticipated amount"
                      name={SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_AMOUNT}
                      styleProps={{
                        inputClassName: "border-l-0 border-r-0 border-t-0", // to-do remove ring focus
                        labelClassName: "leading-normal"
                      }}
                    />
                  )}
                </div>
              )
            }
          })}
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <FormSubmitButton
          isDisabled={!form.formState.isValid}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </Card>
  )
}

function getOrDefault(
  sbbBusinessInformationPartTwo: SbbKybFormPartTwoValue
): SbbKybFormPartTwoValue {
  return Object.keys(
    // because we are using zodResolver with refined schema, we need to get shape from _def.schema instead of directly from schema
    sbbKybFormSchemaPartTwo._def.schema.shape
  ).reduce<SbbKybFormPartTwoValue>(
    (acc, key) => ({
      ...acc,
      [key]: get(sbbBusinessInformationPartTwo, key, "")
    }),
    {
      anticipatedCashActivities: "",
      anticipatedCashAmount: 0,
      expectedAnnualSales: "",
      expectedDepositedAmount: "",
      id: "",
      isAllowThirdPartySlotMachines: "",
      isInvolvedInGambling: "",
      isMoneyServiceBusiness: "",
      isOwnsAndOperatesAtms: "",
      isSeniorForeignPoliticalFigure: "",
      monthlyDepositAmount: "",
      paymentMethods: [],
      selfDirectedIraAccount: "",
      willReceiveElectronicTransfers: "",
      willReceiveInternationalPayments: "",
      willReceiveInternationalWireTransfers: "",
      willReceiveWireTransfers: "",
      willSendElectronicTransfers: "",
      willSendWireTransfers: ""
    }
  )
}
