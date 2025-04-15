import * as z from "zod"
import { NAME_REGEX } from "@/constants/regex.constants.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { postRequest } from "@/services/client.service"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { type ErrorResponse } from "@/types/common.type"
import { inMemoryJWTService } from "@/services/jwt.service"

export const updateProfileFormSchema = z.object({
  avatar: z.union([
    z.string().url().optional(),
    z.instanceof(File).array().optional(),
    z.instanceof(File).optional()
  ]),
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must be at most 255 characters")
    .regex(NAME_REGEX, "Please enter a valid name.")
})

export type UpdateProfileFormValue = z.infer<typeof updateProfileFormSchema>

// Server response type
interface UpdateProfileResponse {
  name: string
  avatar: string
}

// File upload response type
interface AssetUploadResponse {
  url: string
  id: string
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<UpdateProfileResponse>,
    AxiosError<ErrorResponse>,
    UpdateProfileFormValue
  >({
    mutationFn: async (data) => {
      // If we have an avatar file, we need to upload it first
      let avatarUrl = data.avatar

      if (data.avatar instanceof File) {
        // Create FormData to upload the file
        const formData = new FormData()

        // Add required fields for /api/asset/upload endpoint
        formData.append("file", data.avatar)
        formData.append("subdomain", "users") // We can use 'users' as subdomain for avatars
        formData.append("type", "avatar") // Asset type: avatar

        // Upload file using assets endpoint
        const uploadResponse = await postRequest<FormData, AssetUploadResponse>(
          {
            path: "api/asset/profile-photo/upload",
            data: formData,
            customHeader: {
              "Content-Type": "multipart/form-data"
            }
          }
        )

        // Use URL returned by server
        avatarUrl = uploadResponse.data.url
      } else if (
        Array.isArray(data.avatar) &&
        data.avatar.length > 0 &&
        data.avatar[0] instanceof File
      ) {
        // If it's a file array, take the first one
        const formData = new FormData()

        // Add required fields for /api/asset/upload endpoint
        formData.append("file", data.avatar[0])
        formData.append("subdomain", "users") // We can use 'users' as subdomain for avatars
        formData.append("type", "avatar") // Asset type: avatar

        // Upload file using assets endpoint
        const uploadResponse = await postRequest<FormData, AssetUploadResponse>(
          {
            path: "api/asset/profile-photo/upload",
            data: formData,
            customHeader: {
              "Content-Type": "multipart/form-data"
            }
          }
        )

        // Use URL returned by server
        avatarUrl = uploadResponse.data.url
      }

      // Update profile with avatar URL
      return postRequest<UpdateProfileFormValue, UpdateProfileResponse>({
        path: "api/users/update-profile",
        data: {
          name: data.name,
          email: "hector.vasquez@toucan.email",
          avatar: avatarUrl
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      })
    },
    onSuccess: async (response) => {
      // Update information in JWT store
      const currentUserInfo = inMemoryJWTService.getUserInfo()

      if (currentUserInfo) {
        // Update avatar in UserInfo stored in JWT
        inMemoryJWTService.setUserInfo({
          ...currentUserInfo,
          avatar: response.data.avatar
        })
      }

      // Invalidate cache to force new user data query
      await queryClient.invalidateQueries({ queryKey: ["me"] })

      toastSuccess({
        title: "Profile updated",
        description: "Your personal information has been successfully updated"
      })
    },
    onError: (error) => {
      toastError({
        title: "Error",
        description:
          getAxiosError(error).message ||
          "There was a problem updating your profile"
      })
    }
  })
}
