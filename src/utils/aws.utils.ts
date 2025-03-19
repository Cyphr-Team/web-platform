import isUrl from "is-url"
import { publicAssetDomain } from "@/lib/aws.ts"

export const getImageURL = (imagePath?: string): string => {
  try {
    if (!imagePath) return ""

    return !isUrl(imagePath) ? `${publicAssetDomain}/${imagePath}` : imagePath
  } catch {
    return imagePath ?? ""
  }
}
