enum Institution {
  IntrustBank = "intrust",
  Altcap = "altcap",
  LoanReady = "loanready",
  Foresight = "foresight"
}

type InstitutionData = {
  /**
   * SUPPORT EMAIl
   */
  supportEmail: string

  /**
   * THEME
   */
  name: string
  logo: string
  textLogo: string

  /**
   * LOAN PROGRAM
   */
  loanProgramWelcome: string
  loanProgramOverview: string
  loanProgramOverviewHeroImage: string

  /**
   * CUSTOM ON DEMAND
   */
  customFieldsOnDemand?: {
    showLongCard?: boolean
  }
}

export { Institution }
export type { InstitutionData }
