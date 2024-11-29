import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button"
import {
  LoanReadyPlanOptions,
  type LoanReadyPlanEnum
} from "@/modules/loanready/constants/package"
import { useFormContext } from "react-hook-form"

export function LoanReadyPlanSelection() {
  const form = useFormContext()

  const handleOptionClick = async (value: LoanReadyPlanEnum) => {
    form.setValue("package", value)
    await form.trigger("package")
  }

  return (
    <div className="mb-8 flex flex-col gap-4">
      {LoanReadyPlanOptions.map((option) => (
        <Button
          key={option.value}
          className={cn(
            "flex size-full cursor-pointer flex-col items-start rounded-lg border-dashed border-brand-primary-gray p-4 text-left hover:bg-[#F2F8F8]",
            form.watch("package") === option.value
              ? "bg-selection border-primary"
              : "border-brand-primary-gray hover:border-primary"
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
              ${option.price / 100}/assessment
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
