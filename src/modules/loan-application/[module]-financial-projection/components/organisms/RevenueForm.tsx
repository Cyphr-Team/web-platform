import { Button } from "@/components/ui/button.tsx"
import { Card } from "@/components/ui/card.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { cn } from "@/lib/utils.ts"
import { RHFProvider } from "@/modules/form-template/providers"
import { useFieldArray, useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { FC, PropsWithChildren, useCallback } from "react"
import { useBoolean } from "@/hooks"
import { AddRevenueTypeDialog } from "@/modules/loan-application/[module]-financial-projection/components/molecules/AddRevenueTypeDialog.tsx"
import { RevenueTypeSelection } from "@/modules/loan-application/[module]-financial-projection/components/molecules/RevenueTypeSelection.tsx"
import {
  BillableHour,
  Contract,
  RecurringCharge,
  RevenueStream,
  RevenueType,
  UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { get } from "lodash"
import UnitSalesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/UnitSalesForm.tsx"
import BillableHoursForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/BillableHoursForm.tsx"
import RecurringChargesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/RecurringChargesForm.tsx"
import ContractRevenueForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContractsForm.tsx"

export const RevenueForm = () => {
  const dialog = useBoolean()

  const { finishCurrentStep } = useLoanApplicationProgressContext()
  const { dispatchFormAction, revenue } = useLoanApplicationFormContext()

  const form = useForm<RevenueStream>({
    mode: "onBlur",
    defaultValues: {
      unitSales: get(revenue, RevenueType.UNIT_SALES, []),
      billableHours: get(revenue, RevenueType.BILLABLE_HOURS, []),
      contracts: get(revenue, RevenueType.CONTRACTS, []),
      recurringCharges: get(revenue, RevenueType.RECURRING_CHARGES, [])
    }
  })

  const {
    watch,
    handleSubmit,
    formState: { isValid },
    control,
    getValues
  } = form

  const formValues = watch()

  const isFormDirty =
    formValues.unitSales.length > 0 ||
    formValues.billableHours.length > 0 ||
    formValues.recurringCharges.length > 0 ||
    formValues.contracts.length > 0

  const canRender = (field: RevenueType): boolean => {
    return watch(field).length > 0
  }

  /**
   * TODO: read this code and refactor current code
   * import { useFieldArray, UseFieldArrayAppend, Control, FieldValues } from 'react-hook-form';
   * import { RevenueType, UnitSale, BillableHour, RecurringCharge, Contract } from './types'; // Adjust import path as needed
   *
   * type RevenueData = UnitSale | BillableHour | RecurringCharge | Contract;
   *
   * // Define a type for the form values
   * interface RevenueFormValues extends FieldValues {
   *   [RevenueType.UNIT_SALES]: UnitSale[];
   *   [RevenueType.RECURRING_CHARGES]: RecurringCharge[];
   *   [RevenueType.CONTRACTS]: Contract[];
   *   [RevenueType.BILLABLE_HOURS]: BillableHour[];
   * }
   *
   * // Create a mapped type for append functions
   * type AppendFunctions = {
   *   [K in RevenueType]: UseFieldArrayAppend<RevenueFormValues, K>
   * }
   *
   * const useRevenueAppend = (control: Control<RevenueFormValues>) => {
   *   const revenueTypes = [
   *     RevenueType.UNIT_SALES,
   *     RevenueType.RECURRING_CHARGES,
   *     RevenueType.CONTRACTS,
   *     RevenueType.BILLABLE_HOURS
   *   ] as const;
   *
   *   const unitSalesArray = useFieldArray({ control, name: RevenueType.UNIT_SALES });
   *   const recurringChargesArray = useFieldArray({ control, name: RevenueType.RECURRING_CHARGES });
   *   const contractsArray = useFieldArray({ control, name: RevenueType.CONTRACTS });
   *   const billableHoursArray = useFieldArray({ control, name: RevenueType.BILLABLE_HOURS });
   *
   *   const appendFunctions: AppendFunctions = {
   *     [RevenueType.UNIT_SALES]: unitSalesArray.append,
   *     [RevenueType.RECURRING_CHARGES]: recurringChargesArray.append,
   *     [RevenueType.CONTRACTS]: contractsArray.append,
   *     [RevenueType.BILLABLE_HOURS]: billableHoursArray.append,
   *   };
   *
   *   const appendFunctionFactory = <T extends RevenueType>(type: T): AppendFunctions[T] => appendFunctions[type];
   *
   *   const onAddItemToField = <T extends RevenueType>(type: T, data: RevenueFormValues[T][number]) => () => {
   *     const appendFunction = appendFunctionFactory(type);
   *     appendFunction(data as any); // Unfortunately, we still need 'any' here due to limitations in TypeScript's type inference
   *   };
   *
   *   return { onAddItemToField };
   * };
   *
   * export default useRevenueAppend;
   * */

  const { append: appendUnitSales } = useFieldArray({
    control,
    name: RevenueType.UNIT_SALES
  })
  const { append: appendRecurringCharges } = useFieldArray({
    control,
    name: RevenueType.RECURRING_CHARGES
  })
  const { append: appendContracts } = useFieldArray({
    control,
    name: RevenueType.CONTRACTS
  })
  const { append: appendBillableHours } = useFieldArray({
    control,
    name: RevenueType.BILLABLE_HOURS
  })

  const appendFunctionFactory = useCallback(
    (type: RevenueType) => {
      switch (type) {
        case RevenueType.UNIT_SALES:
          return appendUnitSales
        case RevenueType.RECURRING_CHARGES:
          return appendRecurringCharges
        case RevenueType.BILLABLE_HOURS:
          return appendBillableHours
        case RevenueType.CONTRACTS:
          return appendContracts
      }
    },
    [
      appendBillableHours,
      appendContracts,
      appendRecurringCharges,
      appendUnitSales
    ]
  )

  const onAddItemToField = useCallback(
    (
      type: RevenueType,
      data: UnitSale | BillableHour | RecurringCharge | Contract
    ) =>
      () => {
        const fn = appendFunctionFactory(type)
        fn(data as never)
      },
    [appendFunctionFactory]
  )

  const LayoutComponent = isFormDirty ? DefaultLayout : WelcomeLayout

  const onSubmit = (data: RevenueStream) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.REVENUE,
      state: data
    })
    finishCurrentStep()
  }

  const onBlur = useCallback(() => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.REVENUE,
      state: getValues()
    })
  }, [dispatchFormAction, getValues])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.REVENUE)

  return (
    <LayoutComponent>
      <RHFProvider methods={form} onSubmit={handleSubmit(onSubmit)}>
        {!isFormDirty ? (
          <RevenueTypeSelection onAddItemToField={onAddItemToField} />
        ) : null}

        <AddRevenueTypeDialog
          open={dialog.value}
          onOpenChange={dialog.setValue}
          onConfirm={dialog.onFalse}
          onAddItemToField={onAddItemToField}
        />

        <div className="flex flex-col gap-y-4xl">
          {canRender(RevenueType.UNIT_SALES) ? (
            <UnitSalesForm onBlur={onBlur} />
          ) : null}
          {canRender(RevenueType.BILLABLE_HOURS) ? (
            <BillableHoursForm onBlur={onBlur} />
          ) : null}
          {canRender(RevenueType.CONTRACTS) ? (
            <ContractRevenueForm onBlur={onBlur} />
          ) : null}
          {canRender(RevenueType.RECURRING_CHARGES) ? (
            <RecurringChargesForm onBlur={onBlur} />
          ) : null}
        </div>

        {isFormDirty ? (
          <div className="w-full flex flex-row-reverse">
            <Button type="button" className="py-2 my-2" onClick={dialog.onTrue}>
              + Another revenue type
            </Button>
          </div>
        ) : null}

        <div className="flex flex-col gap-2xl">
          <Button disabled={!isValid}>Next</Button>
        </div>
      </RHFProvider>
    </LayoutComponent>
  )
}

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">Revenue</h5>
      <div className="text-text-tertiary">
        Select one or more revenue models that best align with your business
        operations and financial reporting requirements.
      </div>
      <Separator />
      {children}
    </Card>
  )
}

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      {children}
    </div>
  )
}
