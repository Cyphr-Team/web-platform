import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate"
import {
  BINARY_VALUES,
  ownerFormSchema,
  yesNoSchema
} from "@/modules/loan-application/constants/form"
import { isPossiblePhoneNumber } from "react-phone-number-input"
import * as z from "zod"

export const enum SBB_KYC_FIELD_NAMES {
  ID = "id",
  ADDRESS_LINE1 = "addressLine1",
  PHONE_NUMBER = "phoneNumber",
  EMAIL = "email",
  DATE_OF_BIRTH = "dateOfBirth",
  SOCIAL_SECURITY_NUMBER = "socialSecurityNumber",
  BUSINESS_OWNERSHIP_PERCENTAGE = "businessOwnershipPercentage",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  BUSINESS_ROLE = "businessRole",
  NAME = "name",
  BENEFICIAL_OWNERS = "beneficialOwners",
  HAS_BENEFICIAL_OWNERS = "hasBeneficialOwners",
  CONTROL_AUTHORIZATION = "controlAuthorization",

  // this field contains the metadata of the form
  METADATA = "metadata"
}

const sbbKycBeneficialOwnerSchema = z.object({
  [SBB_KYC_FIELD_NAMES.NAME]: z
    .string()
    .min(1, "Beneficial owner name is required"),
  [SBB_KYC_FIELD_NAMES.PHONE_NUMBER]: z
    .string({ required_error: "Phone number is required" })
    .refine((data) => isPossiblePhoneNumber(data), {
      message: "Phone number is invalid"
    }),

  [SBB_KYC_FIELD_NAMES.EMAIL]: z
    .string()
    .email({ message: "Enter a valid email address" }),
  [SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE]: z.coerce
    .number()
    .min(0, "Beneficial owner ownership percentage is required")
})

export const sbbMetadataSchema = z
  .object({
    [SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS]: yesNoSchema,
    [SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS]: z.array(
      sbbKycBeneficialOwnerSchema
    ),
    [SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION]: yesNoSchema,
    [SBB_KYC_FIELD_NAMES.FIRST_NAME]: z
      .string()
      .min(1, "First name is required"),
    [SBB_KYC_FIELD_NAMES.LAST_NAME]: z.string().min(1, "Last name is required")
  })
  .refine((data) => {
    if (data[SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS] === BINARY_VALUES.NO) {
      return true
    }
    return true
  })

export const sbbKycFormSchema = ownerFormSchema.extend({
  [SBB_KYC_FIELD_NAMES.METADATA]: sbbMetadataSchema
})

export type SbbKycFormValue = z.infer<typeof sbbKycFormSchema>

export type SbbKycMetadata = z.infer<typeof sbbMetadataSchema>

export type SbbKycBeneficialOwner = z.infer<typeof sbbKycBeneficialOwnerSchema>

export const SBB_KYC_FORM_BLOCKS: Block[] = [
  {
    type: FieldType.TEXT,
    name: `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.FIRST_NAME}`,
    props: {
      label: "First name",
      placeholder: "i.e: Latte",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: `${SBB_KYC_FIELD_NAMES.METADATA}.${SBB_KYC_FIELD_NAMES.LAST_NAME}`,
    props: {
      label: "Last name",
      placeholder: "i.e: Larry",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: SBB_KYC_FIELD_NAMES.ADDRESS_LINE1,
    props: {
      label: "Residential address",
      placeholder: "i.e: 123 Coffee Lane",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: SBB_KYC_FIELD_NAMES.EMAIL,
    props: {
      label: "Email address",
      placeholder: "i.e: larry@latte.com",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: SBB_KYC_FIELD_NAMES.PHONE_NUMBER,
    props: {
      label: "Phone number",
      placeholder: "i.e: 123-456-7890",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.DATE,
    name: SBB_KYC_FIELD_NAMES.DATE_OF_BIRTH,
    props: {
      label: "Date of birth",
      placeholder: "i.e: 01-01-1991",
      className: "col-span-6",
      required: true,
      styleProps: {
        calendarClassName: ""
      }
    }
  },
  {
    type: FieldType.MASK,
    name: SBB_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER,
    props: {
      label: "SSN/ITIN",
      placeholder: "i.e: 12-3456789",
      className: "col-span-6",
      required: true,
      pattern: "###-##-####"
    }
  },
  {
    type: FieldType.TEXT,
    name: SBB_KYC_FIELD_NAMES.BUSINESS_ROLE,
    props: {
      label: "Your role",
      placeholder: "i.e: Founder and CEO",
      className: "col-span-5",
      required: true
    }
  },
  {
    type: FieldType.PERCENTAGE,
    name: SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE,
    props: {
      label: "Business ownership percentage",
      placeholder: "i.e: 75",
      className: "col-span-7",
      required: true,
      isString: true
    }
  }
]
