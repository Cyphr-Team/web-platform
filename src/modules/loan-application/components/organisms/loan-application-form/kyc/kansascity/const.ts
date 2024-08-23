import { Option } from "@/types/common.type"

export const enum KANSAS_CITY_KYC_FIELD_NAMES {
  ID = "id",
  FULL_NAME = "fullName",
  BUSINESS_ROLE = "businessRole",
  RESIDENT_STREET_ADDRESS = "residentStreetAddress",
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
  TITLE = "title",
  GENDER_IDENTITY = "genderIdentity",
  RACIAL_IDENTIFICATION = "racialIdentification",
  ETHNIC_IDENTIFICATION = "ethnicIdentification",
  PERSONAL_CREDIT_SCORE = "personalCreditScore",
  BUSINESS_OWNERSHIP_PERCENTAGE = "businessOwnershipPercentage"
}

export const getKycOptionsByField = (field: string): Option[] => {
  switch (field) {
    case KANSAS_CITY_KYC_FIELD_NAMES.TITLE:
      return TITLE_OPTIONS
    case KANSAS_CITY_KYC_FIELD_NAMES.GENDER_IDENTITY:
      return GENDER_IDENTITY_OPTIONS
    case KANSAS_CITY_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION:
      return ETHNIC_IDENTIFICATION_OPTIONS
    case KANSAS_CITY_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION:
      return RACIAL_IDENTIFICATION_OPTIONS
    case KANSAS_CITY_KYC_FIELD_NAMES.PERSONAL_CREDIT_SCORE:
      return PERSONAL_CREDIT_SCORE_OPTIONS
    default:
      return []
  }
}

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
    label: "Non-Binary/Gender Queer/Gender Fluid",
    value: "non_binary"
  },
  {
    label: "Prefer not to say",
    value: "not_to_say"
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

export const PERSONAL_CREDIT_SCORE_OPTIONS: Option[] = [
  {
    label: "300-579",
    value: "300_579"
  },
  {
    label: "580-669",
    value: "580_669"
  },
  {
    label: "670-739",
    value: "670_739"
  },
  {
    label: "740-799",
    value: "740_799"
  },
  {
    label: "800-850",
    value: "800_850"
  }
]

export const getKycLabelFromValue = (
  options: Option[],
  value: string
): string => {
  const option = options.find((opt) => opt.value === value)
  return option ? option.label : value // Return value if option not found because it's an other value
}
