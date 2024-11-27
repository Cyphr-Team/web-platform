import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowRight, FolderDown } from "lucide-react"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface StartApplicationButtonProps {
  loanProgramId?: string
  btnText?: string
  className?: string
  showArrow?: boolean
}

export function StartApplicationButton(props: StartApplicationButtonProps) {
  const {
    showArrow,
    className,
    loanProgramId,
    btnText = "Start new assessment"
  } = props
  const navigate = useNavigate()

  const onSubmit = useCallback(() => {
    navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment, {
      state: {
        loanProgramId: loanProgramId
      }
    })
  }, [navigate, loanProgramId])

  return (
    <Button className={className} onClick={onSubmit}>
      {!showArrow && <FolderDown className="mr-1 w-4" />}
      <span className="font-medium">{btnText}</span>
      {showArrow ? <ArrowRight className="ml-1 w-4" /> : null}
    </Button>
  )
}
