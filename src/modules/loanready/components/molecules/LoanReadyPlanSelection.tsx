import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package"
import { useFormContext } from "react-hook-form"

const loanOptions = [
  {
    label: "Loan Ready",
    value: LoanReadyPlanEnum.BASIC,
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
    value: LoanReadyPlanEnum.PLUS,
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

export function LoanReadyPlanSelection() {
  const form = useFormContext()

  const handleOptionClick = async (value: string) => {
    form.setValue("package", value)
    await form.trigger("package")
  }

  return (
    <div className="mb-8 flex flex-col gap-4">
      {loanOptions.map((option) => (
        <Button
          key={option.value}
          className={cn(
            "w-full h-full flex flex-col items-start border-brand-primary-gray rounded-lg p-4 cursor-pointer text-left hover:bg-[#F2F8F8]",
            form.watch("package") === option.value
              ? "border-primary bg-selection"
              : "border-dashed border-brand-primary-gray hover:border-primary"
          )}
          type="button"
          variant="outline"
          onClick={() => handleOptionClick(option.value)}
        >
          <div className="flex items-center gap-2">
            <label className="relative flex cursor-pointer items-center">
              <input
                checked={form.watch("package") === option.value}
                className="peer size-4 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
                name="plan"
                type="radio"
              />
              <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
            </label>
            <div className="font-medium text-text-foreground">
              {option.label}
            </div>
            <span className="font-normal text-gray-600">
              {option.price}/application
            </span>
          </div>
          <ul className="overflow-wrap mt-1 w-full list-disc whitespace-normal pl-10 text-left font-normal">
            {option.description.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </Button>
      ))}
    </div>
  )
}
