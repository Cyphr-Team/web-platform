import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export default function LoanProgramItem({ value }: { value: string }) {
  return (
    <li className="flex cursor-pointer items-center gap-3 rounded p-2 text-base">
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md",
          "ring-2 ring-stone-400/[.14]",
          "border-0 bg-active"
        )}
      >
        <Check className="w-5 rounded-md bg-active text-text-senary" />
      </div>
      {value}
    </li>
  )
}
