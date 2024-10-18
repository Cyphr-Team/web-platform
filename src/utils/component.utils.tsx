import { cn } from "@/lib/utils"
import { Option } from "@/types/common.type"
import { Check } from "lucide-react"

export const iconRenderOption = (option: Option, isSelected: boolean) => (
  <>
    <span className="flex-1">{option.label}</span>

    <Check
      className={cn(
        "ml-auto h-4 w-4 self-start mt-1",
        isSelected ? "opacity-100" : "opacity-0"
      )}
    />
  </>
)
