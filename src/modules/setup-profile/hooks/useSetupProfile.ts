import { APP_PATH } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"

const MAX_CODE_LENGTH = 4

const formSchema = z.object({
  name: z.string().min(1, "Enter a valid name"),
  email: z.string(),
  password: z.string().min(8, "Must be at least 8 characters.")
})

type UserFormValue = z.infer<typeof formSchema>

export const useSetupProfile = () => {
  const { email } = useParams()
  const navigate = useNavigate()

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(MAX_CODE_LENGTH).fill(null)
  )

  const [loading, setLoading] = useState(false)

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email,
      password: ""
    }
  })

  const onSubmit = useCallback(
    async (data: UserFormValue) => {
      try {
        console.log(data)
        navigate(APP_PATH.LOGIN)
      } catch {
        setLoading(false)
      }
    },
    [navigate]
  )

  return {
    form,
    loading,
    inputRefs,
    onSubmit
  }
}
