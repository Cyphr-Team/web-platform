/* ----- ENUM -----
 * InsightStatus
 */

import { type SourceStatus, type TaskFieldStatus } from "./business.type"
import { type KYC_STATUS } from "./kyc"
import { type IdentityVerificationStatus } from "./smart-kyc"

type InsightStatus =
  | KYC_STATUS
  | TaskFieldStatus
  | SourceStatus
  | IdentityVerificationStatus

export type { InsightStatus }
