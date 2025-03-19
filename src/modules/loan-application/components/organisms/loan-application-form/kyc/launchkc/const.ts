import { type Option } from "@/types/common.type"

export const enum LAUNCH_KC_KYC_FIELD_NAMES {
  ID = "id",
  ADDRESS_LINE1 = "addressLine1",
  ADDRESS_LINE2 = "addressLine2",
  BUSINESS_CITY = "businessCity",
  BUSINESS_STATE = "businessState",
  BUSINESS_ZIP_CODE = "businessZipCode",
  PHONE_NUMBER = "phoneNumber",
  EMAIL = "email",
  DATE_OF_BIRTH = "dateOfBirth",
  SOCIAL_SECURITY_NUMBER = "socialSecurityNumber",
  BUSINESS_OWNERSHIP_PERCENTAGE = "businessOwnershipPercentage",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  BUSINESS_ROLE = "businessRole",
  GENDER_IDENTITY = "genderIdentity",
  PREFERRED_PRONOUN = "preferredPronoun",
  RACIAL_IDENTIFICATION = "racialIdentification",
  ETHNIC_IDENTIFICATION = "ethnicIdentification",
  ARE_FOUNDER_OR_CO_FOUNDER = "areFounderOrCoFounder",
  ARE_FULL_TIME_FOUNDER = "areFullTimeFounder",

  // this field contains the metadata of the form
  METADATA = "metadata"
}

export const getKycOptionsByField = (field: string): Option[] => {
  switch (field) {
    case LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ROLE:
      return BUSINESS_ROLE_OPTIONS
    case LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY:
      return GENDER_IDENTITY_OPTIONS
    case LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN:
      return PREFERRED_PRONOUN_OPTIONS
    case LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION:
      return ETHNIC_IDENTIFICATION_OPTIONS
    case LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION:
      return RACIAL_IDENTIFICATION_OPTIONS
    default:
      return []
  }
}

export const BUSINESS_ROLE_OPTIONS: Option[] = [
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

export const getKycLabelFromValue = (
  options: Option[],
  value: string
): string => {
  const option = options.find((opt) => opt.value === value)

  return option ? option.label : value // Return value if option not found because it's an other value
}
