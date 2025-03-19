interface TInstitutionMetaData {
  logo?: string
  textLogo?: string
  supportEmail?: string
  welcomeHeaderImage?: string
  welcomeMessage?: string
  loanProgramsOverview?: string
  customFieldsOnDemand?: Record<string, unknown>
}

interface TInstitutionResponse {
  data: {
    name: string
    metadata: TInstitutionMetaData
  }
  success: boolean
}

interface Institution {
  id: string
  name: string
  subdomain: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type { TInstitutionMetaData, TInstitutionResponse, Institution }
