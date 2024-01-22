import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber"
import { toast } from "sonner"

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

export const formatPhoneNumber = (phoneNumber: string) => {
  try {
    return (
      checkValidPhoneNumber(phoneNumber) &&
      PhoneNumberUtil.getInstance().format(
        PhoneNumberUtil.getInstance().parse(phoneNumber),
        PhoneNumberFormat.INTERNATIONAL
      )
    )
  } catch (error) {
    return false
  }
}

export function checkValidPhoneNumber(phone: string) {
  const phoneRegex = new RegExp(
    "^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$"
  )
  return phoneRegex.test(phone)
}

/**
 * Reference: [sonner](https://ui.shadcn.com/docs/components/sonner)
 */
export const toastSuccess = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  toast.success(title, { description })
}

export const toastError = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  toast.error(title, { description })
}
