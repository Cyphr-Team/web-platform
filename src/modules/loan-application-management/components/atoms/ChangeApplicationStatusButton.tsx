import { Button } from "@/components/ui/button"
import { Dot } from "@/components/ui/dot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { LoanDecisionEnum } from "../../constants/types/application"
import { getSelectInfoByDecision } from "../../services"
import { ChangeApplicationStatusDialog } from "./ChangeApplicationStatusDialog"

export const ChangeApplicationStatusButton = () => {
  const [selectedDecision, setSelectedDecision] = useState<LoanDecisionEnum>()

  const currentDecision = getSelectInfoByDecision()

  return (
    <div className="flex items-center gap-2 self-start md:self-center">
      <span className="text-sm font-medium">Status:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-10">
            <Dot variantColor={currentDecision.variantColor} />
            {currentDecision.label} <ChevronDown className="ml-1 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 m-0">
          {Object.keys(LoanDecisionEnum).map((decision) => {
            const info = getSelectInfoByDecision(
              LoanDecisionEnum[
                decision as keyof typeof LoanDecisionEnum
              ] as LoanDecisionEnum
            )
            return (
              <DropdownMenuItem
                className="cursor-pointer py-2 font-medium"
                key={decision}
                onClick={() => info.value && setSelectedDecision(info.value)}
              >
                <Dot variantColor={info.variantColor} />
                {info.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeApplicationStatusDialog
        fromDecision={currentDecision.value}
        toDecision={selectedDecision}
        onCancel={() => setSelectedDecision(undefined)}
      />
    </div>
  )
}
