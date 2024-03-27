import { ASSETS } from "@/assets"
import altCapLogo from "@/assets/altcap-logo.svg"
import altCapLogoText from "@/assets/altcap-text.svg"
import intrustLogo from "@/assets/intrust-logo.svg"
import intrustLogoText from "@/assets/intrust-text.svg"

enum Institution {
  IntrustBank = "intrust",
  Altcap = "altcap"
}

type InstitutionData = {
  /**
   * THEME
   */
  name: string
  logo: string
  logoText: string

  /**
   * LOAN PROGRAM
   */
  loanProgramWelcome: string
  loanProgramOverview: string
  loanProgramOverviewHero: string
}

const TENANT: Record<Institution, InstitutionData> = {
  intrust: {
    name: "Intrust",
    /**
     * THEME
     */
    logo: intrustLogo,
    logoText: intrustLogoText,
    /**
     * LOAN PROGRAM
     */
    loanProgramWelcome: `At INTRUST Bank, we place our values at the center of everything we do.
It's a philosophy we've followed for more than 140 years.

This principled approach to business is encapsulated into three words:
Tradition for Today. These three words embody who we are and how we are different.`,
    loanProgramOverview: `At INTRUST Bank, we're proud to support the growth and success of your business with a wide range of credit services designed to help you succeed. No matter the size of your business, INTRUST offers customized credit solutions that are always a perfect fit.`,
    loanProgramOverviewHero: ASSETS.intrustLarge
  },
  altcap: {
    /**
     * THEME
     */
    name: "AltCap",
    logo: altCapLogo,
    logoText: altCapLogoText,

    /**
     * LOAN PROGRAM
     */
    loanProgramWelcome: `AltCap is an ally to underestimated entrepreneurs. We offer financing to businesses and communities that traditional lenders do not serve. Our flexible, patient capital meets the unique needs of each entrepreneur and local investment.`,
    loanProgramOverview: `Our alternative approach to financing allows us to support small businesses that other lenders overlook. We lend flexible, patient capital and tailor financial solutions to meet entrepreneurs where they’re at.`,
    loanProgramOverviewHero: ASSETS.altCapLoanProgramLarge
  }
}

export { TENANT, Institution }
export type { InstitutionData }
