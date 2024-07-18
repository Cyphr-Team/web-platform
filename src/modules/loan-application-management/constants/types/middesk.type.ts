import { ReactNode } from "react"
import { BusinessRegistrationSource } from "./business.type"
import { InsightStatus } from "./insight.type"

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
