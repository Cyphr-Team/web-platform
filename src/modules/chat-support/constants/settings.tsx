import { Button, type Settings } from "react-chatbotify"
import smile from "@/assets/smile.svg"
import { CHAT_HISTORY } from "@/modules/chat-support/constants/chat"

export const getSettings = (icon: string): Settings => ({
  general: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', " +
      "'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
      "sans-serif",
    showHeader: true,
    showFooter: true,
    showInputRow: true,
    embedded: false,
    desktopEnabled: true,
    mobileEnabled: true,
    flowStartTrigger: "ON_CHATBOT_INTERACT",
    primaryColor: "#071013",
    secondaryColor: "#EAECF0"
  },
  tooltip: {
    mode: "CLOSE",
    text: "Talk to me! 😊"
  },
  chatButton: {
    icon: icon
  },
  header: {
    title: (
      <div
        style={{
          cursor: "pointer",
          margin: 0,
          fontSize: 20,
          fontWeight: "bold"
        }}
      >
        Lenda
      </div>
    ),
    showAvatar: true,
    avatar: icon,
    buttons: [Button.CLOSE_CHAT_BUTTON]
  },
  chatHistory: {
    disabled: false,
    maxEntries: 30,
    storageKey: CHAT_HISTORY,
    viewChatHistoryButtonText: "Load Chat History ⟳",
    chatHistoryLineBreakText: "----- Previous Chat History -----",
    autoLoad: false
  },
  chatInput: {
    disabled: false,
    allowNewline: true,
    enabledPlaceholderText: "Type your message...",
    disabledPlaceholderText: "",
    showCharacterCount: false,
    characterLimit: -1,
    botDelay: 1000,
    blockSpam: true,
    sendOptionOutput: true,
    sendCheckboxOutput: true,
    buttons: [Button.VOICE_MESSAGE_BUTTON, Button.SEND_MESSAGE_BUTTON]
  },
  chatWindow: {
    showScrollbar: false,
    autoJumpToBottom: false,
    showMessagePrompt: true,
    messagePromptText: "New Messages ↓",
    messagePromptOffset: 30,
    defaultOpen: false
  },
  sensitiveInput: {
    maskInTextArea: true,
    maskInUserBubble: true,
    asterisksCount: 10,
    hideInUserBubble: false
  },
  userBubble: {
    animate: true,
    showAvatar: false,
    simStream: false,
    streamSpeed: 30,
    dangerouslySetInnerHtml: false
  },
  botBubble: {
    animate: true,
    showAvatar: false,
    simStream: true,
    streamSpeed: 30,
    dangerouslySetInnerHtml: true
  },
  footer: {
    text: (
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: 3
        }}
        onClick={() => window.open("https://www.cyphrai.com/")}
      >
        <span key={0}>Powered By </span>
        <span key={1} style={{ fontWeight: "bold" }}>
          {" "}
          Cyphr
        </span>
      </div>
    ),
    buttons: [Button.EMOJI_PICKER_BUTTON]
  },
  emoji: {
    disabled: false,
    icon: smile,
    list: [
      "😀",
      "😃",
      "😄",
      "😅",
      "😊",
      "😌",
      "😇",
      "🙃",
      "🤣",
      "😍",
      "🥰",
      "🥳",
      "🎉",
      "🎈",
      "🚀",
      "⭐️"
    ]
  },
  toast: {
    maxCount: 3,
    forbidOnMax: false,
    dismissOnClick: true
  },
  event: {
    rcbPreInjectMessage: false,
    rcbPostInjectMessage: false,
    rcbStartStreamMessage: false,
    rcbChunkStreamMessage: false,
    rcbStopStreamMessage: false,
    rcbRemoveMessage: false,
    rcbLoadChatHistory: false,
    rcbToggleChatWindow: false,
    rcbToggleAudio: false,
    rcbToggleNotifications: false,
    rcbToggleVoice: false,
    rcbChangePath: false,
    rcbShowToast: false,
    rcbDismissToast: false,
    rcbUserSubmitText: false,
    rcbUserUploadFile: false
  }
})
