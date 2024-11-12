import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function AccountFilters() {
  const { onChangeAccountFilter, cashFlowAccounts } =
    useLoanApplicationDetailContext()

  const [checkedList, setCheckedList] = useState<string[]>(
    cashFlowAccounts.map((option) => option.bankAccountPk)
  )

  const onChangeCheckbox = (value: boolean, option: string) => {
    setCheckedList((prev) => {
      if (value) {
        return [...prev, option]
      }

      return prev.filter((item) => item !== option)
    })
  }

  const onApplyFilter = () => {
    onChangeAccountFilter(checkedList)
  }

  const onResetFilter = () => {
    setCheckedList(cashFlowAccounts.map((option) => option.bankAccountPk))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center rounded-md border px-4 py-2 font-medium">
          <span>{checkedList.length} accounts</span>
          <ChevronDown className="ml-2 size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 p-0 pt-2">
        <div className="flex gap-2 p-2">
          <Checkbox
            checked={checkedList.length === cashFlowAccounts.length}
            id="all"
            onCheckedChange={(value: boolean) => {
              if (value) {
                setCheckedList(
                  cashFlowAccounts.map((option) => option.bankAccountPk)
                )
              } else {
                setCheckedList([])
              }
            }}
          >
            Select All
          </Checkbox>
          <Label className="text-xs" htmlFor="all">
            Select All
          </Label>
        </div>
        {cashFlowAccounts.map((option) => (
          <div key={option.bankAccountPk} className="flex gap-2 p-2">
            <Checkbox
              checked={checkedList.includes(option.bankAccountPk)}
              className="capitalize"
              id={option.bankAccountPk}
              onCheckedChange={(value: boolean) => {
                // Ensure value is always a boolean
                onChangeCheckbox(value, option.bankAccountPk)
              }}
            >
              {option.bankAccountName}
            </Checkbox>
            <Label className="text-xs" htmlFor={option.bankAccountPk}>
              {option.bankAccountName}
            </Label>
          </div>
        ))}
        <Separator />
        <div className="flex w-full justify-end p-2">
          <Button
            className="text-xs"
            size="sm"
            variant="outline"
            onClick={onResetFilter}
          >
            RESET
          </Button>
          <Button
            className="ml-2 text-xs"
            size="sm"
            variant="outline"
            onClick={onApplyFilter}
          >
            APPLY
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
