import { useCallback, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { RevenueTypeSelection } from "@/modules/loan-application/[module]-financial-projection/components/molecules/RevenueTypeSelection.tsx"
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

interface AddRevenueTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: VoidFunction

  onAddItemToField: OnAddItemToField
}

export function AddRevenueTypeDialog(props: AddRevenueTypeDialogProps) {
  const { open, onOpenChange, onConfirm, onAddItemToField } = props

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

  const handleAbort = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const handleConfirm = useCallback(() => {
    const tasks: VoidFunction[] = []

    if (counter.unitSales)
      tasks.push(onAddItemToField(RevenueType.UnitSales, emptyUnitSale))
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
    onConfirm()
  }, [
    counter.billableHours,
    counter.contracts,
    counter.recurringCharges,
    counter.unitSales,
    onAddItemToField,
    onConfirm
  ])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[50rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2 text-2xl">
            Add revenue type
          </AlertDialogTitle>
        </AlertDialogHeader>

        <RevenueTypeSelection counter={counter} onAddItemToField={onToggle} />
        <Separator />
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel onClick={handleAbort}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-20" onClick={handleConfirm}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
