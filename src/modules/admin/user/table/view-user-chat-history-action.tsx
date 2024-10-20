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
        className="p-2 space-x-2 flex flex-row w-full"
        id={data.session.id}
        type="submit"
        variant="ghost"
        onClick={navigateToDetailPage}
      >
        <EyeIcon className="w-5 h-5" />
      </Button>
    </DropdownMenuLabel>
  )
}
