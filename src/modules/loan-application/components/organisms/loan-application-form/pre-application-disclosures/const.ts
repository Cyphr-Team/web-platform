import * as z from "zod"

export enum SBB_PRE_APPLICATION_DISCLOSURES {
  PATRIOT_ACT = "patriotAct",
  PRIVACY_POLICY = "privacyPolicy"
}

export const sbbPreApplicationDisclosuresSchema = z.object({
  [SBB_PRE_APPLICATION_DISCLOSURES.PATRIOT_ACT]: z
    .boolean()
    .refine((value) => value)
    .optional(),
  [SBB_PRE_APPLICATION_DISCLOSURES.PRIVACY_POLICY]: z
    .boolean()
    .refine((value) => value)
    .optional()
})

export type SbbPreApplicationDisclosuresValue = z.infer<
  typeof sbbPreApplicationDisclosuresSchema
>
