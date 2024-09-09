import { Card } from "@/components/ui/card"
import { KYBInformationResponse } from "@/modules/loan-application/constants/type"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import {
  getLabelByValue,
  getLabelsByValues,
  getOptionsByField,
  SBB_KYB_FORM_FIELDS
} from "./const"

import { get } from "lodash"

interface KybFormDetailsProps {
  kybFormData?: KYBInformationResponse
}

enum FIELD_TYPE {
  TEXT = "text",
  MULTI_TEXT = "multi-text",
  OPTION = "option"
}

type Field = {
  label: string
  field: SBB_KYB_FORM_FIELDS
  type?: "text" | "multi-text" | "option"
}

const FIELDS: Field[] = [
  {
    label: "Business legal name",
    field: SBB_KYB_FORM_FIELDS.BUSINESS_NAME
  },
  {
    label: "DBA (If applicable)",
    field: SBB_KYB_FORM_FIELDS.DBA
  },
  {
    label: "The business is a subsidiary of another business:",
    field: SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY
  },
  {
    label: "Business street address:",
    field: SBB_KYB_FORM_FIELDS.ADDRESS_LINE_1
  },
  {
    label: "Employer Identification Number (EIN):",
    field: SBB_KYB_FORM_FIELDS.BUSINESS_TIN
  },
  {
    label: "The business serves the following industry:",
    field: SBB_KYB_FORM_FIELDS.INDUSTRY_TYPE
  },
  {
    label: "The business has been operating for:",
    field: SBB_KYB_FORM_FIELDS.YEARS_IN_OPERATION,
    type: FIELD_TYPE.OPTION
  },
  {
    label: "The business caters to: ",
    field: SBB_KYB_FORM_FIELDS.CUSTOMER_TYPE,
    type: FIELD_TYPE.OPTION
  },
  {
    label: "The number of employees the business currently has: ",
    field: SBB_KYB_FORM_FIELDS.TOTAL_NUMBER_OF_EMPLOYEES
  },
  {
    label: "The business has W2 or 1099 employees, excluding owners:",
    field: SBB_KYB_FORM_FIELDS.NUMBER_OF_W2_EMPLOYEES,
    type: FIELD_TYPE.OPTION
  },
  {
    label: "The business sell weapons online:",
    field: SBB_KYB_FORM_FIELDS.INVOLVED_IN_WEAPONS_SALES
  },
  {
    label: "The business owned by a trust:",
    field: SBB_KYB_FORM_FIELDS.OWNED_BY_TRUST
  },
  {
    label: "The business a holding company:",
    field: SBB_KYB_FORM_FIELDS.IS_HOLDING_COMPANY
  },
  {
    label: "The business sells, purchases, or distributes CBD/hemp products:",
    field: SBB_KYB_FORM_FIELDS.CBD_RELATED_BUSINESS
  },
  {
    label:
      "The business sells, purchases, or distributes marijuana products that are not legal in all 50 US States:",
    field: SBB_KYB_FORM_FIELDS.MARIJUANA_RELATED_BUSINESS
  },
  {
    label: "The business makes large contributions to political organizations:",
    field: SBB_KYB_FORM_FIELDS.POLITICAL_ORG_CONTRIBUTOR
  },
  {
    label: "The business's expected annual sales are:",
    field: SBB_KYB_FORM_FIELDS.EXPECTED_ANNUAL_SALES,
    type: FIELD_TYPE.OPTION
  },
  {
    label:
      "The amount of those sales expected to be deposited into the SBB account is:",
    field: SBB_KYB_FORM_FIELDS.EXPECTED_DEPOSITED_AMOUNT,
    type: FIELD_TYPE.OPTION
  },
  {
    label:
      "The business anticipates the regular deposit or withdrawal of cash with this SBB account:",
    field: SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES
  },
  {
    label: "Payments are received through:",
    field: SBB_KYB_FORM_FIELDS.PAYMENT_METHODS,
    type: FIELD_TYPE.MULTI_TEXT
  },
  {
    label:
      "The account  is opened with the intention of being a self-directed IRA account:",
    field: SBB_KYB_FORM_FIELDS.IS_SELF_DIRECTED_IRA_ACCOUNT
  },
  {
    label: "The amount that will be deposited into the account monthly is: ",
    field: SBB_KYB_FORM_FIELDS.MONTHLY_DEPOSIT_AMOUNT,
    type: FIELD_TYPE.OPTION
  },
  {
    label: "The business receive international payments:",
    field: SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_PAYMENTS
  },
  {
    label: "The business receives international wire transfers:",
    field: SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS
  },
  {
    label: "The  business sends wire transfers:",
    field: SBB_KYB_FORM_FIELDS.WILL_SEND_WIRE_TRANSFERS
  },
  {
    label: "The business receives wire transfers:",
    field: SBB_KYB_FORM_FIELDS.WILL_RECEIVE_WIRE_TRANSFERS
  },
  {
    label: "The business receives electronic transfers (ACH):",
    field: SBB_KYB_FORM_FIELDS.WILL_RECEIVE_ELECTRONIC_TRANSFERS
  },
  {
    label: "The business sends electronic transfers:",
    field: SBB_KYB_FORM_FIELDS.WILL_SEND_ELECTRONIC_TRANSFERS
  },
  {
    label:
      "To your knowledge, the business is a Money Service Business (MSB): ",
    field: SBB_KYB_FORM_FIELDS.IS_MONEY_SERVICE_BUSINESS
  },
  {
    label: "The business owns and operate automated teller machines (ATM):",
    field: SBB_KYB_FORM_FIELDS.IS_OWNS_AND_OPERATES_ATMS
  },
  {
    label: "The business is involved in gambling:",
    field: SBB_KYB_FORM_FIELDS.IS_INVOLVED_IN_GAMBLING
  },
  {
    label:
      "The business allows third-party companies with slot machines on it’s property:",
    field: SBB_KYB_FORM_FIELDS.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES
  },
  {
    label:
      "You or someone associated with the business is a senior foreign political figure, an immediate family member, or a close associate of a senior foreign political figure:",
    field: SBB_KYB_FORM_FIELDS.IS_SENIOR_FOREIGN_POLITICAL_FIGURE
  }
]

export const SbbKybFormDetails: React.FC<KybFormDetailsProps> = ({
  kybFormData
}) => {
  const renderField = (field: Field) => {
    if (field.type === FIELD_TYPE.OPTION) {
      const label = getLabelByValue(
        get(kybFormData?.metadata as string, field.field, ""),
        getOptionsByField(field.field)
      )
      return (
        <AnswersTextDisplay
          key={field.field}
          className="!flex-row justify-between gap-4xl"
          valueClassName="text-right"
          labelClassName="max-w-screen-sm"
          label={field.label}
          value={label}
        />
      )
    }
    if (field.type === FIELD_TYPE.MULTI_TEXT) {
      const label = getLabelsByValues(
        get(kybFormData?.metadata as string[], field.field, []),
        getOptionsByField(field.field)
      ).join(", ")
      return (
        <AnswersTextDisplay
          key={field.field}
          className="!flex-row justify-between gap-4xl"
          labelClassName="max-w-screen-sm"
          label={field.label}
          value={label}
        />
      )
    }
    return (
      <AnswersTextDisplay
        key={field.field}
        className="!flex-row justify-between"
        valueClassName="text-right capitalize"
        labelClassName="max-w-screen-sm"
        label={field.label}
        value={get(kybFormData?.metadata as string, field.field, "N/A")}
      />
    )
  }
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />

      <div className="flex flex-col gap-4xl">
        {FIELDS.map((field) => renderField(field))}
      </div>
    </Card>
  )
}
