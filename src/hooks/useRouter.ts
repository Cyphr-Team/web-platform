import { useNavigate } from "react-router-dom"
import { useMemo } from "react"

export default function useRouter() {
  const navigate = useNavigate()

  return useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true })
    }),
    [navigate]
  )
}
