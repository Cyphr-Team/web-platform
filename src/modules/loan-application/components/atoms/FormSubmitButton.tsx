import { Button } from "@/components/ui/button"

type FormSubmitButtonProps = {
  className?: string
  onSubmit: () => void
  isDisabled?: boolean
  text?: string
}
export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  className,
  onSubmit,
  isDisabled,
  text = "Next"
}) => {
  return (
    <Button className={className} disabled={isDisabled} onClick={onSubmit}>
      {text}
    </Button>
  )
}
