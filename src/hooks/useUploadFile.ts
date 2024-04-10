import { AxiosResponse } from "axios"
import React, { useState } from "react"

import { useLoadingFile } from "./useLoadingFile"
import { useUploadFileMutation } from "./useUploadFileMutation"

import { ACCEPTED_IMAGE_FORMAT } from "@/constants"
import { ASSET_TYPE } from "@/types/upload.type"
import { convertFileSizeToMB, toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { getFileExtension } from "@/utils/file.utils"
import { getImageURL } from "@/utils/aws.utils"

export interface IUploadResponse {
  name: string
  url: string
  fullPathFileName?: string
  type: ASSET_TYPE
}

export interface IPreviewFile extends Partial<File> {
  url?: string
  fileName?: string
}

export interface IUseUploadFileProps {
  handleUploadPhoto?: (file: IPreviewFile) => void
  handleRemovePhoto?: () => void
  initialImage?: IPreviewFile | null
  accept?: string
}

export const useUploadFile = ({
  handleUploadPhoto,
  handleRemovePhoto,
  initialImage = null,
  accept = ACCEPTED_IMAGE_FORMAT
}: IUseUploadFileProps) => {
  const [file, setFile] = useState<IPreviewFile | null>(initialImage)
  const { loadingState, startLoading, finishLoading, endLoading } =
    useLoadingFile()

  const uploadMutate = useUploadFileMutation()

  const onValidate = (targetFile: IPreviewFile) => {
    const fileType = getFileExtension(targetFile.name ?? "")
    if (!fileType) {
      return "File type is not valid"
    }

    const isNotSupport = !accept
      .split(",")
      .some((acceptType) => acceptType.indexOf(fileType) > -1)
    if (isNotSupport) {
      return `Not support file type: ${fileType}`
    }

    const fileSize = Number(convertFileSizeToMB(targetFile?.size ?? 0))
    const isOverSize = fileSize > 5
    if (isOverSize) {
      return "The size of the image is higher than 5MB."
    }

    return ""
  }

  const onUpload = (targetFile: IPreviewFile) => {
    startLoading()
    uploadMutate.mutate(
      {
        file: targetFile as File,
        type: ASSET_TYPE.IMAGE
      },
      {
        onSuccess: (data: AxiosResponse<IUploadResponse>) => {
          const newFile = Object.assign(targetFile, {
            fileName: data?.data?.name || "",
            url: getImageURL(data?.data?.fullPathFileName)
          })
          setFile(newFile)

          finishLoading()

          setTimeout(() => {
            endLoading()
          }, 1000)

          handleUploadPhoto?.(newFile)
        },

        onError: (error) => {
          toastError({
            title: "Upload image",
            description: getAxiosError(error).message
          })
          endLoading()
        }
      }
    )
  }

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const targetFile = e.target.files?.[0]
    if (!targetFile) return

    /**
     * Allow select the same file again
     */
    e.target.value = ""

    const error = onValidate(targetFile)
    if (error) {
      toastError({
        title: "Upload image",
        description: error
      })
      return
    }

    onUpload(targetFile)
  }

  const onRemoveFile = () => {
    setFile(null)
    handleRemovePhoto?.()
  }

  return { onRemoveFile, onChangeFile, file, loadingState }
}
