import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import { memo, useCallback, useEffect } from "react"
import {
  type FieldArrayWithId,
  useFieldArray,
  useFormContext
} from "react-hook-form"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"

import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  SBB_KYC_FIELD_NAMES,
  type SbbKycBeneficialOwner,
  type SbbKycFormValue
} from "./const"
import { Separator } from "@/components/ui/separator"

import {
  RHFPercentageInput,
  RHFPhoneInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import { cn } from "@/lib/utils.ts"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service.ts"

export function BeneficialOwnersInput() {
  const { control, getValues, watch } = useFormContext<SbbKycFormValue>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS}`
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleAddOwner = useCallback(() => {
    append({
      [SBB_KYC_FIELD_NAMES.NAME]: "",
      [SBB_KYC_FIELD_NAMES.EMAIL]: "",
      [SBB_KYC_FIELD_NAMES.PHONE_NUMBER]: "",
      [SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE]: ""
    })
  }, [append])

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

  const watchHasBeneficialOwners = watch(
    `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS}`
  )

  useEffect(() => {
    if (watchHasBeneficialOwners === BINARY_VALUES.NO) {
      remove()
    } else if (watchHasBeneficialOwners === BINARY_VALUES.YES) {
      if (fields.length === 0) {
        handleAddOwner()
      }
    }
  }, [
    dispatchFormAction,
    fields.length,
    getValues,
    handleAddOwner,
    remove,
    watchHasBeneficialOwners
  ])

  return (
    <Card className="flex h-fit flex-col gap-2xl rounded-lg p-4xl">
      <h5 className="text-lg font-semibold">Beneficial Owners </h5>
      <Separator />
      <RHFSelectInput
        className="flex items-center justify-between"
        description="A beneficial owner is an individual who owns, directly or indirectly, 25% or more of the equity
interest of the company. We are required to include all beneficial owners on your account application."
        label="Does your business have any other beneficial owners?"
        name={`${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS}`}
        options={YES_NO_OPTIONS}
        styleProps={{
          inputClassName: "w-40 md:max-w-40 xl:max-w-40 xl:w-40"
        }}
      />

      {watch(
        `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS}`
      ) === BINARY_VALUES.YES && (
        <>
          {fields.map((owner, index) => (
            <EditOwner
              key={owner.id}
              index={index}
              totalOwners={fields.length}
              value={owner}
              onRemove={onRemove(index)}
            />
          ))}
          <Button
            className="ml-auto w-min gap-2 border-black"
            type="button"
            variant="outline"
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

function EditOwner(props: EditOwnerProps) {
  const { index, value, totalOwners, onRemove } = props
  const OWNER_INFORMATION = `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS}.${index}`

  return (
    <Card
      key={value.id}
      className="flex flex-col gap-2 rounded-lg p-4xl shadow-none"
    >
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold">Owner {index + 1}</h5>
        {totalOwners > 1 && (
          <Button
            className="p-4"
            type="button"
            variant="ghost"
            onClick={onRemove}
          >
            <X className="w-4" />
          </Button>
        )}
      </div>
      <RHFTextInput
        isRowDirection
        label="What is their first and last name?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.NAME}`}
        styleProps={{
          inputClassName: "w-48 md:max-w-48 xl:max-w-48 xl:w-48"
        }}
      />
      <RHFTextInput
        isRowDirection
        label="What is their email address?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.EMAIL}`}
        styleProps={{
          inputClassName: "w-48 md:max-w-48 xl:max-w-48 xl:w-48"
        }}
      />
      <RHFPhoneInput
        isRowDirection
        label="What is their phone number?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.PHONE_NUMBER}`}
        styleProps={{
          inputClassName: "w-48 md:max-w-48 xl:max-w-48 xl:w-48"
        }}
      />
      <RHFPercentageInput
        isRowDirection
        className="flex items-center justify-between gap-2"
        label="What percentage of the business do they own?"
        name={`${OWNER_INFORMATION}.${SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE}`}
        styleProps={{
          inputClassName: "w-48 md:max-w-48 xl:max-w-48 xl:w-48"
        }}
      />
    </Card>
  )
}

interface OwnerDetailsProps {
  data?: SbbKycBeneficialOwner[]
}

export function BeneficialOwnersDetails({ data }: OwnerDetailsProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-col gap-4xl px-4xl pb-4xl",
          EXPORT_CLASS.FINANCIAL
        )}
      >
        <h5 className="text-sm font-semibold">Beneficial Owners </h5>
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="The business has other beneficial owners: "
          value={(data?.length ?? 0) > 0 ? "Yes" : "No"}
        />
      </div>

      {(data?.length ?? 0) > 0
        ? data?.map((owner, index) => (
            <div
              key={owner[SBB_KYC_FIELD_NAMES.EMAIL] + index.toString()}
              className={cn(
                "flex flex-col gap-4xl px-4xl pb-4xl",
                EXPORT_CLASS.FINANCIAL
              )}
            >
              <Separator />
              <OwnerDetails index={index} value={owner} />
            </div>
          ))
        : null}
    </div>
  )
}

const OwnerDetails = memo(
  (props: { index: number; value: SbbKycBeneficialOwner }) => {
    const { index, value } = props

    return (
      <div key={index} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-semibold">Owner {index + 1}</h5>
        </div>
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="First and last name:"
          value={value.name}
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Email address:"
          value={value.email}
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Phone number:"
          value={value.phoneNumber}
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Percentage of the business they own:"
          value={`${value.businessOwnershipPercentage}%`}
        />
      </div>
    )
  }
)
