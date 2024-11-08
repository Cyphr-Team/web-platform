import { useState } from "react"
import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button"

const loanOptions = [
  {
    label: "Loan Ready",
    value: "loanReady",
    price: "$99",
    description: [
      {
        id: "desc1",
        text: "Receive a loan readiness score along with tailored feedback to boost your approval chances."
      }
    ]
  },
  {
    label: "Loan Ready+",
    value: "loanReadyPlus",
    price: "$150",
    description: [
      {
        id: "desc1",
        text: "Receive a loan readiness score along with tailored feedback to boost your approval chances."
      },
      {
        id: "desc2",
        text: "Includes a generated income statement to simplify your loan application process."
      }
    ]
  }
]

interface LoanReadyPlanSelectionProps {
  onSelect: (value: string) => void
}

export function LoanReadyPlanSelection({
  onSelect
}: LoanReadyPlanSelectionProps) {
  const [selectedOption, setSelectedOption] = useState("")

  const handleOptionClick = (value: string) => {
    setSelectedOption(value)
    onSelect(value)
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      {loanOptions.map((option) => (
        <Button
          key={option.value}
          className={cn(
            "w-full h-full flex flex-col items-start border-brand-primary-gray rounded-lg p-4 cursor-pointer text-left hover:bg-[#F2F8F8]",
            selectedOption === option.value
              ? "border-primary bg-selection"
              : "border-dashed border-brand-primary-gray hover:border-primary"
          )}
          type="button"
          variant="outline"
          onClick={() => handleOptionClick(option.value)}
        >
          <div className="flex items-center gap-2">
            <label className="relative flex items-center cursor-pointer">
              <input
                checked={selectedOption === option.value}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                name="plan"
                type="radio"
              />
              <span className="absolute bg-slate-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </label>
            <div className="font-medium text-text-foreground">
              {option.label}
            </div>
            <span className="font-normal text-gray-600">
              {option.price}/application
            </span>
          </div>
          <ul className="mt-1 font-normal list-disc ml-10 w-full text-left whitespace-normal overflow-wrap">
            {option.description.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </Button>
      ))}
    </div>
  )
}
