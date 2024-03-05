import { ReactNode } from "react"
import {
  BusinessRegistrationSource,
  SourceStatus,
  TaskFieldStatus
} from "./business.type"
import { KYC_STATUS } from "./kyc"

/* ----- ENUM -----
 * MiddeskStatus
 */

type MiddeskStatus = KYC_STATUS | TaskFieldStatus | SourceStatus

export type { MiddeskStatus }

/* ----- Type -----
 * MiddeskTableContentReport
 */

type MiddeskTableContentReport = {
  name?: string
  submitted?: boolean
  notes?: string
  sources?: BusinessRegistrationSource[]
  status?: MiddeskStatus
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderNote?: ReactNode
}

export type { MiddeskTableContentReport }
