import { Button } from "@/components/ui/button"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { APP_PATH } from "@/constants"
import { type ChatbotSessionResponse } from "@/types/chatbot.type"
import { EyeIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ViewUserChatHistoryAction(data: ChatbotSessionResponse) {
  const navigate = useNavigate()

  const navigateToDetailPage = () => {
    navigate(APP_PATH.CHAT.conversations(data.session.id), {
      state: data
    })
  }

  return (
    <DropdownMenuLabel>
      <Button
        className="flex w-full flex-row space-x-2 p-2"
        id={data.session.id}
        type="submit"
        variant="ghost"
        onClick={navigateToDetailPage}
      >
        <EyeIcon className="size-5" />
      </Button>
    </DropdownMenuLabel>
  )
}
