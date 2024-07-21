import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

interface Props {
  btnText?: string
  className?: string
}

export const LoanProgramDetailApply: React.FC<Props> = ({
  btnText = "Start Application",
  className
}) => {
  const navigate = useNavigate()
  const { loanProgramId } = useParams()

  const onSubmit = () => {
    navigate(APP_PATH.LOAN_APPLICATION.INFORMATION.detailWithId(loanProgramId!))
  }

  return (
    <Button onClick={onSubmit} className={className}>
      {btnText} <ArrowRight className="ml-1 w-4" />
    </Button>
  )
}
