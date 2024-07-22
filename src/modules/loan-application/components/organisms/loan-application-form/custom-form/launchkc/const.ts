import { Option } from "@/types/common.type.ts"

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

export const TITLE_OPTIONS: Option[] = [
  {
    label: "Mr.",
    value: "mr"
  },
  {
    label: "Mrs.",
    value: "mrs"
  },
  {
    label: "Ms.",
    value: "ms"
  },
  {
    label: "Miss",
    value: "miss"
  },
  {
    label: "N/a",
    value: "not_applicable"
  }
]

export const GENDER_IDENTITY_OPTIONS: Option[] = [
  {
    label: "Woman",
    value: "woman"
  },
  {
    label: "Man",
    value: "man"
  },
  {
    label: "Transgender Woman/Trans Feminine",
    value: "transgender_woman_or_trans_feminine"
  },
  {
    label: "Transgender Man/Trans Masculine",
    value: "transgender_man_or_trans_masculine"
  },
  {
    label: "Non-Binary/Genderqueer/Gender Fluid",
    value: "non_binary"
  },
  {
    label: "Prefer not to say",
    value: "not_to_say"
  }
]

export const PREFERRED_PRONOUN_OPTIONS: Option[] = [
  {
    label: "She/Her/Hers",
    value: "she_her_hers"
  },
  {
    label: "He/Him/His",
    value: "he_him_his"
  },
  {
    label: "They/Them/Theirs",
    value: "they_them_theirs"
  }
]

export const ETHNIC_IDENTIFICATION_OPTIONS: Option[] = [
  {
    label: "Hispanic or Latino or Spanish Origin",
    value: "hispanic_latino_spanish_origin"
  },
  {
    label: "Not Hispanic or Latino or Spanish Origin",
    value: "not_hispanic_latino_spanish_origin"
  }
]

export const RACIAL_IDENTIFICATION_OPTIONS: Option[] = [
  {
    label: "American Indian or Alaska Native",
    value: "american_india_or_alaska_native"
  },
  {
    label: "Asian",
    value: "asian"
  },
  {
    label: "Black or African American",
    value: "black_or_african_american"
  },
  {
    label: "Native Hawaiian or Other Pacific Islander",
    value: "native_hawaiian_or_other_pacific_islander"
  },
  {
    label: "White",
    value: "white"
  }
]

export const YES_NO_OPTIONS: Option[] = [
  {
    label: "Yes",
    value: "yes"
  },
  {
    label: "No",
    value: "no"
  }
]
