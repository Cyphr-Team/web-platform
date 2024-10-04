import { Styles } from "react-chatbotify"

const PRIMARY_COLOR = "#071013"
const SECONDARY_COLOR = "#EAECF0"

const styles: Styles = {
  chatButtonStyle: {
    scale: "0.7",
    right: 10,
    backgroundImage: "white"
  },
  tooltipStyle: {
    fontSize: "14px",
    right: 90,
    boxShadow: `0px 0px 5px #FFFFFF`,
    backgroundColor: SECONDARY_COLOR
  },
  bodyStyle: {
    backgroundColor: "white"
  },
  userBubbleStyle: {
    backgroundColor: PRIMARY_COLOR,
    color: "white"
  },
  botBubbleStyle: {
    backgroundColor: SECONDARY_COLOR
  },
  headerStyle: {
    background: PRIMARY_COLOR,
    backgroundImage: "white"
  },
  sendButtonStyle: {
    backgroundColor: PRIMARY_COLOR
  },
  chatInputContainerStyle: {
    backgroundColor: SECONDARY_COLOR
  },
  chatInputAreaFocusedStyle: {
    boxShadow: `0px 0px 5px ${PRIMARY_COLOR}`
  },
  chatHistoryButtonHoveredStyle: {
    color: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR
  },
  chatMessagePromptHoveredStyle: {
    color: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR
  }
}

export { styles }
