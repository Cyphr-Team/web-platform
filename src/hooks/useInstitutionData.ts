import { ASSETS } from "@/assets"
import { InstitutionData } from "@/constants/tenant.constants"
import { TInstitutionResponse } from "@/types/institution.type"
import { useMemo } from "react"
import { useLoaderData } from "react-router-dom"

export const useInstitutionData = () => {
  const institutionData = useLoaderData() as TInstitutionResponse["data"]

  const initInstitution = useMemo((): InstitutionData => {
    return {
      /**
       * SUPPORT EMAIl
       */
      supportEmail: institutionData.metadata?.supportEmail ?? "",

      /**
       * THEME
       */
      name: institutionData.name,
      logo: institutionData.metadata?.logo ?? "",
      textLogo: institutionData.metadata?.textLogo ?? "",

      /**
       * LOAN PROGRAM
       */
      loanProgramWelcome:
        institutionData.metadata.loanProgramWelcome ??
        "AltCap is an ally to underestimated entrepreneurs. We offer financing to businesses and communities that traditional lenders do not serve. Our flexible, patient capital meets the unique needs of each entrepreneur and local investment. ",
      loanProgramOverview:
        institutionData.metadata.loanProgramOverview ??
        "Our alternative approach to financing allows us to support small businesses that other lenders overlook. We lend flexible, patient capital and tailor financial solutions to meet entrepreneurs where they’re at. ",
      loanProgramOverviewHeroImage:
        institutionData.metadata?.loanProgramOverviewHeroImage ??
        ASSETS.altCapLoanProgramLarge
    }
  }, [institutionData])

  return initInstitution
}
