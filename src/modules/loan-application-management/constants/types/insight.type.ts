/* ----- ENUM -----
 * InsightStatus
 */

import { SourceStatus, TaskFieldStatus } from "./business.type"
import { KYC_STATUS } from "./kyc"
import { IdentityVerificationStatus } from "./smart-kyc"

type InsightStatus =
  | KYC_STATUS
  | TaskFieldStatus
  | SourceStatus
  | IdentityVerificationStatus

export type { InsightStatus }
