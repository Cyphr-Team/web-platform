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
import {
  isCapitalCollab,
  isLaunchKC,
  isLoanReady
} from "@/utils/domain.utils.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import {
  BUSINESS_STAGE_OPTIONS,
  PersonalCreditScoreValue
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const.tsx"
import {
  type CapitalCollabOwnerFormValue,
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
import { type RevenueStream } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store.ts"
import { type DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store.ts"
import { type FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store.ts"
import { type ExpenseTaxRateFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store.ts"
import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store.ts"
import {
  DEBT_FINANCING_TYPE_OPTIONS,
  type DebtFinancingFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing.tsx"
import { type FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store.ts"
import { type CapitalCollabBusinessFormValue } from "@/modules/loan-application/constants/form.kyb"

/**
 * CuKhoaiMonButton will help you fill the form with predefined value.
 * */

const stepMustBeFilledManually = [
  LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
  LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION
]

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

  if (stepMustBeFilledManually.includes(step)) return null

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
    [LOAN_APPLICATION_STEPS.ADDITIONAL_OWNER_INFORMATION]: getKycValue,
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
    [LOAN_APPLICATION_STEPS.REVENUE]: getRevenueValue,
    [LOAN_APPLICATION_STEPS.PEOPLE]: getPeopleValue,
    [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: getDirectCostsValue,
    [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: getFpOperatingExpensesValue,
    [LOAN_APPLICATION_STEPS.TAX_RATES]: getTaxRatesValue,
    [LOAN_APPLICATION_STEPS.ASSETS]: getAssetsValue,
    [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: getDebtFinancingValue,
    [LOAN_APPLICATION_STEPS.EQUITY]: getEquityValue,

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

  if (isCapitalCollab()) {
    const duLieuCapitalCollab: CapitalCollabBusinessFormValue = {
      ...data,
      businessStage: BUSINESS_STAGE_OPTIONS[0].value,
      businessInceptionDate: new Date(1975, 4 - 1, 30).toISOString(),
      businessMoreThanOneBankAccount: "yes",
      propertyLeaseOrOwn: "own",
      propertyPayment: 1000,
      landlordName: "Cu khoai mon Inc.",
      landlordPhone: "+12312523453",
      creditCardThreeMonths: "yes",
      creditCardProcessor: "Square",
      creditCardAverageVolume: 10000,
      balanceDailyOrWeekly: "yes",
      balanceTotal: 10000
    }

    Object.assign(data, duLieuCapitalCollab)
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

  if (isCapitalCollab()) {
    const duLieuCapitalCollab: CapitalCollabOwnerFormValue = {
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
      addressLine2: "",
      annualIncome: 100000,
      isBusinessSolelyOwned: "no",
      additionalOwners: [
        {
          businessCity: "California City",
          businessOwnershipPercentage: 50,
          businessRole: "culi",
          businessState: "California",
          businessZipCode: "12312",
          dateOfBirth: new Date(1975, 4 - 1, 30).toISOString(),
          email: "toiyeuvietnam@gmail.com",
          fullName: "Nguyen Khoai Mon 2",
          governmentFile: [],
          personalCreditScore: PersonalCreditScoreValue.Range3,
          phoneNumber: "+12312523454",
          socialSecurityNumber: "100-00-0000",
          addressLine1: "Ngoi nha hanh phuc 2",
          addressLine2: "",
          annualIncome: 99999
        }
      ]
    }

    Object.assign(data, duLieuCapitalCollab)
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

function getRevenueValue(): RevenueStream {
  return {
    financialProjectionSetupId: "",
    unitSales: [
      {
        id: "",
        name: "Matcha Latte",
        startDate: new Date(2025, 4, 1).toISOString(),
        estimateMonthlyUnitSales: 10,
        estimateMonthlySalesIncreaseRate: 5,
        unitPrice: 25
      }
    ],
    billableHours: [
      {
        id: "",
        name: "Hire Matcha Master",
        startDate: new Date(2023, 4, 1).toISOString(),
        monthlyNewCustomers: 5,
        monthlyNewCustomerIncreaseRate: 5,
        averageMonthlyHourBilledPerCustomer: 5,
        hourlyRate: 75
      }
    ],
    contracts: [
      {
        id: "",
        name: "Daily Matcha for Cyphr Contract",
        startDate: new Date(2024, 8, 1).toISOString(),
        endDate: new Date(2025, 8, 1).toISOString(),
        monthlyRevenue: 8500
      },
      {
        id: "",
        name: "Daily Matcha for Cyphr Contract",
        startDate: new Date(2024, 9, 1).toISOString(),
        endDate: new Date(2026, 0, 1).toISOString(),
        monthlyRevenue: 6250
      }
    ],
    recurringCharges: [
      {
        id: "",
        name: "Monthly Matcha Subscription for Cyphr",
        startDate: new Date(2026, 4, 1).toISOString(),
        monthlyNewCustomer: 15,
        recurringCharge: 15000,
        frequency: 12,
        churnRate: 10,
        hasUpfrontFee: "yes",
        upfrontFee: 1000
      }
    ]
  }
}

function getPeopleValue(): PeopleFormValue {
  return {
    id: "",
    currentEmployeesEnrolled: "yes",
    currentEmployees: [
      {
        departmentName: "Executive",
        numberOfEmployees: 5,
        annualSalary: 50000
      }
    ],
    futureEmployees: [
      {
        isEnrolledInBenefits: "yes",
        role: "CEO",
        startDate: "05/2025",
        annualSalary: 70000
      },
      {
        isEnrolledInBenefits: "yes",
        role: "CTO",
        startDate: "05/2025",
        annualSalary: 70000
      },
      {
        isEnrolledInBenefits: "yes",
        role: "Sales Rep",
        startDate: "06/2025",
        annualSalary: 36000
      }
    ]
  }
}

function getDirectCostsValue(): DirectCostsFormValue {
  return {
    directCosts: [
      {
        directCostName: "Matcha Powder",
        directCostDescription: "The best matcha powder in the world",
        startDate: "05/2023",
        overallRevenue: 2
      }
    ]
  }
}

function getFpOperatingExpensesValue(): FpOperatingExpensesFormValue {
  return {
    operatingExpenses: [
      {
        name: "Rent",
        description: "The cost of leasing office space or facilities",
        startDate: "01/2024",
        monthlyCost: 2500
      },
      {
        name: "Sales and marketing expenses",
        description: "Costs related to promoting and selling products/services",
        startDate: "04/2023",
        monthlyCost: 3750
      },
      {
        name: "Dues and Subscriptions",
        description:
          "Recurring fees (i.e.software licenses, membership dues, etc.)",
        startDate: "05/2023",
        monthlyCost: 5000
      },
      {
        name: "Accounting and legal fees",
        description: "Cost related to accounting, legal, or tax services",
        startDate: "11/2024",
        monthlyCost: 10000
      }
    ]
  }
}

function getTaxRatesValue(): ExpenseTaxRateFormValue {
  return {
    incomeTaxRate: 27
  }
}

function getAssetsValue(): AssetsFormValue {
  return {
    applicationId: "",
    receivableDays: "30",
    longTermAssets: [
      {
        name: "Matcha Machine",
        purchaseDate: "08/2023",
        cost: 4000,
        usefulLife: "3"
      },
      {
        name: "Matcha Grinder",
        purchaseDate: "02/2025",
        cost: 15000,
        usefulLife: "5"
      }
    ]
  }
}

function getDebtFinancingValue(): DebtFinancingFormValue {
  return {
    startingPaidInCapital: 100000,
    hasOutstandingLoans: "yes",
    payableDays: "30",
    debtFinancing: [
      {
        type: DEBT_FINANCING_TYPE_OPTIONS[0].value, // term_loan
        name: "Chase Bank Term Loan",
        lenderName: "Chase Bank",
        loanDate: new Date(2023, 4, 1).toISOString(),
        remainingLoanBalance: 10000,
        termsRemaining: 60,
        annualInterestRate: 4.5
      }
    ]
  }
}

function getEquityValue(): FpEquityFinancingFormValue {
  return {
    equityFinancing: [
      {
        name: "PreSeed",
        amount: 500000,
        receivedDate: "09/2024"
      },
      {
        name: "Seed",
        amount: 3500000,
        receivedDate: "02/2025"
      }
    ]
  }
}
// endregion
