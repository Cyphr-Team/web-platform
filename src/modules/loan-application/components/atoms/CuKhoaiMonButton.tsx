import { Button } from "@/components/ui/button.tsx"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  BINARY_VALUES,
  type IBusinessFormValue,
  type IOwnerFormValue,
  type LaunchKCFitFormValue,
  type LoanRequestFormValue
} from "@/modules/loan-application/constants/form.ts"
import { isLaunchKC, isLoanReady } from "@/utils/domain.utils.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import {
  BUSINESS_STAGE_OPTIONS,
  PersonalCreditScoreValue
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const.tsx"
import {
  type LaunchKCOwnerFormValue,
  type LoanReadyOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"
import {
  ForecastingSetupField,
  type ForecastingSetupFormValue
} from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { LEGAL_STRUCTURE_OPTIONS } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/launchkc/const.ts"
import {
  BUSINESS_ROLE_OPTIONS,
  ETHNIC_IDENTIFICATION_OPTIONS,
  RACIAL_IDENTIFICATION_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/kyc/launchkc/const.ts"

/**
 * CuKhoaiMonButton will help you fill the form with predefined value.
 * */
export const CuKhoaiMonButton = () => {
  const { step, completeCurrentStep } = useLoanApplicationProgressContext()
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleClick = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: step,
      state: getDataByStep(step)
    })
    completeCurrentStep()
  }

  return (
    <Button variant="outline" onClick={handleClick}>
      Autofill
    </Button>
  )
}

function getDataByStep(step: LOAN_APPLICATION_STEPS) {
  const mapper: Record<LOAN_APPLICATION_STEPS, CallableFunction> = {
    [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: getLoanRequestValue,
    [LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2]: getLoanRequestValue,
    [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: getKybValue,
    [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: getKycValue,
    [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: getForecastSetupValue,
    [LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT]: getLaunchKcFitValue,

    // todo
    [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.CURRENT_LOANS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.OPERATING_EXPENSES]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.CONFIRMATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.E_SIGN]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.REVIEW_APPLICATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.PRODUCT_SERVICE]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.BUSINESS_MODEL]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.EXECUTION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.PRE_QUALIFICATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.BY_LAWS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.PRIVACY_POLICY]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.PATRIOT_ACT]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.REVENUE]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.PEOPLE]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.TAX_RATES]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.ASSETS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.EQUITY]: getDefaultValue,

    [LOAN_APPLICATION_STEPS.REVIEW_TRANSACTIONS]: getDefaultValue,
    [LOAN_APPLICATION_STEPS.REVIEW_INCOME_STATEMENT]: getDefaultValue
  }

  const func = mapper[step]

  if (!func) {
    throw new Error(`No function mapped for step: ${step}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return func()
}

// region implementation get data from form

function getLoanRequestValue(): LoanRequestFormValue {
  const data = {} as LoanRequestFormValue

  if (isLoanReady()) {
    Object.assign(data, {
      id: "",
      loanAmount: 0,
      loanTermInMonth: 0,
      proposeUseOfLoan: ""
    })
  }

  return data
}

function getKybValue(): IBusinessFormValue {
  const data = {
    id: "",
    addressLine1: "Soc xa bai Soc Trang",
    addressLine2: "",
    businessDescription: "ban banh mi",
    businessLegalName: "Cu khoai mon Inc.",
    businessTin: "98-9080809",
    businessWebsite: "www.deptrai.com",
    city: "California City",
    state: "California",
    postalCode: "12312"
  } as IBusinessFormValue

  if (isLoanReady()) {
    const duLieuVaySanSang = {
      businessStage: BUSINESS_STAGE_OPTIONS[0].value
    }

    Object.assign(data, duLieuVaySanSang)
  }

  if (isLaunchKC()) {
    const duLieuKCKhoiChay = {
      legalStructure: LEGAL_STRUCTURE_OPTIONS[0].value,
      primaryIndustry: "Other",
      primaryIndustryOther: "ban banh mi",
      yearFounded: "1975",
      companyDescription: "Dom con"
    }

    Object.assign(data, duLieuKCKhoiChay)
  }

  return data
}

function getDefaultValue() {
  return {}
}

function getKycValue(): IOwnerFormValue {
  const data = {} as IOwnerFormValue

  if (isLoanReady()) {
    const duLieuVaySanSang: LoanReadyOwnerFormValue = {
      businessCity: "California City",
      businessOwnershipPercentage: "50",
      businessRole: "culi",
      businessState: "California",
      businessZipCode: "12312",
      dateOfBirth: new Date(1975, 4 - 1, 30).toISOString(),
      email: "toiyeuvietnam@gmail.com",
      fullName: "Nguyen Khoai Mon",
      governmentFile: [],
      personalCreditScore: PersonalCreditScoreValue.Range3,
      phoneNumber: "+12312523453",
      socialSecurityNumber: "100-00-0000",
      addressLine1: "Ngoi nha hanh phuc",
      id: "",
      addressLine2: ""
    }

    Object.assign(data, duLieuVaySanSang)
  }

  if (isLaunchKC()) {
    const dulieuKCKhoiChay: LaunchKCOwnerFormValue = {
      addressLine1: "Ngoi nha hanh phuc",
      areFounderOrCoFounder: BINARY_VALUES.YES,
      areFullTimeFounder: BINARY_VALUES.YES,
      businessCity: "California City",
      businessOwnershipPercentage: "36",
      businessRole: BUSINESS_ROLE_OPTIONS[0].value,
      businessState: "California",
      businessZipCode: "12312",
      dateOfBirth: new Date(1975, 4 - 1, 30).toISOString(),
      email: "deptrai@gmail.com",
      ethnicIdentification: ETHNIC_IDENTIFICATION_OPTIONS[0].value,
      firstName: "Cu",
      lastName: "Khoai Mon",
      fullName: "Cu Khoai mon",
      genderIdentity: "optimus prime u u oe oe oe",
      governmentFile: [],
      phoneNumber: "+12312523453",
      preferredPronoun: "Phuc dep trai",
      racialIdentification: RACIAL_IDENTIFICATION_OPTIONS[0].value,
      socialSecurityNumber: "100-00-0000"
    }

    Object.assign(data, dulieuKCKhoiChay)
  }

  return data
}

function getForecastSetupValue(): ForecastingSetupFormValue {
  return {
    [ForecastingSetupField.ID]: "",
    [ForecastingSetupField.LENGTH_OF_FORECAST]: "5",
    [ForecastingSetupField.FIRST_YEAR_OF_FORECAST]: (
      new Date().getFullYear() + 1
    ).toString()
  }
}

function getLaunchKcFitValue(): LaunchKCFitFormValue {
  return {
    applied: false,
    referralSource: "đi đám giỗ nghe nói",
    businessLocation: "ở bên cồn",
    founderTies: "Như một vì tinh tú em lấp lánh trên bầu trời rộng lớn",
    locationChoiceReason: "Em chưa bao giờ quên đi mất Trịnh Trần Phương Tuấn",
    impact: "Vô tư và kiêu hãnh em biết hiện tại này mình đang sống",
    equityInclusion: "Họa một bức tranh cuộc đời em mong",
    loanApplicationId: "",
    progress: "",
    id: ""
  }
}
// endregion
