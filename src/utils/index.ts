import { getRequest } from "@/services/client.service"
import { ImageDataResponse } from "@/types/common.type"
import { format, intlFormatDistance } from "date-fns"
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber"
import { ReactNode } from "react"
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

export function checkValidEmail(email: string) {
  const emailRegex = new RegExp(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  )
  return emailRegex.test(email)
}

/**
 * Reference: [sonner](https://ui.shadcn.com/docs/components/sonner)
 */
export const toastSuccess = ({
  title,
  description
}: {
  title: string
  description: ReactNode
}) => {
  toast.success(title, {
    description,
    style: {
      alignItems: "start"
    }
  })
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

export const capitalizeWords = (string: string) =>
  string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export const joinString = (
  separator?: string,
  ...args: (string | null | undefined)[]
) => {
  return args.filter(Boolean).join(separator ?? ", ")
}

export const toCurrency = (value?: number, maximumFractionDigits = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits
  }).format(value ?? 0)
}

export const toPercent = (data?: number) => {
  return Math.round((data ?? 0) * 100)
}

export const textToCamelCaseFieldPattern = (str: string) => {
  // e.g. "Loan Program" -> "loanProgram"
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}

export const convertToCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
}

export const capitalizeFirstOnly = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const snakeCaseToText = (str: string) => {
  return str.replace(/_/g, " ")
}
export const snakeCaseToUrlPattern = (str: string) => {
  return str.replace(/_/g, "-")
}

export const camelCaseToText = (str: string) => {
  try {
    return str
      .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
      .toLowerCase() // Convert to lowercase
      .trim()
  } catch {
    return str
  }
}

export async function fetchProtectedImage(path: string, imageUrl: string) {
  // Fetch the image.
  const response = await getRequest<
    { [key: string]: string },
    ImageDataResponse
  >({
    path: `${path}?image_url=${imageUrl}`
  })

  const blob = response.fileData

  // TODO: create object url from blob
  // Dont know why this doesn't work
  // const n = new Blob([blob], { type: "image/jpeg" })
  // const objectUrl = URL.createObjectURL(n)

  return blob
}

export const convertToReadableDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

export const convertToReadableDateAgo = (date: string) => {
  if (!date) {
    return "N/A"
  }
  // Add a 1-second padding to avoid "now" text message
  return intlFormatDistance(new Date(date), Date.now() + 1000)
}

/**
 * Used to replace a new string to current string
 *
 * @param currentString e.g MM/DD/YYYY
 * @param start e.g 3
 * @param newString e.g 00
 *
 * @returns e.g MM/00/YYYY
 */
export function replaceString(
  currentString: string,
  start: number,
  newString: string
) {
  const before = currentString.substring(0, start)
  const after = currentString.substring(start + newString.length)

  return before + newString + after
}

/**
 *
 * @param filenameWithExtension e.g. bank statement.pdf, statement_example, w-2.borrower.sample, w-2.xml
 * @returns e.g. bank statement, statement_example, w-2.borrower, w-2
 */
export function extractFilename(filenameWithExtension?: string) {
  try {
    const lastDotIndex = filenameWithExtension?.lastIndexOf(".")

    if (lastDotIndex === undefined || lastDotIndex === -1)
      return filenameWithExtension

    return filenameWithExtension?.substring(0, lastDotIndex)
  } catch {
    return filenameWithExtension
  }
}

export function downloadPDFFile(data: string, filename: string) {
  if (!data) return
  const blob = new Blob([data], {
    type: "application/pdf"
  })
  downloadFile(
    blob,
    `${extractFilename(filename)}_${format(new Date(), "MM-dd-yyyy_HH-mm")}.pdf`
  )
}

export function downloadCSVFile(data: string, filename: string) {
  if (!data) return
  const universalBOM = "\uFEFF"
  const blob = new Blob([universalBOM + data], {
    type: "text/csv;charset=utf-8;"
  })
  downloadFile(blob, filename)
}

export function downloadJsonFile(data: string, filename: string) {
  if (!data) return
  const blob = new Blob([JSON.stringify(data)], {
    type: "text/json;charset=utf-8;"
  })
  downloadFile(blob, filename)
}

export function downloadFile(blob: Blob, filename: string) {
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function roundToOneDecimalPlace(number: number) {
  return Math.round(number * 10) / 10
}

export function removeWhitespace(str: string) {
  return str.replace(/\s/g, "")
}

export const sanitizeNumber = (number?: number | null) => {
  return Number(number) || 0
}

export const formatDate = (dateString: string, separator: string) => {
  if (!dateString) return "."
  const date = new Date(dateString)
  return date.toISOString().split(separator)[0]
}

export const convertDateTimeToLocal = (
  dateString: string,
  separator: string,
  connector: string
) => {
  try {
    const date = new Date(dateString)

    const options = {
      month: "2-digit" as const,
      day: "2-digit" as const,
      year: "numeric" as const,
      hour: "numeric" as const,
      minute: "2-digit" as const
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)

    const [datePart, timePart] = formattedDate.split(`${separator}`)

    return `${datePart} ${connector} ${timePart}`
  } catch (error) {
    console.error("Error converting date:", error)
    return "---"
  }
}

export const formatBoundaryValues = (data?: string[]): string => {
  if (!data || data.length === 0) {
    return "-"
  }
  if (data.length === 1) {
    return data[0]
  }
  return `${data[0]}-${data[data.length - 1]}`
}

export const getAbbreviationForName = (name?: string) => {
  if (typeof name != "string") return name

  const nameArray = name.trim().split(" ")
  if (nameArray.length === 1) {
    return nameArray[0].charAt(0).toUpperCase()
  }

  const initials =
    nameArray[0].charAt(0).toUpperCase() +
    nameArray[nameArray.length - 1].charAt(0).toUpperCase()

  return initials
}

export function calculateTotalPayment(
  annualInterestRate: number,
  loanTermRemaining: number,
  outstandingLoanBalance: number
) {
  const monthlyInterestRate = Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1

  const monthlyPayment =
    (outstandingLoanBalance * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTermRemaining))

  if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
    return 0
  }

  return Number(monthlyPayment.toFixed(2))
}

export function parseAndValidateNumber(input: string, limit: number) {
  const sanitizedValue = parseFloat(input.replace(/[^0-9.]/g, "")) || 0

  if (isNaN(sanitizedValue) || sanitizedValue.toString().length > limit) {
    return null
  }

  return sanitizedValue
}

export function calculateAge(birthdateString?: string): string {
  if (birthdateString == null) {
    return "N/A"
  }
  const birthdate: Date = new Date(birthdateString)
  const today: Date = new Date()
  const birthYear: number = birthdate.getFullYear()
  const birthMonth: number = birthdate.getMonth()
  const birthDay: number = birthdate.getDate()

  const todayYear: number = today.getFullYear()
  const todayMonth: number = today.getMonth()
  const todayDay: number = today.getDate()

  let age: number = todayYear - birthYear

  // Check if the birthday for this year has passed
  if (
    todayMonth < birthMonth ||
    (todayMonth === birthMonth && todayDay < birthDay)
  ) {
    age--
  }

  return `(${age} years old)`
}
