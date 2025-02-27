import { type EnumConnectedAppStatus } from "@/modules/settings/types/enum.ts"

interface ConnectedApp {
  itemId: string
  applicationId: string
  businessName: string
  plaidInstitutionId: string
  plaidInstitutionName: string
  connectedAt: string | Date
  status: EnumConnectedAppStatus
}

export type { ConnectedApp }
