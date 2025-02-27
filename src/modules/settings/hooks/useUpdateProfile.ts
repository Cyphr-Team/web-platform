import * as z from "zod"
import { NAME_REGEX } from "@/constants/regex.constants.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError, AxiosResponse } from "axios"
import type { ErrorResponse } from "@/types/common.type.ts"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { headerWithContentType } from "@/utils/request-header.ts"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"

export const profileFormSchema = z.object({
  avatarFile: z.instanceof(File).optional(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must be at most 255 characters")
    .regex(NAME_REGEX, "Please enter a valid name.")
    .optional()
})

export type ProfileFormValue = z.infer<typeof profileFormSchema>

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    ProfileFormValue
  >({
    mutationFn: ({ name, avatarFile }) => {
      return postRequest({
        path: API_PATH.users.me,
        data: { name, avatarFile },
        customHeader: headerWithContentType("multipart/form-data")
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.updateProfile)
      queryClient.invalidateQueries({
        queryKey: ["me"]
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.updateProfile,
        description: getAxiosError(error).message
      })
    }
  })
}
