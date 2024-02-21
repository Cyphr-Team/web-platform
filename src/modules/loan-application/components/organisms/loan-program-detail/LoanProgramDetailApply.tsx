import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export const LoanProgramDetailApply = () => {
  const navigate = useNavigate()
  const { loanProgramId } = useParams()

  const onSubmit = () => {
    navigate(APP_PATH.LOAN_APPLICATION.INFORMATION.detailWithId(loanProgramId!))
  }

  return (
    <Button onClick={onSubmit}>
      Start Application <ArrowRight className="ml-1 w-4" />
    </Button>
  )
}
