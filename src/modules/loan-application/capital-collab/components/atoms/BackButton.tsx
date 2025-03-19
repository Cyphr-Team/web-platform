import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export function BackButton() {
  const { id, loanProgramId } = useParams()
  const redirectPath = checkIsWorkspaceAdmin()
    ? APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(id!)
    : APP_PATH.LOAN_APPLICATION.APPLICATIONS.documents.details(
        loanProgramId!,
        id!
      )

  return (
    <Button asChild className="text-dark p-0" type="button" variant="link">
      <Link to={redirectPath}>
        <ArrowLeft className="h-4.5 w-5" /> Back
      </Link>
    </Button>
  )
}
