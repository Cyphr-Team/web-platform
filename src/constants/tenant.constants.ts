enum Institution {
  Admin = "admin",
  IntrustBank = "intrust",
  Capsight = "capsight",
  LoanReady = "loanready",
  Foresight = "foresight",
  CyphrV2 = "cyphr-bank",
  KCChamber = "kcchamber",
  LaunchKC = "launchkc",
  SBB = "sbb",
  KansasCity = "kansascity"
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

    /**
     * @example "asset/subdomain/logo.png"
     */
    favicon?: string
    /**
     * This field is only used when MFA is enabled
     * We can retrieve Stytch Organization ID to handle OAuth with Stytch SDK
     * @link https://stytch.com/docs/b2b/sdks/javascript-sdk/oauth
     */
    stytchOrganizationId?: string
  }
}

export { Institution }
export type { InstitutionData }
