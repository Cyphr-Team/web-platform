import { Option } from "@/types/common.type.ts"

export const TYPE_OF_BUSINESS_OPTIONS: Option[] = [
  {
    label: "501C3",
    value: "501c3" // FIXME
  },
  {
    label: "LLC",
    value: "llc"
  },
  {
    label: "B Corporation",
    value: "b_corporation"
  },
  {
    label: "C Corporation",
    value: "c_corporation"
  },
  {
    label: "No legal structure",
    value: "no_legal_structure"
  },
  {
    label: "Legal structure not listed above",
    value: "legal_structure_not_listed_above"
  }
]

export const getLabelFromValue = (options: Option[], value: string): string => {
  const option = options.find((opt) => opt.value === value)
  return option ? option.label : value // Return value if option not found because it's an other value
}
