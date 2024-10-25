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

interface OnboardRevenueTypeSelectionProps {
  onAddItemToField: OnAddItemToField
}

function OnboardRevenueTypeSelection(props: OnboardRevenueTypeSelectionProps) {
  const { onAddItemToField } = props
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

  return (
    <>
      <RevenueTypeSelection counter={counter} onAddItemToField={onToggle} />
      <div className="flex flex-col gap-2xl">
        <Button type="button" onClick={handleAddItem}>
          Next
        </Button>
      </div>
    </>
  )
}

export default OnboardRevenueTypeSelection
