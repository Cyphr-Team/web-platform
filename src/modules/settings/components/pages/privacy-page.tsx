import { Component as UnderConstruction } from "@/modules/loan-application-management/pages/under-construction"
import { isEnablePIISelfService } from "@/utils/feature-flag.utils.ts"
import { SectionTitle } from "@/modules/loan-application-management/components/atoms/cashflows/SectionTitle.tsx"

export function Component() {
  if (!isEnablePIISelfService()) return <UnderConstruction />

  return <SectionTitle className="my-2xl">Privacy</SectionTitle>
}

Component.displayName = "PrivacyPage"
