import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll"
import { Separator } from "@/components/ui/separator"
import { TRANSACTION_TAG } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useUpdateEffect } from "react-use"

interface Props {
  onApplyFilter: () => void
  onChangeTransactionTags: (tags: TRANSACTION_TAG[]) => void
  tags: TRANSACTION_TAG[]
}

export const TransactionTagsFilters: React.FC<Props> = ({
  tags,
  onChangeTransactionTags,
  onApplyFilter
}) => {
  const [checkedList, setCheckedList] = useState<TRANSACTION_TAG[]>(tags)

  const onChangeCheckbox = (value: boolean, option: TRANSACTION_TAG) => {
    setCheckedList((prev) => {
      if (value) {
        return [...prev, option]
      }

      return prev.filter((item) => item !== option)
    })
  }

  useUpdateEffect(() => {
    onChangeTransactionTags(checkedList)
  }, [checkedList])

  const options = Object.values(TRANSACTION_TAG)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="py-2 px-4 border rounded-md font-medium flex items-center">
          <span>{checkedList.length} TAGS</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 pt-2 w-52">
        <ScrollArea className="h-80">
          <div className="flex p-2 gap-2">
            <Checkbox
              checked={checkedList.length === options.length}
              id="all"
              onCheckedChange={(value: boolean) => {
                if (value) {
                  setCheckedList(options.map((option) => option))
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
          {options.map((option) => (
            <div key={option} className="flex p-2 gap-2">
              <Checkbox
                checked={checkedList.includes(option)}
                className="capitalize"
                id={option}
                onCheckedChange={(value: boolean) => {
                  // Ensure value is always a boolean
                  onChangeCheckbox(value, option)
                }}
              >
                {option}
              </Checkbox>
              <Label className="text-xs" htmlFor={option}>
                {capitalizeWords(snakeCaseToText(option))}
              </Label>
            </div>
          ))}{" "}
        </ScrollArea>
        <Separator />
        <div className="flex p-2 w-full justify-end">
          <Button
            className="text-xs"
            size="sm"
            variant="outline"
            onClick={onApplyFilter}
          >
            DONE
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
