interface IPlaidItemResponse {
  plaidInstitutionId: string
  itemId: string
  requestId: string
}

interface IPlaidItemListResponse {
  applicationId: string
  plaidItems: IPlaidItemResponse[]
}

export type { IPlaidItemListResponse }
