export const detachFileType = (fileName: string) => {
  const lastDot = fileName.lastIndexOf(".")

  if (lastDot === -1) {
    return {
      fileName,
      fileType: ""
    }
  }

  return {
    fileName: fileName.substring(0, lastDot),
    fileType: fileName.substring(lastDot)
  }
}

export const convertFileSizeToMB = (fileSizeInBytes: number): string => {
  if (fileSizeInBytes === undefined) {
    return "0"
  }
  if (fileSizeInBytes === 0) {
    return "0"
  }
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
  return fileSizeInMB.toFixed(2)
}

export const getFileExtension = (fileName: string): string => {
  try {
    const splitFileName = fileName.split(".")
    if (splitFileName.length <= 1) return ""

    return splitFileName.pop()?.toLowerCase() ?? ""
  } catch {
    return ""
  }
}
