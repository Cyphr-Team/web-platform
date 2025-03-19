import { type Option } from "@/types/common.type.ts"

/*
 * The value of these const are just placeholder.
 * FIXME: change value format when we have api
 * */
export const LEGAL_STRUCTURE_OPTIONS: Option[] = [
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

export const PRIMARY_INDUSTRY: Option[] = [
  {
    label: "Biosciences",
    value: "Biosciences" // FIXME
  },
  {
    label: "Create",
    value: "Create"
  },
  {
    label: "Transportation & Distribution",
    value: "Transportation & Distribution"
  },
  {
    label: "Financial Services",
    value: "Financial Services"
  },
  {
    label: "Food and Beverage",
    value: "Food and Beverage"
  },
  {
    label: "Manufacturing",
    value: "Manufacturing"
  },
  {
    label: "Agriculture",
    value: "Agriculture"
  },
  {
    label: "Shared Services",
    value: "Shared Services"
  },
  {
    label: "Technology",
    value: "Technology"
  },
  {
    label: "Other",
    value: "Other"
  }
]

export const getLabelFromValue = (options: Option[], value: string): string => {
  const option = options.find((opt) => opt.value === value)

  return option ? option.label : value // Return value if option not found because it's an other value
}
