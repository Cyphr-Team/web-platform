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
  BillableHour,
  Contract,
  RecurringCharge,
  RevenueType,
  UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import {
  emptyBillableHour,
  emptyContract,
  emptyRecurringCharge,
  emptyUnitSale
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"

type RevenueCounter = {
  [key in RevenueType]: boolean
}

const initialState = {
  [RevenueType.UNIT_SALES]: false,
  [RevenueType.RECURRING_CHARGES]: false,
  [RevenueType.BILLABLE_HOURS]: false,
  [RevenueType.CONTRACTS]: false
}

interface AddRevenueTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: VoidFunction

  onAddItemToField: (
    type: RevenueType,
    data: UnitSale | BillableHour | RecurringCharge | Contract
  ) => VoidFunction
}

export const AddRevenueTypeDialog = (props: AddRevenueTypeDialogProps) => {
  const { open, onOpenChange, onConfirm, onAddItemToField } = props

  const [counter, setCounter] = useState<RevenueCounter>(initialState)

  const onToggle = useCallback(
    (type: RevenueType) => () => {
      setCounter((prevState) => {
        return {
          ...prevState,
          [`${type}`]: !prevState[type]
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
      tasks.push(onAddItemToField(RevenueType.UNIT_SALES, emptyUnitSale))
    if (counter.recurringCharges) {
      tasks.push(
        onAddItemToField(RevenueType.RECURRING_CHARGES, emptyRecurringCharge)
      )
    }
    if (counter.billableHours) {
      tasks.push(
        onAddItemToField(RevenueType.BILLABLE_HOURS, emptyBillableHour)
      )
    }
    if (counter.contracts) {
      tasks.push(onAddItemToField(RevenueType.CONTRACTS, emptyContract))
    }

    // run all the task
    tasks.map((task) => task())
    // reset state
    setCounter(initialState)
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
      <AlertDialogContent className="w-[40rem] max-w-[40rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl mb-2">
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
