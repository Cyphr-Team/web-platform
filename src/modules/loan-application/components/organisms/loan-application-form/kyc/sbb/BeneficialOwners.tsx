import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import { memo } from "react"
import {
  FieldArrayWithId,
  useFieldArray,
  useFormContext
} from "react-hook-form"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"

import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { SBB_KYC_FIELD_NAMES, SbbKycFormValue } from "./const"
import { Separator } from "@/components/ui/separator"

import {
  RHFPercentageInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { YES_NO_OPTIONS } from "../../kyb/sbb/const"

export const BeneficialOwnersInput = () => {
  const { control, getValues, watch } = useFormContext<SbbKycFormValue>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS}`
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleAddOwner = () => {
    append({
      [SBB_KYC_FIELD_NAMES.NAME]: "",
      [SBB_KYC_FIELD_NAMES.EMAIL]: "",
      [SBB_KYC_FIELD_NAMES.PHONE_NUMBER]: "",
      [SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE]: 0
    })
  }

  const onBlur = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: getValues()
    })
  }

  const onRemove = (index: number) => () => {
    remove(index)
    onBlur()
  }

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
      <h5 className="text-lg font-semibold">Beneficial Owners </h5>
      <Separator />
      <RHFSelectInput
        className="flex items-center justify-between"
        styleProps={{
          inputClassName: "w-42 min-w-42 md:max-w-42 xl:max-w-42 xl:w-42"
        }}
        name={`${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS}`}
        label="Does your business have any other beneficial owners?"
        description="A beneficial owner is an individual who owns, directly or indirectly, 25% or more of the equity
interest of the company. We are required to include all beneficial owners on your account application."
        options={YES_NO_OPTIONS}
      />

      {watch(
        `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS}`
      ) === "true" && (
        <>
          {fields.map((owner, index) => (
            <EditOwner
              key={owner.id}
              index={index}
              value={owner}
              onRemove={onRemove(index)}
              totalOwners={fields.length}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-min ml-auto border-black gap-2"
            onClick={handleAddOwner}
          >
            <Plus className="w-4" />
            Owner
          </Button>
        </>
      )}
    </Card>
  )
}

interface EditOwnerProps {
  totalOwners: number
  index: number
  value: FieldArrayWithId<
    SbbKycFormValue,
    `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS}`
  >
  onRemove: VoidFunction
}

const EditOwner = memo((props: EditOwnerProps) => {
  const { index, value, totalOwners, onRemove } = props
  const OWNER_INFORMATION = `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS}.${index}`

  return (
    <Card
      className="p-4xl rounded-lg flex flex-col gap-2 shadow-none"
      key={value.id}
    >
      <div className="flex justify-between items-center">
        <h5 className="font-semibold text-sm">Owner {index + 1}</h5>
        {totalOwners > 1 && (
          <Button
            type="button"
            variant="ghost"
            className="p-4"
            onClick={onRemove}
          >
            <X className="w-4" />
          </Button>
        )}
      </div>
      <RHFTextInput
        isRowDirection
        styleProps={{
          inputClassName: "w-42 md:max-w-42 xl:max-w-42 xl:w-42"
        }}
        label="What is their first and last name?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.NAME}`}
      />
      <RHFTextInput
        isRowDirection
        styleProps={{
          inputClassName: "w-42 md:max-w-42 xl:max-w-42 xl:w-42"
        }}
        label="What is their email address?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.EMAIL}`}
      />{" "}
      <RHFTextInput
        isRowDirection
        styleProps={{
          inputClassName: "w-42 md:max-w-42 xl:max-w-42 xl:w-42"
        }}
        label="What is their phone number?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.PHONE_NUMBER}`}
      />{" "}
      <RHFPercentageInput
        className="flex items-center justify-between"
        styleProps={{
          inputClassName: "w-42 md:max-w-42 xl:max-w-42 xl:w-42"
        }}
        label="What percentage of the business do they own?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE}`}
      />
    </Card>
  )
})
