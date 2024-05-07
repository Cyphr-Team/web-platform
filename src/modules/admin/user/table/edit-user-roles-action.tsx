import { useQueryGetUser } from "@/modules/admin/user/hooks/useQuery/useQueryGetUser.ts"
import { UserRoles } from "@/types/user.type.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx"
import { Button } from "@/components/ui/button.tsx"
import { ChevronDown } from "lucide-react"
import { ModifyUserPermission } from "@/modules/admin/user/components/ModifyUserPermission.tsx"
import { useState } from "react"

export const EditUserRolesAction = ({ userId }: { userId: string }) => {
  const [isUserEditFormOpen, setIsUserEditFormOpen] = useState(false)
  const { data } = useQueryGetUser({ id: userId })
  const isLoanApplicant = data?.roles.includes(
    UserRoles.LOAN_APPLICANT.toLowerCase() as UserRoles
  )
  const isForesightAdmin = data?.roles.includes(
    UserRoles.FORESIGHT_ADMIN.toLowerCase() as UserRoles
  )

  const handleUserEditForm = () => {
    setIsUserEditFormOpen(!isUserEditFormOpen)
  }

  return (
    <DropdownMenu open={isUserEditFormOpen} onOpenChange={handleUserEditForm}>
      <DropdownMenuTrigger asChild>
        {!isLoanApplicant && !isForesightAdmin && (
          <Button
            variant="ghost"
            className="p-1 text-primary"
            id={userId}
            size="lg"
            style={{
              padding: "0px"
            }}
          >
            <ChevronDown />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuLabel asChild>
            <ModifyUserPermission
              userId={userId}
              setIsUserEditFormOpen={setIsUserEditFormOpen}
            />
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
