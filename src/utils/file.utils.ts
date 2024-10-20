import DOMPurify from "dompurify"

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

/**
 * Converts an array of JSON objects to a CSV string.
 * @param jsonArray - The array of JSON objects.
 * @param headers - The headers to include in the CSV.
 * @returns The CSV string.
 */
export const convertJsonArrayToCsv = <T>(
  jsonArray: T[],
  headers: (keyof T)[]
): string => {
  try {
    const csvRows = []

    // Get headers
    csvRows.push(headers.join(","))

    // Loop through rows
    for (const row of jsonArray) {
      // Wrap values in quotes for data that contains commas
      const values = headers.map((header) =>
        row[header] ? `"${row[header]}"` : ""
      )

      csvRows.push(values.join(","))
    }

    return csvRows.join("\n")
  } catch (error) {
    // console.error("Error converting JSON to CSV:", error)

    return ""
  }
}

export const sanitizeDOM = (elem?: string) => {
  try {
    return DOMPurify.sanitize(elem ?? "")
  } catch {
    return ""
  }
}
