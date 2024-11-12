import { Button } from "@/components/ui/button"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { APP_PATH } from "@/constants"
import { MessageCircleMore } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ViewUserChatAction({ userId }: { userId: string }) {
  const navigate = useNavigate()

  const navigateToDetailPage = () => {
    navigate(APP_PATH.CHAT.sessionHistory(userId))
  }

  return (
    <DropdownMenuLabel>
      <Button
        className="flex w-full flex-row space-x-2 p-2 text-blue-900"
        id={userId}
        style={{
          padding: "0px"
        }}
        type="submit"
        variant="ghost"
        onClick={navigateToDetailPage}
      >
        <MessageCircleMore className="size-5" />
        <span>View chat</span>
      </Button>
    </DropdownMenuLabel>
  )
}
