import { ButtonLoading } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { useCreateLoanApplication } from "@/modules/loan-application/hooks/useCreateLoanApplication"
import { useLoanApplicationContext } from "@/modules/loan-application/providers"
import { ArrowRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export const LoanProgramDetailApply = () => {
  const navigate = useNavigate()
  const { loanProgramId } = useParams()

  const { changeLoanApplicationId } = useLoanApplicationContext()
  const { mutate, isPending } = useCreateLoanApplication()

  const onSubmit = () => {
    mutate(undefined, {
      onSuccess(res) {
        changeLoanApplicationId(res.data.id)
        navigate(
          APP_PATH.LOAN_APPLICATION.INFORMATION.detailWithId(loanProgramId!)
        )
      }
    })
  }

  return (
    <ButtonLoading onClick={onSubmit} isLoading={isPending}>
      Start Application <ArrowRight className="ml-1 w-4" />
    </ButtonLoading>
  )
}
