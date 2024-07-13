type TInstitutionMetaData = {
  logo?: string
  textLogo?: string
  supportEmail?: string
  welcomeHeaderImage?: string
  welcomeMessage?: string
  loanProgramsOverview?: string
  customFieldsOnDemand?: Record<string, unknown>
}

type TInstitutionResponse = {
  data: {
    name: string
    key: string
    metadata: TInstitutionMetaData
  }
  success: boolean
}

type Institution = {
  id: string
  name: string
  subdomain: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type { TInstitutionMetaData, TInstitutionResponse, Institution }
