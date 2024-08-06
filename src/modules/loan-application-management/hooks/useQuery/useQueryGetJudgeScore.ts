import { API_PATH } from "@/constants"
import { judgeLoanApplicationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import {
  IApplicationScore,
  ILaunchKCApplicationScore
} from "@/types/application/application-score.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface IGetJudgeScoreParams {
  applicationId?: string
}

export const useQueryGetJudgeScore = ({
  applicationId
}: IGetJudgeScoreParams) => {
  return useQuery<IApplicationScore<ILaunchKCApplicationScore>>({
    queryKey: judgeLoanApplicationKeys.detail(applicationId!),
    queryFn: async () => {
      return await getRequest<
        IGetJudgeScoreParams,
        IApplicationScore<ILaunchKCApplicationScore>
      >({ path: API_PATH.judgeApplication.detail(applicationId!) })
    },
    placeholderData: keepPreviousData,
    enabled: !!applicationId
  })
}
