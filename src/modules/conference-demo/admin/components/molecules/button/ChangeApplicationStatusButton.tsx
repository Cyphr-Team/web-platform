import { Button } from "@/components/ui/button"
import { Dot } from "@/components/ui/dot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { LoanDecisionEnum } from "../../../constants"
import { getSelectInfoByDecision, LoanApplicationStatus } from "../../../types"
import { useEffect, useState } from "react"
import { ChangeApplicationStatusDialog } from "../../atoms/ChangeApplicationStatusDialog"
import { AppAlert } from "../../../../../../components/ui/alert"

export function ChangeApplicationStatusButton() {
  const [currentDecision, setCurrentDecision] =
    useState<LoanApplicationStatus>()
  const [isReferToLoanReady, setIsReferToLoanReady] = useState(false)
  const [selectedDecision, setSelectedDecision] = useState<
    LoanApplicationStatus | undefined
  >()

  const currentDecisionInfo = getSelectInfoByDecision(currentDecision)

  useEffect(() => {
    if (isReferToLoanReady) {
      setTimeout(() => setIsReferToLoanReady(false), 3000)
    }
  }, [isReferToLoanReady])

  return (
    <div className="flex items-center gap-2 self-start md:self-center">
      <div className="flex items-center text-sm font-medium">Status:</div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full px-10" variant="outline">
            <Dot variantColor={currentDecisionInfo.variantColor} />
            {currentDecisionInfo.label} <ChevronDown className="ml-1 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="m-0 w-48">
          {Object.keys(LoanDecisionEnum).map((decision) => {
            const info = getSelectInfoByDecision(
              LoanApplicationStatus[
                decision as keyof typeof LoanApplicationStatus
              ]
            )

            return (
              <DropdownMenuItem
                key={decision}
                className="cursor-pointer py-2 font-medium"
                onClick={() => info.value && setSelectedDecision(info.value)}
              >
                <Dot variantColor={info.variantColor} />
                {info.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedDecision && currentDecision !== selectedDecision ? (
        <ChangeApplicationStatusDialog
          fromDecision={currentDecision}
          setDecision={setCurrentDecision}
          setIsReferToLoanReady={setIsReferToLoanReady}
          toDecision={selectedDecision}
          onCancel={() => setSelectedDecision(undefined)}
        />
      ) : null}
      {isReferToLoanReady ? (
        <div className="absolute right-8 top-20 z-10 w-96">
          <AppAlert
            description="The applicant will receive an email confirmation and an in-app notification"
            title="Applicant referred to LoanReady"
            variant="success"
          />
        </div>
      ) : null}
    </div>
  )
}
