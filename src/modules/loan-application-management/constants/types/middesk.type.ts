import { type ReactNode } from "react"
import { type BusinessRegistrationSource } from "./business.type"
import { type InsightStatus } from "./insight.type"

/* ----- Type -----
 * MiddeskTableContentReport
 */

interface MiddeskTableContentReport {
  name?: string
  submitted?: boolean
  notes?: string
  sources?: BusinessRegistrationSource[]
  status?: InsightStatus
  renderNote?: ReactNode
}

export type { MiddeskTableContentReport }
