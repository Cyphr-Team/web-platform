import { Button } from "@/components/ui/button"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { MessageCircleMore } from "lucide-react"

export const ViewUserChatAction = ({ userId }: { userId: string }) => {
  return (
    <DropdownMenuLabel>
      <Button
        type="submit"
        variant="ghost"
        id={userId}
        style={{
          padding: "0px"
        }}
        className="text-blue-900 p-2 space-x-2 flex flex-row w-full"
        onClick={() => {
          // TODO: Navigate to User Detail Chat Page
        }}
      >
        <MessageCircleMore className="w-5 h-5" />
        <span>View chat</span>
      </Button>
    </DropdownMenuLabel>
  )
}
