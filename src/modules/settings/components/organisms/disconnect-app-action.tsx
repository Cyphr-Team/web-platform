import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx"
import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { MoreHorizontalIcon } from "lucide-react"
import { useDisconnectBank } from "@/modules/settings/hooks"

interface DisconnectAppActionProps {
  applicationId: string
}

const DisconnectAppAction = ({ applicationId }: DisconnectAppActionProps) => {
  const { mutate: disconnectBank, isPending } = useDisconnectBank()

  const handleDisconnectBank = () => {
    disconnectBank({
      applicationId
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="px-0">
        <ButtonLoading
          className="flex h-max w-full px-4 rounded-none justify-start font-normal hover:bg-[#DBDBDBBF]"
          isLoading={isPending}
          variant="ghost"
          onClick={handleDisconnectBank}
        >
          Disconnect app
        </ButtonLoading>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DisconnectAppAction
