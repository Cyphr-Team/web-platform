import {
  CHAT_POST_INJECT_MESSAGE_EVENT,
  ChatMessageInfo,
  ChatSender
} from "@/modules/chat-support/constants/chat"
import { Button } from "@/components/ui/button"
import useBoolean from "@/hooks/useBoolean"
import { useEffect } from "react"
import { type Params } from "react-chatbotify"
import { CHAT_STEPS } from "@/modules/chat-support/constants/steps"

export function EndChatButton({ params }: { params: Params }) {
  const isVisible = useBoolean(true)

  // Disable the button when a new chat message is sent
  // This will prevent the user from clicking the button multiple times
  useEffect(() => {
    const handleDisableAction = () => {
      isVisible.onFalse()
    }

    window.addEventListener(CHAT_POST_INJECT_MESSAGE_EVENT, handleDisableAction)

    return () => {
      window.removeEventListener(
        CHAT_POST_INJECT_MESSAGE_EVENT,
        handleDisableAction
      )
    }
  }, [isVisible])

  if (!isVisible.value) return null

  const handleEndChat = async () => {
    params.goToPath(CHAT_STEPS.END)
    await params.injectMessage(ChatMessageInfo.END, ChatSender.USER)
    isVisible.onFalse()
  }

  return (
    <div className="rcb-view-history-container mt-2 flex w-full items-center justify-center">
      <Button
        className="rcb-view-history-button h-8 bg-white px-lg py-sm text-[12px] font-light text-[#ADADAD] hover:border-black hover:bg-white hover:text-black"
        onClick={handleEndChat}
      >
        End Chat
      </Button>
    </div>
  )
}
