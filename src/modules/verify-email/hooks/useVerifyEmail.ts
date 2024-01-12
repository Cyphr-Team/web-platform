import { APP_PATH } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"

const MAX_CODE_LENGTH = 4

const formSchema = z.object({
  codes: z.array(z.string().min(1, "Code is required"))
})

type UserFormValue = z.infer<typeof formSchema>

export const useVerifyEmail = () => {
  const navigate = useNavigate()
  const { email } = useParams()

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(MAX_CODE_LENGTH).fill(null)
  )

  const [loading, setLoading] = useState(false)

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codes: Array(MAX_CODE_LENGTH).fill("")
    }
  })

  const onSubmit = useCallback(
    async (data: UserFormValue) => {
      try {
        if (!email) {
          throw "Email is not valid"
        }
        console.log(data)
        navigate(APP_PATH.SETUP_PROFILE_BY_TOKEN.detail(email))
      } catch {
        setLoading(false)
      }
    },
    [email, navigate]
  )

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
      if (isNaN(value)) return

      changeAndValidate(index, e.key)

      // Only process next focus if the value is not empty
      if (!value) return
      moveForwardOneInput(index)
    },
    [form, moveBackOneInput, moveForwardOneInput, changeAndValidate]
  )

  const handlePasteCode = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      try {
        e.preventDefault()

        const paste = e.clipboardData.getData("text")

        const codes = paste.split("").map((codeChar) => {
          const codeNumber = Number(codeChar)
          if (isNaN(codeNumber)) throw "Invalid code when pasting"
          return codeChar
        })

        codes.slice(0, MAX_CODE_LENGTH).forEach((code, index) => {
          changeAndValidate(index, code)
        })
      } catch (e) {
        console.error(e)
      }
    },
    [form, changeAndValidate]
  )
  return {
    form,
    loading,
    inputRefs,
    handleInputCode,
    handlePasteCode,
    onSubmit
  }
}
