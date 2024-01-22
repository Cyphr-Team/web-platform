import { Button } from "@/components/ui/button"
import { TEXTS } from "../../constants"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"

export const Component = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center max-w-screen-md">
        <h1 className="text-3xl font-bold text-center">{TEXTS.title}</h1>
        <p className="text-gray-500 mb-3xl whitespace-pre-line">
          {TEXTS.supportingText}
        </p>
        <Button onClick={() => navigate(APP_PATH.LOAN_APPLICATION.INFORMATION)}>
          {TEXTS.buttonText}
        </Button>
      </div>
    </div>
  )
}
