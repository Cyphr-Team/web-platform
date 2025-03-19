import { useEffect, useState } from "react"

const useMagic = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: any,
  autofillData: Record<string, string>,
  delay = 35
) => {
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set())

  useEffect(() => {
    const { setValue } = method

    const typeCharacterByCharacter = (
      fieldName: string,
      text: string,
      index: number,
      delay: number,
      callback?: () => void
    ) => {
      if (index <= text.length) {
        // Set the value with the substring up to the current index
        setValue(fieldName, text.substring(0, index))

        // Call the function again after the delay
        setTimeout(() => {
          typeCharacterByCharacter(fieldName, text, index + 1, delay, callback)
        }, delay)
      } else if (callback) {
        callback()
      }
    }

    const fieldNames = Object.keys(autofillData)
    const startAutofill = (i = 0) => {
      if (i < fieldNames.length) {
        const fieldName = fieldNames[i]

        // Check if the field has already been filled
        if (!filledFields.has(fieldName)) {
          // Autofill each field character by character
          typeCharacterByCharacter(
            fieldName,
            autofillData[fieldName],
            1,
            delay,
            () => {
              // Mark this field as filled
              setFilledFields((prev) => new Set(prev).add(fieldName))
              startAutofill(i + 1)
            }
          )
        }
      }
    }

    if (!Object.values(method.getValues()).at(0)) {
      startAutofill()
    }
  }, [method, autofillData, delay, filledFields])
}

export default useMagic
