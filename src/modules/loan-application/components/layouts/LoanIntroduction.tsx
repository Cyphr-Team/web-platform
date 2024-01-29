import { ButtonLoading } from "@/components/ui/button"
import { TEXTS } from "../../constants"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { useCreateLoanApplication } from "../../hooks/useCreateLoanApplication"
import { useLoanApplicationContext } from "../../providers"

export const Component = () => {
  const navigate = useNavigate()
  const { changeLoanApplicationId } = useLoanApplicationContext()
  const { mutate, isPending } = useCreateLoanApplication()

  const onSubmit = () => {
    mutate(undefined, {
      onSuccess(res) {
        changeLoanApplicationId(res.data.id)
        navigate(APP_PATH.LOAN_APPLICATION.INFORMATION)
      }
    })
  }
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center max-w-screen-md">
        <h1 className="text-3xl font-bold text-center">{TEXTS.title}</h1>
        <p className="text-gray-500 mb-3xl whitespace-pre-line">
          {TEXTS.supportingText}
        </p>
        <ButtonLoading onClick={onSubmit} isLoading={isPending}>
          {TEXTS.buttonText}
        </ButtonLoading>
      </div>
    </div>
  )
}
