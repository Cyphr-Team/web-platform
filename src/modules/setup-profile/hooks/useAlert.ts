import { useCallback, useState } from "react"

export const useAlert = () => {
  const [isVisible, setIsVisible] = useState(true)

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [])

  const show = useCallback(() => {
    setIsVisible(true)
  }, [])

  return { isVisible, setIsVisible, hide, show }
}
