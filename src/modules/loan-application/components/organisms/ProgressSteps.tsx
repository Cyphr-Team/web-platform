import { STEPS } from "../../constants"
import { useLoanApplicationContext } from "../../providers"
import { Steps } from "../molecules/Steps"

export const ProgressSteps = () => {
  const { progress } = useLoanApplicationContext()
  return (
    <div className="items-center flex flex-col">
      {progress.map((step, index) => (
        <Steps
          key={index}
          title={step.title}
          content={step.content}
          status={step.status}
          className={index === STEPS.length - 1 ? "last-step" : ""}
        />
      ))}
    </div>
  )
}
