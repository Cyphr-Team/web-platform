import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { Download } from "lucide-react"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface StartApplicationButtonProps {
  loanProgramId?: string
  btnText?: string
  className?: string
}

export function StartApplicationButton(props: StartApplicationButtonProps) {
  const { className } = props
  const navigate = useNavigate()

  const onSubmit = useCallback(() => {
    navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment, {
      state: {
        loanProgramId: props.loanProgramId
      }
    })
  }, [navigate, props.loanProgramId])

  return (
    <Button className={className} onClick={onSubmit}>
      <Download className="mr-1 w-4" />
      <span className="font-medium">Start new application</span>
    </Button>
  )
}
