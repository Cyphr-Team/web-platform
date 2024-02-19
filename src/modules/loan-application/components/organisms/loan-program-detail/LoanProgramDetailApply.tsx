import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const LoanProgramDetailApply = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(APP_PATH.LOAN_APPLICATION.INDEX)}>
      Start Application <ArrowRight className="ml-1 w-5" />
    </Button>
  )
}
