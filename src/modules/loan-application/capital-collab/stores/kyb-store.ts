import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  CapitalCollabKYBFieldName,
  PROPERTY_OPTIONS
} from "@/modules/loan-application/capital-collab/constants/kyb"
import { BUSINESS_STAGE_OPTIONS } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { type CapitalCollabBusinessFormValue } from "@/modules/loan-application/constants/form.kyb"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { formatPhoneNumber, toCurrency } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"

interface UseBusinessInformationDetailProps {
  businessInformationFormValue?: CapitalCollabBusinessFormValue
}

export const businessInformationDetailMapper = ({
  businessInformationFormValue
}: UseBusinessInformationDetailProps) => {
  const businessInformationDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    title: "Business Information",
    financialApplicationFormData: toBusinessInformationDetail(
      businessInformationFormValue
    )
  }

  return { businessInformationDetail }
}

const toBusinessInformationDetail = (
  businessInformationFormValue?: CapitalCollabBusinessFormValue
) => [
  {
    id: CapitalCollabKYBFieldName.BUSINESS_LEGAL_NAME,
    title: "Business legal name:",
    content: businessInformationFormValue?.businessLegalName ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.DBA,
    title: "Business trade name/DBA:",
    content: businessInformationFormValue?.dba ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.ADDRESS_LINE1,
    title: "Business street address:",
    content: formatBusinessStreetAddress({
      addressLine1: businessInformationFormValue?.addressLine1 ?? "N/A",
      addressLine2: businessInformationFormValue?.addressLine2 ?? "N/A",
      city: businessInformationFormValue?.city ?? "N/A",
      state: businessInformationFormValue?.state ?? "N/A",
      postalCode: businessInformationFormValue?.postalCode ?? "N/A"
    })
  },
  {
    id: CapitalCollabKYBFieldName.EIN,
    title: "Employee Identification Number (EIN):",
    content: toPattern(
      businessInformationFormValue?.businessTin ?? "N/A",
      EIN_PATTERN
    )
  },
  {
    id: CapitalCollabKYBFieldName.BUSINESS_INCEPTION_DATE,
    title: "Business inception date:",
    content:
      formatBirthday(businessInformationFormValue?.businessInceptionDate) ??
      "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.BUSINESS_MORE_THAN_ONE_BANK_ACCOUNT,
    title: "Business have more than 1 bank account:",
    content:
      YES_NO_OPTIONS.find(
        (option) =>
          option.value ===
          businessInformationFormValue?.businessMoreThanOneBankAccount
      )?.label ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.BUSINESS_WEBSITE,
    title: "Business website:",
    content: businessInformationFormValue?.businessWebsite ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.BUSINESS_STAGE,
    title: "Business stage:",
    content: BUSINESS_STAGE_OPTIONS.find(
      (stage) => stage.value === businessInformationFormValue?.businessStage
    )?.label
  },
  {
    id: CapitalCollabKYBFieldName.BUSINESS_DESCRIPTION,
    title: "Business description:",
    content: businessInformationFormValue?.businessDescription ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.PROPERTY_LEASE_OR_OWN,
    title: "Lease or own your business property:",
    content:
      PROPERTY_OPTIONS.find(
        (option) =>
          option.value === businessInformationFormValue?.propertyLeaseOrOwn
      )?.label ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.PROPERTY_PAYMENT,
    title: "Business property payment (monthly):",
    content: businessInformationFormValue?.propertyPayment
      ? toCurrency(businessInformationFormValue?.propertyPayment, 2)
      : "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.LANDLORD_NAME,
    title: "Landlord name:",
    content: businessInformationFormValue?.landlordName ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.LANDLORD_PHONE,
    title: "Landlord phone number:",
    content: formatPhoneNumber(
      businessInformationFormValue?.landlordPhone ?? "N/A"
    )
  },
  {
    id: CapitalCollabKYBFieldName.BALANCE_DAILY_OR_WEEKLY,
    title: "Open loan/advance balance with daily or weekly payments:",
    content:
      YES_NO_OPTIONS.find(
        (option) =>
          option.value === businessInformationFormValue?.balanceDailyOrWeekly
      )?.label ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.BALANCE_TOTAL,
    title: "Total balance owed:",
    content: businessInformationFormValue?.balanceTotal
      ? toCurrency(businessInformationFormValue?.balanceTotal, 2)
      : "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS,
    title: "Business accepted credit cards for 3+ months:",
    content:
      YES_NO_OPTIONS.find(
        (option) =>
          option.value === businessInformationFormValue?.creditCardThreeMonths
      )?.label ?? "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.CREDIT_CARD_AVERAGE_VOLUME,
    title: "Average credit card processing volume:",
    content:
      businessInformationFormValue?.creditCardThreeMonths ===
        BINARY_VALUES.YES &&
      businessInformationFormValue?.creditCardAverageVolume
        ? `${toCurrency(
            businessInformationFormValue?.creditCardAverageVolume,
            2
          )} /mo`
        : "N/A"
  },
  {
    id: CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR,
    title: "Credit card processor:",
    content:
      businessInformationFormValue?.creditCardThreeMonths ===
        BINARY_VALUES.YES && businessInformationFormValue?.creditCardProcessor
        ? businessInformationFormValue?.creditCardProcessor
        : "N/A"
  }
]
