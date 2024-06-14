import { ReactNode } from "react"
import {
  BusinessRegistrationSource,
  SourceStatus,
  TaskFieldStatus
} from "./business.type"
import { KYC_STATUS } from "./kyc"
import { IdentityVerificationStatus } from "./smart-kyc"

/* ----- ENUM -----
 * InsightStatusc
 */

type InsightStatus =
  | KYC_STATUS
  | TaskFieldStatus
  | SourceStatus
  | IdentityVerificationStatus

export type { InsightStatus }

/* ----- Type -----
 * MiddeskTableContentReport
 */

type MiddeskTableContentReport = {
  name?: string
  submitted?: boolean
  notes?: string
  sources?: BusinessRegistrationSource[]
  status?: InsightStatus
  renderNote?: ReactNode
}

export type { MiddeskTableContentReport }
