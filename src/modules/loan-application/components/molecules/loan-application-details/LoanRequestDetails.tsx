import { Card } from "@/components/ui/card"
import { capitalizeWords, toCurrency } from "@/utils"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { Input } from "@/components/ui/input.tsx"
import { FormItem } from "@/components/ui/form.tsx"
import { Label } from "@/components/ui/label.tsx"
import { ChevronDown } from "lucide-react"

export const LoanRequestDetails = () => {
  const { loanApplicationDetails } = useBRLoanApplicationDetailsContext()
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-xl h-fit overflow-auto">
      <h5 className="text-lg font-semibold">
        {loanApplicationDetails?.loanProgram.name ?? "Loan Program"}
      </h5>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-1">
          <FormItem>
            <Label className="text-text-secondary">
              Signature of Authorized Individual
            </Label>
            <Input
              readOnly={true}
              value={toCurrency(
                loanApplicationDetails?.loanAmount ?? 0
              ).replace("$", "")}
              prefixIcon={<span className="text-text-tertiary">$</span>}
            />
          </FormItem>
        </div>
        <div className="flex flex-col gap-1">
          <FormItem>
            <Label className="text-text-secondary">Proposed Use of Loan</Label>
            <Input
              readOnly={true}
              value={capitalizeWords(
                loanApplicationDetails?.proposeUseOfLoan.replace(/_/g, " ") ??
                  "N/A"
              ).replace("$", "")}
              suffixIcon={<ChevronDown className="ml-2 h-4 w-4" />}
            />
          </FormItem>
        </div>
      </div>
    </Card>
  )
}
