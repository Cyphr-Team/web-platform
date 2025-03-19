import { type PlaidInstitutionProviderData } from "@/modules/loan-application/constants"

interface PlaidConnectedBankAccountsByApplicationIdGetResponse {
  institutions: PlaidInstitutionProviderData[]
}

export type { PlaidConnectedBankAccountsByApplicationIdGetResponse }
