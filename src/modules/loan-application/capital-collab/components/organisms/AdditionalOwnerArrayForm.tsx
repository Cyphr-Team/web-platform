import { Accordion } from "@/components/ui/accordion.tsx"
import { Button } from "@/components/ui/button.tsx"
import { SSN_PATTERN } from "@/constants"

import {
  RHFCalendarPickerInput,
  RHFCurrencyInput,
  RHFMaskInput,
  RHFPercentageInput,
  RHFPhoneInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { CollapsibleArrayFieldTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CollapsibleArrayFieldTemplate.tsx"
import AddressFields from "@/modules/loan-application/capital-collab/components/atoms/AddressFields"
import { PERSONAL_CREDIT_SCORE_OPTIONS } from "@/modules/loan-application/capital-collab/constants/kyc"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { lowerCase } from "lodash"
import { TrashIcon } from "lucide-react"
import { memo, type ReactNode, useCallback, useMemo, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

interface ArrayFormTemplateProps {
  allowEmpty?: boolean
  fieldName: string
  dataName: string

  defaultEmptyObject: object
  onBlur: VoidFunction

  addIcon: ReactNode
}

interface ItemState {
  id: string
  active: boolean
}

function AdditionalOwnerArrayForm(props: ArrayFormTemplateProps) {
  const { fieldName, defaultEmptyObject, dataName, onBlur, addIcon } = props
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName
  })
  const [activeItems, setActiveItems] = useState<ItemState[]>([])

  const handleAddItem = () => {
    append(defaultEmptyObject)
  }

  const onRemove = useCallback(
    (index: number) => () => {
      remove(index)
      onBlur()
    },
    [onBlur, remove]
  )

  const handleSetActiveItem = useCallback((items: string[]) => {
    setActiveItems((prevState) =>
      prevState.map((item) => ({
        id: item.id,
        active: items.some((target) => target === item.id)
      }))
    )
  }, [])

  const getActiveItemIds = useMemo(() => {
    return activeItems.filter((item) => item.active).map((item) => item.id)
  }, [activeItems])

  return (
    <>
      <Accordion
        className="flex flex-col gap-xl"
        type="multiple"
        value={getActiveItemIds}
        onValueChange={handleSetActiveItem}
      >
        {fields.map((source, index) => {
          const label = watch(`${fieldName}.${index}.fullName`)
            ? watch(`${fieldName}.${index}.fullName`)
            : "Untitled"

          const existed = activeItems.some((item) => item.id === source.id)

          if (!existed) {
            setActiveItems((prevState) => [
              ...prevState,
              {
                active: true,
                id: source.id
              }
            ])
          }

          return (
            <CollapsibleArrayFieldTemplate
              key={source.id}
              id={source.id}
              label={label}
            >
              <div className="grid grid-cols-6 gap-x-4xl gap-y-2xl gap-5 rounded-lg border bg-[#F2F8F8] p-5">
                <TooltipProvider>
                  <RHFTextInput
                    className="col-span-3"
                    label="Full legal name"
                    name={`${fieldName}.${index}.fullName`}
                    placeholder="Full legal name"
                  />
                  <RHFTextInput
                    className="col-span-3"
                    label="Your role"
                    name={`${fieldName}.${index}.businessRole`}
                    placeholder="Your role"
                  />
                  <RHFTextInput
                    className="col-span-6"
                    label="Resident address"
                    name={`${fieldName}.${index}.addressLine1`}
                    placeholder="Start typing your address"
                  />
                  <AddressFields fieldName={fieldName} index={index} />
                  <RHFTextInput
                    className="col-span-6 lg:col-span-2"
                    label="Zip"
                    name={`${fieldName}.${index}.businessZipCode`}
                    placeholder="Zip"
                  />
                  <RHFTextInput
                    className="col-span-6 lg:col-span-3"
                    label="Email address"
                    name={`${fieldName}.${index}.email`}
                    placeholder="i.e: larry@latte.com"
                  />
                  <RHFPhoneInput
                    className="col-span-6 lg:col-span-3"
                    label="Phone number"
                    name={`${fieldName}.${index}.phoneNumber`}
                    placeholder="Enter phone number"
                  />
                  <RHFCalendarPickerInput
                    className="col-span-6 lg:col-span-3"
                    label="Date of birth"
                    name={`${fieldName}.${index}.dateOfBirth`}
                    placeholder="i.e: 01-01-1991"
                    styleProps={{ calendarClassName: "" }}
                  />
                  <RHFMaskInput
                    className="col-span-6 lg:col-span-3"
                    label="SSN / ITIN"
                    name={`${fieldName}.${index}.socialSecurityNumber`}
                    pattern={SSN_PATTERN}
                    placeholder="12-3456789"
                  />
                  <RHFPercentageInput
                    className="col-span-6 lg:col-span-3"
                    label="What percent of the business do you own?"
                    name={`${fieldName}.${index}.businessOwnershipPercentage`}
                    placeholder="Your ownership percentage"
                    styleProps={{
                      labelClassName: "whitespace-nowrap",
                      subtitleClassName:
                        "text-xs text-text-tertiary font-normal",
                      suffixClassName:
                        "font-medium text-sm text-text-tertiary border-l h-full flex items-center px-3"
                    }}
                    subtitle="Please enter a number between 0 - 100"
                  />
                  <RHFSelectInput
                    className="col-span-6 lg:col-span-3"
                    label="Personal credit score"
                    name={`${fieldName}.${index}.personalCreditScore`}
                    options={PERSONAL_CREDIT_SCORE_OPTIONS}
                    selectContentProps={{
                      side: "top"
                    }}
                  />
                  <RHFCurrencyInput
                    className="col-span-6"
                    label="Annual income"
                    name={`${fieldName}.${index}.annualIncome`}
                    placeholder=""
                    prefixIcon="$"
                    styleProps={{ inputClassName: "pl-7.5" }}
                  />
                </TooltipProvider>

                {/* The equity form does not have to be mandatory */}
                {fields?.length > 1 ? (
                  <Button
                    className="w-fit col-span-6 ml-auto"
                    variant="outline"
                    onClick={onRemove(index)}
                  >
                    <TrashIcon />
                  </Button>
                ) : null}
              </div>
            </CollapsibleArrayFieldTemplate>
          )
        })}
      </Accordion>
      <Button
        className="ml-auto border-black"
        type="button"
        variant="outline"
        onClick={handleAddItem}
      >
        <div className="flex w-fit items-center gap-2">
          {addIcon}
          {`Add ${lowerCase(dataName)}`}
        </div>
      </Button>
    </>
  )
}

export default memo(AdditionalOwnerArrayForm)
