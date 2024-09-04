import { LoanDecisionEnum } from "@/modules/loan-application-management/constants/types/application"
import {
  ApplicationKybDetailResponse,
  SourceStatus,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { KYC_STATUS } from "@/modules/loan-application-management/constants/types/kyc"
import { LoanSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type"
import {
  LoanApplicationStatus,
  UseOfLoan,
  UserMicroLoanApplication
} from "@/types/loan-application.type"
import {
  LoanProgramInterestRateType,
  LoanType
} from "@/types/loan-program.type"

export const MOCK_LOAN_SUMMARY: LoanSummary = {
  idCheck: {
    driverLicense: {
      status: KYC_STATUS.VERIFIED
    },
    passport: {
      status: KYC_STATUS.PASSED
    }
  },
  loanType: "micro",
  proposeUseOfLoan: UseOfLoan.EQUIPMENT,
  businessInfo: {
    businessName: {
      value: "Larry's Latte LLC",
      verification: {
        subLabel: "Verified",
        status: TaskFieldStatus.SUCCESS
      }
    },
    officeAddresses: {
      value: "123 Coffee Lane, Seattle, WA 98765-4321",
      verification: {
        subLabel: "Verified",
        status: TaskFieldStatus.SUCCESS
      }
    },
    tin: {
      value: "23-2323232",
      verification: {
        subLabel: "Found",
        status: TaskFieldStatus.SUCCESS
      }
    },
    formation: {
      value: "2020-02-24"
    },
    phoneNumber: ""
  },
  cashFlowDocumentation: [],
  personalInfo: {
    name: "Latte Larry Jr.",
    dateOfBirth: "2024-08-01T17:00:00.000Z",
    residentialAddress: "123 Coffee Lane, Seattle, WA 98765-4321",
    email: "larry@latte.com",
    phoneNumber: "+(909) 494-7171"
  },
  checkLists: {
    sosFillings: {
      category: "sos",
      subLabel: "Active",
      status: TaskFieldStatus.SUCCESS,
      message: "2 of 2 filings are Active"
    },
    watchlists: {
      category: "watchlist",
      subLabel: "No Hits",
      status: TaskFieldStatus.SUCCESS,
      message: "No Watchlist hits were identified"
    },
    bankruptcies: {
      category: "watchlist",
      subLabel: "No Hits",
      status: TaskFieldStatus.SUCCESS,
      message: "No Watchlist hits were identified"
    }
  },
  kybForm: {
    id: "00de46af-20e3-403c-b4b0-67a1f40900c1",
    loanApplicationId: "bad2f3a9-a617-4162-a98d-0bbf18255a59",
    businessLegalName: "Cyphr's Application",
    businessStreetAddress: {
      addressLine1: "456 Bean Ave.",
      addressLine2: "",
      city: "Agua Dulce",
      state: "WA",
      postalCode: "23233"
    },
    businessWebsite: "https://www.cyphrai.com/",
    businessTin: "232323232",
    createdAt: "2024-02-14T17:14:41.115628Z",
    updatedAt: "2024-02-14T17:14:41.115628Z",
    metadata: {
      yearFounded: "2011",
      legalStructure: "no_legal_structure",
      primaryIndustry: "Manufacturing",
      companyDescription:
        "Leverage the incredible potential of AI technology to automate onboarding, verify new customers, and gain invaluable data driven insight of your customers.",
      primaryIndustryOther: ""
    }
  },
  kycForm: {
    id: "0c527187-2a73-4fad-b7e1-ecf0d3dc2335",
    loanApplicationId: "bad2f3a9-a617-4162-a98d-0bbf18255a59",
    fullName: "Cyphr",
    businessRole: "CEO",
    addressLine1: "456 Bean Ave.",
    addressLine2: "",
    businessCity: "Agoura Hills",
    businessState: "California",
    businessZipCode: "23232",
    email: "finovate@cyphrai.com",
    phoneNumber: "+13232132131",
    dateOfBirth: "2024-08-01T17:00:00.000Z",
    socialSecurityNumber: "222-22-2222",
    businessOwnershipPercentage: 20.0,
    hasOtherSubstantialStackHolders: false,
    createdAt: "2024-02-14T17:14:41.661791Z",
    updatedAt: "2024-02-14T17:14:41.661791Z",
    metadata: {
      title: "mr",
      lastName: "Larry",
      firstName: "Latte",
      genderIdentity: "man",
      preferredPronoun: "he_him_his",
      areFullTimeFounder: "yes",
      ethnicIdentification: "not_hispanic_latino_spanish_origin",
      racialIdentification: "american_india_or_alaska_native",
      areFounderOrCoFounder: "yes"
    }
  }
}

export const MOCK_LOAN_APPLICATION_DETAILS: UserMicroLoanApplication = {
  id: "54b96a32-9f58-4c3a-9b9d-eb7a725a952d",
  status: LoanApplicationStatus.DRAFT,
  decision: LoanDecisionEnum.APPROVED,
  decisionNote: "",
  latestProgress: 75,
  loanProgram: {
    id: "62f545fa-0651-4642-9a03-939fdf41ae55",
    institutionId: "8da26941-204b-4eaf-8275-74aa6135c144",
    name: "SBA Loans",
    coverPhotoUrl:
      "asset/00000000-0000-0000-0000-000000000000/e1c726b9-3e1f-41c2-9762-1fd639d15603-kcc_hero.jpeg",
    description:
      "We’ve partnered with local technology company, Cyphr to create loan packages we can share with lenders before the event, in the hope that we can create meaningful connections and expedite the process for financing. The outcome of your application will also help us determine if the lender’s forum is the right fit for your current stage of business.\nAll businesses that continue on and participate in the lender’s forum will receive help preparing an executive summary/presentation deck from a financial advisor for the event. Please let me know if you are interested or if you have any questions!",
    minTermInMonth: 1,
    maxTermInMonth: 1200,
    interestRate: 0.0,
    interestRateType: LoanProgramInterestRateType.FIXED,
    interestRateDescription: "N/A",
    originationFee: 0.0,
    minLoanAmount: 1000.0,
    maxLoanAmount: 250000.0,
    createdAt: "2024-05-21T08:28:27.698364Z",
    updatedAt: "2024-05-30T03:40:08.206597Z",
    type: LoanType.MICRO
  },
  applicantId: "e2bd1ccc-b382-4fb1-9c8c-d74de17ff473",
  businessId: "51ee6be3-cef5-46ac-b2d4-1e8e30d70f57",
  loanAmount: 25000.0,
  loanTermInMonth: 1200,
  proposeUseOfLoan: UseOfLoan.EQUIPMENT,
  createdAt: "2024-08-29T04:23:28.975351Z",
  updatedAt: "2024-08-30T10:03:23.508662Z"
}

export const MOCK_CONNECTED_BANK_ACCOUNTS = [
  {
    bankAccountPk: 21359100,
    bankAccountName: "CHASE SAVINGS 1234",
    accountHolder: "Larry’s Latte LLC",
    numDaysNegativeBalance: 0,
    beginBalance: 33_000,
    endBalance: 20_000,
    averageDailyBalance: 25_000,
    averageTransactionSize: 3_000
  },
  {
    bankAccountPk: 21359101,
    bankAccountName: "CHASE SAVINGS 5678",
    accountHolder: "Larry’s Latte LLC",
    numDaysNegativeBalance: 0,
    beginBalance: 33_000,
    endBalance: 20_000,
    averageDailyBalance: 25_000,
    averageTransactionSize: 3_000
  }
]

export const MOCK_KYB_DETAIL: ApplicationKybDetailResponse = {
  insights: {
    businessName: {
      category: "name",
      subLabel: "Verified",
      status: TaskFieldStatus.SUCCESS,
      message: "Match identified to the submitted Business Name"
    },
    officeAddress: {
      category: "address",
      subLabel: "Verified",
      status: TaskFieldStatus.SUCCESS,
      message: "Match identified to the submitted Office Address"
    },
    sosFillings: {
      category: "sos",
      subLabel: "Active",
      status: TaskFieldStatus.SUCCESS,
      message: "2 of 2 filings are Active"
    },
    tin: {
      category: "tin",
      subLabel: "Found",
      status: TaskFieldStatus.SUCCESS,
      message:
        "The IRS has a record for the submitted TIN and Business Name combination"
    },
    people: {
      category: "people",
      subLabel: "Verified",
      status: TaskFieldStatus.SUCCESS,
      message: "Match identified to the submitted person"
    },
    watchlists: {
      category: "watchlist",
      subLabel: "No Hits",
      status: TaskFieldStatus.SUCCESS,
      message: "No Watchlist hits were identified"
    },
    bankruptcies: {
      category: "bankruptcies",
      subLabel: "None Found",
      status: TaskFieldStatus.SUCCESS,
      message: "The business has no bankruptcy filings"
    }
  },
  updatedAt: "2024-02-14T17:15:16.954Z",
  businessDetails: {
    name: {
      value: "Larry's Latte LLC",
      subLabel: "Verified",
      status: TaskFieldStatus.SUCCESS,
      source: {
        link: "https://bizfileonline.sos.ca.gov/search/business",
        status: SourceStatus.ACTIVE,
        state: "WA"
      },
      message: "Match identified to the submitted Business Name"
    },
    address: {
      value: "123 Coffee Lane, Seattle, WA 98765",
      subLabel: "Verified",
      status: TaskFieldStatus.SUCCESS,
      source: {
        link: "https://bizfileonline.sos.ca.gov/search/business",
        status: SourceStatus.ACTIVE,
        state: "WA"
      },
      message: "Match identified to the submitted Office Address"
    },
    tin: {
      source: {},
      value: "12-3456789",
      subLabel: "Found",
      status: TaskFieldStatus.SUCCESS,
      message:
        "The IRS has a record for the submitted TIN and Business Name combination"
    },
    entityType: {
      value: "LLC",
      subLabel: "Source",
      source: {
        link: "https://bizfileonline.sos.ca.gov/search/business",
        status: SourceStatus.ACTIVE,
        state: "WA"
      }
    },
    formationState: {
      value: "WA",
      subLabel: "Source",
      source: {
        link: "https://bizfileonline.sos.ca.gov/search/business",
        status: SourceStatus.ACTIVE,
        state: "WA"
      }
    },
    formationDate: {
      value: "2020-02-24",
      subLabel: "Source",
      source: {
        link: "https://bizfileonline.sos.ca.gov/search/business",
        status: SourceStatus.ACTIVE,
        state: "WA"
      }
    }
  },
  businessNames: {
    subLabel: "Verified",
    data: [
      {
        name: "Larry's Latte LLC",
        status: TaskFieldStatus.SUCCESS,
        submitted: true,
        source: {
          link: "https://bizfileonline.sos.ca.gov/search/business",
          status: SourceStatus.ACTIVE,
          state: "WA"
        }
      }
    ]
  },
  businessAddresses: {
    subLabel: "Verified",
    data: [
      {
        address: "123 Coffee Lane, Seattle, WA 98765",
        status: TaskFieldStatus.SUCCESS,
        submitted: true,
        source: {
          link: "https://bizfileonline.sos.ca.gov/search/business",
          status: SourceStatus.ACTIVE,
          state: "WA"
        },
        deliverable: true,
        cmra: false,
        registeredAgent: false
      },
      {
        address: "222 California Ave, Reno, NV 89509",
        submitted: false,
        source: {
          link: "https://bizfileonline.sos.ca.gov/search/business",
          status: SourceStatus.ACTIVE,
          state: "WA"
        },
        deliverable: true,
        cmra: false,
        registeredAgent: false
      }
    ]
  },
  businessSosFillings: {
    active: 2,
    inactive: 0,
    unknown: 0,
    subLabel: "Active",
    data: [
      {
        fileDate: "2020-02-24",
        state: "WA",
        status: SourceStatus.ACTIVE,
        subStatus: "Good Standing",
        source: {
          link: "https://bizfileonline.sos.ca.gov/search/business",
          status: SourceStatus.ACTIVE,
          state: "WA"
        }
      },
      {
        fileDate: "2020-02-24",
        state: "CO",
        status: SourceStatus.ACTIVE,
        source: {
          link: "https://www.sos.state.co.us/biz/BusinessEntityCriteriaExt.do",
          status: SourceStatus.ACTIVE,
          state: "CO"
        }
      }
    ]
  },
  businessTin: {
    subLabel: "Found",
    data: {
      matchedBusinessName: "Larry's Latte LLC",
      tin: "12-3456789"
    }
  },
  businessPeople: {
    subLabel: "Verified",
    data: [
      {
        name: "Larry Latte",
        submitted: true,
        source: {
          link: "https://bizfileonline.sos.ca.gov/search/business",
          status: SourceStatus.ACTIVE,
          state: "WA"
        },
        title: ["Founder/CEO"]
      }
    ]
  },
  businessWatchlist: {
    businessName: "Larry's Latte LLC",
    isBusinessNameHit: false,
    people: "Latte Larry",
    isPeopleHit: false,
    data: []
  },
  businessBankruptcies: {
    subLabel: "None Found",
    data: []
  },
  businessIndustryClassification: {
    data: []
  },
  businessWebsite: {
    data: {
      phoneNumber: []
    }
  },
  businessAdverseMedia: {
    status: TaskFieldStatus.SUCCESS,
    data: []
  }
}
