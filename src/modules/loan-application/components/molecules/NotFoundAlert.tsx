import { Alert, AlertDescription } from "@/components/ui/alert"

export const NotFoundAlert = ({ children }: React.PropsWithChildren) => {
  return (
    <Alert className="bg-gray-100">
      <AlertDescription className="text-text-tertiary">
        {children}
      </AlertDescription>
    </Alert>
  )
}
