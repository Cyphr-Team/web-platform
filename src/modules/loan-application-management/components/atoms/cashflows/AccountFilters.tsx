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

export const AccountFilters = () => {
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
        <div className="py-2 px-4 border rounded-md font-medium flex items-center">
          <span>{checkedList.length} accounts</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 pt-2 w-52" align="end">
        <div className="flex p-2 gap-2">
          <Checkbox
            id="all"
            checked={checkedList.length === cashFlowAccounts.length}
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
          <Label htmlFor="all" className="text-xs">
            Select All
          </Label>
        </div>
        {cashFlowAccounts.map((option) => (
          <div className="flex p-2 gap-2" key={option.bankAccountPk}>
            <Checkbox
              id={option.bankAccountPk}
              className="capitalize"
              checked={checkedList.includes(option.bankAccountPk)}
              onCheckedChange={(value: boolean) => {
                // Ensure value is always a boolean
                onChangeCheckbox(value, option.bankAccountPk)
              }}
            >
              {option.bankAccountName}
            </Checkbox>
            <Label htmlFor={option.bankAccountPk} className="text-xs">
              {option.bankAccountName}
            </Label>
          </div>
        ))}
        <Separator />
        <div className="flex p-2 w-full justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onResetFilter}
          >
            RESET
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="ml-2 text-xs"
            onClick={onApplyFilter}
          >
            APPLY
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
