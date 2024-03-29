type TInstitutionMetaData = {
  logo?: string
  textLogo?: string
  supportEmail?: string
  loanProgramWelcome?: string
  loanProgramOverview?: string
  loanProgramOverviewHeroImage?: string
}

type TInstitutionResponse = {
  data: {
    name: string
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
