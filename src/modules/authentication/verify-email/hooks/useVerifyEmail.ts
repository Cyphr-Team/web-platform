import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { VerifyEmailFormSchema, verifyEmailFormSchema } from "../constants"

const MAX_CODE_LENGTH = 4

export const useVerifyEmail = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(MAX_CODE_LENGTH).fill(null)
  )

  const form = useForm<VerifyEmailFormSchema>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      codes: Array(MAX_CODE_LENGTH).fill("")
    }
  })

  const moveBackOneInput = useCallback((index: number) => {
    if (index - 1 >= 0) inputRefs.current[index - 1]?.focus()
  }, [])

  const moveForwardOneInput = useCallback((index: number) => {
    if (index + 1 < MAX_CODE_LENGTH) inputRefs.current[index + 1]?.focus()
  }, [])

  const changeAndValidate = useCallback(
    (index: number, value: string) => {
      form.setValue(`codes.${index}`, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    },
    [form]
  )

  const handleInputCode = useCallback(
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        const isEmpty = !form.getValues(`codes.${index}`)

        changeAndValidate(index, "")

        // Only move back when the input is empty and user hit backspace
        if (isEmpty) moveBackOneInput(index)
      }

      if (e.key === "ArrowLeft") moveBackOneInput(index)
      if (e.key === "ArrowRight") moveForwardOneInput(index)

      const value = Number(e.key)
      if (isNaN(value) || e.key === " ") return

      changeAndValidate(index, e.key)

      // Only process next focus if the value is not empty
      if (value !== 0 && !value) return
      moveForwardOneInput(index)
    },
    [form, moveBackOneInput, moveForwardOneInput, changeAndValidate]
  )

  const handlePasteCode = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      try {
        e.preventDefault()

        const paste = e.clipboardData.getData("text")

        const codes = paste.split("").filter((codeChar) => {
          const codeNumber = Number(codeChar)
          return !(isNaN(codeNumber) || codeChar === "\n" || codeChar === " ")
        })

        codes.slice(0, MAX_CODE_LENGTH).forEach((code, index) => {
          changeAndValidate(index, code)
        })
      } catch (e) {
        console.error(e)
      }
    },
    [changeAndValidate]
  )
  return {
    form,
    inputRefs,
    handleInputCode,
    handlePasteCode
  }
}
