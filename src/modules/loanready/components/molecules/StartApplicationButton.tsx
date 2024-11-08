import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { Download } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"

interface StartApplicationButtonProps {
  btnText?: string
  className?: string
}

export function StartApplicationButton(props: StartApplicationButtonProps) {
  const { btnText = "Start new application", className } = props
  const navigate = useNavigate()

  const onSubmit = useCallback(() => {
    navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment)
  }, [])

  return (
    <Button className={className} onClick={onSubmit}>
      <Download className="mr-1 w-4" />
      <span className="font-medium">{btnText}</span>
    </Button>
  )
}
