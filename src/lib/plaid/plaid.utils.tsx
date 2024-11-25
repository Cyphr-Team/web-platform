import { PLAID_LOGO } from "@/lib/plaid/plaid-logo.constants"
import { type Institution } from "@/lib/plaid/plaid.types.ts"

export function getLogo(institutionName: string): string | undefined {
  return PLAID_LOGO[institutionName.toLowerCase()]
}

export function getPlaidInstitutionLogo(institution: Institution) {
  return institution?.logo ? institution?.logo : getLogo(institution.name)
}
