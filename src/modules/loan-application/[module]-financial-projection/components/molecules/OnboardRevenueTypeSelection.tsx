import { useCallback, useState } from "react"
import {
  initialRevenueCounterState,
  type OnAddItemToField,
  type RevenueCounterState,
  RevenueType
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import {
  emptyBillableHour,
  emptyContract,
  emptyRecurringCharge,
  emptyUnitSale
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"
import { RevenueTypeSelection } from "@/modules/loan-application/[module]-financial-projection/components/molecules/RevenueTypeSelection.tsx"
import { Button } from "@/components/ui/button.tsx"
import useBoolean from "@/hooks/useBoolean"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"

interface OnboardRevenueTypeSelectionProps {
  onAddItemToField: OnAddItemToField
  isFormCompleted?: boolean
}

function OnboardRevenueTypeSelection(props: OnboardRevenueTypeSelectionProps) {
  const { onAddItemToField, isFormCompleted } = props
  const [counter, setCounter] = useState<RevenueCounterState>(
    initialRevenueCounterState
  )

  const onToggle = useCallback(
    (type: RevenueType) => () => {
      setCounter((prevState) => {
        return {
          ...prevState,
          [type]: !prevState[type]
        }
      })
    },
    []
  )

  const handleAddItem = useCallback(() => {
    const tasks: VoidFunction[] = []

    if (counter.unitSales) {
      tasks.push(onAddItemToField(RevenueType.UnitSales, emptyUnitSale))
    }
    if (counter.recurringCharges) {
      tasks.push(
        onAddItemToField(RevenueType.RecurringCharges, emptyRecurringCharge)
      )
    }
    if (counter.billableHours) {
      tasks.push(onAddItemToField(RevenueType.BillableHours, emptyBillableHour))
    }
    if (counter.contracts) {
      tasks.push(onAddItemToField(RevenueType.Contracts, emptyContract))
    }

    // run all the task
    tasks.map((task) => task())
    // reset state
    setCounter(initialRevenueCounterState)
  }, [
    counter.billableHours,
    counter.contracts,
    counter.recurringCharges,
    counter.unitSales,
    onAddItemToField
  ])

  // At least one field is selected
  const enabled = Object.values(counter).some((value) => value)

  const isOpen = useBoolean(true)

  return (
    <>
      <RevenueTypeSelection counter={counter} onAddItemToField={onToggle} />
      <div className="flex flex-col gap-2xl">
        <Button disabled={!enabled} type="button" onClick={handleAddItem}>
          Next
        </Button>
      </div>
      {!isFormCompleted && (
        <CustomAlertDialog
          confirmText="Sounds good"
          description={
            <span className="break-keep">
              With your past transactions thoroughly analyzed, it's time to turn
              our attention to future financial planning. By delving into
              forward-looking projections, we can better understand your
              potential for growth, anticipate cash flow trends, and evaluate
              your overall financial outlook.
            </span>
          }
          isOpen={isOpen.value}
          title="Looking Ahead: Financial Projections"
          onConfirmed={isOpen.onFalse}
        />
      )}
    </>
  )
}

export default OnboardRevenueTypeSelection
