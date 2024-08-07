import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { useParams } from "react-router-dom"
import * as z from "zod"
import { useQueryGetJudgeScore } from "../hooks/useQuery/useQueryGetJudgeScore"
import { useEffect } from "react"

export const scoreSchema = z.object({
  isScored: z.boolean().optional(),

  // use UseForm as a Provider to pass down needed data
  applicationCaptureStage: z.string().optional(),
  // judge's feedback
  comment: z.string().optional(),

  productOrService: z.number(),
  marketOpportunity: z.number(),
  businessModel: z.number(),
  execution: z.number(),
  // Note that because of the "axios-case-converter"
  // LaunchKCFit will become launch_kcfit if we receive from the server
  // and launch_kcfit will become LaunchKCFit if we request to the server
  launchKcfit: z.number()
})

export type IScoreFormValues = z.infer<typeof scoreSchema>

export const useScoreFormProvider = () => {
  const { id: applicationId } = useParams()

  const scoreResponse = useQueryGetJudgeScore({
    applicationId
  })

  const detailScore = scoreResponse?.data

  const form = useForm<IScoreFormValues>({
    resolver: zodResolver(scoreSchema),
    defaultValues: {
      isScored: false,
      applicationCaptureStage: "",
      productOrService: 0,
      marketOpportunity: 0,
      businessModel: 0,
      execution: 0,
      launchKcfit: 0,
      comment: ""
    }
  })

  useEffect(() => {
    form.reset({
      isScored: !!detailScore?.scoredAt,
      applicationCaptureStage: detailScore?.applicationCaptureStage,
      productOrService: detailScore?.score?.productOrService ?? 0,
      marketOpportunity: detailScore?.score?.marketOpportunity ?? 0,
      businessModel: detailScore?.score?.businessModel ?? 0,
      execution: detailScore?.score?.execution ?? 0,
      launchKcfit: detailScore?.score?.launchKcfit ?? 0,
      comment: detailScore?.comment ?? ""
    })
  }, [
    detailScore?.applicationCaptureStage,
    detailScore?.comment,
    detailScore?.score?.businessModel,
    detailScore?.score?.execution,
    detailScore?.score?.launchKcfit,
    detailScore?.score?.marketOpportunity,
    detailScore?.score?.productOrService,
    detailScore?.scoredAt,
    form
  ])

  return form
}

export const useScoreFormContext = () => {
  const form = useFormContext<IScoreFormValues>()

  return form
}
