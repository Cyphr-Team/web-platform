import { Button } from "@/components/ui/button"
import { TEXTS } from "../../constants"

export const LoanIntroduction = () => {
  return (
    <div className="flex flex-col items-center max-w-screen-md">
      <h1 className="text-3xl font-bold text-center">{TEXTS.title}</h1>
      <p className="text-gray-500 mb-3xl whitespace-pre-line">
        {TEXTS.supportingText}
      </p>
      <Button>{TEXTS.buttonText}</Button>
    </div>
  )
}
