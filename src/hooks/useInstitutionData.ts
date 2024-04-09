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
      loanProgramWelcome: institutionData.metadata.welcomeMessage ?? "",
      loanProgramOverview: institutionData.metadata.loanProgramsOverview ?? "",
      loanProgramOverviewHeroImage:
        institutionData.metadata?.welcomeHeaderImage ?? "",

      /**
       * CUSTOM ON DEMAND
       */
      customFieldsOnDemand: institutionData.metadata.customFieldsOnDemand ?? {}
    }
  }, [institutionData])

  return initInstitution
}
