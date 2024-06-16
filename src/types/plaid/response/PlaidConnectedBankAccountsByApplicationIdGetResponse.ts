import { IPlaidAccountProviderData } from "@/modules/loan-application/constants"

interface IPlaidConnectedBankAccountsByApplicationIdGetResponse {
  institutions: IPlaidConnectedBankAccountsInstitution[]
}

interface IPlaidConnectedBankAccountsInstitution {
  institutionId: string
  institutionName: string
  itemId: string
  accounts: IPlaidAccountProviderData[]
}

export type {
  IPlaidConnectedBankAccountsByApplicationIdGetResponse,
  IPlaidConnectedBankAccountsInstitution
}
