import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import {
  Block,
  FieldType,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import {
  AssetsField,
  assetsFormSchema,
  AssetsFormValue,
  EMPTY_ASSET_ITEM,
  FP_ASSETS_DEFAULT_VALUE,
  RECEIVABLE_DAYS_OPTIONS,
  USEFUL_LIFE_OPTIONS
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import EquityArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/EquityArrayFormTemplate"
import { Plus } from "lucide-react"

const CurrentAssetsFormBlocks: Block[] = [
  {
    name: AssetsField.RECEIVABLE_DAYS,
    type: FieldType.SELECT,
    props: {
      label: "Days to get paid",
      subtitle:
        "How long will you take to collect on this initial balance — that is, what payment terms do you offer your customers?",
      options: RECEIVABLE_DAYS_OPTIONS,
      styleProps: {
        labelClassName: "lg:w-[90vw] lg:mr-5 leading-1",
        subtitleClassName: "text-sm font-normal"
      },
      className: "lg:flex"
    }
  }
]

const LongTermAssetsFormBlocks: Block[] = [
  {
    name: AssetsField.LONG_TERM_ASSETS_NAME,
    type: FieldType.TEXT,
    props: {
      label: "Name of asset:",
      placeholder: "Name of asset",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: AssetsField.LONG_TERM_ASSETS_PURCHASE_DATE,
    type: FieldType.MASK,
    props: {
      label: "Purchase date:",
      pattern: "00/0000",
      placeholder: "MM/YYYY",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: AssetsField.LONG_TERM_ASSETS_COST,
    type: FieldType.CURRENCY,
    props: {
      className: "flex flex-row items-center justify-between",
      label: "Cost of Asset:",
      isRowDirection: true,
      placeholder: "Cost of Asset",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72 text-sm"
      }
    }
  },
  {
    name: AssetsField.LONG_TERM_ASSETS_USEFUL_LIFE,
    type: FieldType.SELECT,
    props: {
      className: "flex flex-row items-center justify-between",
      label: "Determine the useful life of this asset:",
      isRowDirection: true,
      options: USEFUL_LIFE_OPTIONS,
      placeholder: "Equity investment total",
      styleProps: {
        inputClassName: "min-w-72 w-auto text-sm"
      }
    }
  }
]

export const AssetsForm = () => {
  const { assets, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<AssetsFormValue>({
    resolver: zodResolver(assetsFormSchema),
    mode: "onBlur",
    defaultValues: assets ?? FP_ASSETS_DEFAULT_VALUE
  })

  const { finishCurrentStep } = useLoanApplicationProgressContext()

  const onSubmit = (data: AssetsFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.ASSETS,
      state: data
    })
    finishCurrentStep()
  }

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.ASSETS,
      state: form.getValues()
    })
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.ASSETS)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">Assets</h5>
      <Separator />

      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          className={cn(
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
            "md:col-span-6 md:col-start-2 md:mx-0"
          )}
        >
          <div>
            <h5 className="text-lg font-semibold">Accounts Receivable</h5>
            <h5 className="text-sm font-normal mt-2">
              Along with your current cash, accounts receivable are current
              assets - cash you expect to receive in the near future.
            </h5>
          </div>

          <Separator />

          {renderBlockComponents(CurrentAssetsFormBlocks)}
        </Card>
        <Card
          className={cn(
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
            "md:col-span-6 md:col-start-2 md:mx-0 mt-5"
          )}
        >
          <div>
            <h5 className="text-lg font-semibold">Long Term Assets</h5>
            <h5 className="text-sm font-normal mt-2">
              Long-term assets represent significant investments your business
              has made in resources like equipment, property, and vehicles that
              are expected to provide value over several years. These assets are
              crucial for supporting sustained growth and long-term strategic
              goals.
            </h5>
          </div>

          <Separator />
          <div className="flex flex-col gap-6 mb-5">
            <EquityArrayFormTemplate
              fieldName={AssetsField.LONG_TERM_ASSETS}
              dataName="Name of Asset"
              addIcon={<Plus />}
              defaultEmptyObject={EMPTY_ASSET_ITEM}
              onBlur={onAutoSave}
              blocks={LongTermAssetsFormBlocks}
            />
          </div>
        </Card>
        <div className="flex flex-col gap-2xl mt-4">
          <Button disabled={!form.formState.isValid}>Next</Button>
        </div>
      </RHFProvider>
    </Card>
  )
}
