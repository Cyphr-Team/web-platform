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
  sendButtonHoveredStyle: {
    backgroundColor: PRIMARY_COLOR
  },
  chatInputContainerStyle: {
    backgroundColor: SECONDARY_COLOR
  },
  chatInputAreaStyle: {
    fontSize: "14px"
  },
  chatInputAreaFocusedStyle: {
    boxShadow: `0px 0px 5px ${PRIMARY_COLOR}`
  },
  chatHistoryButtonHoveredStyle: {
    borderColor: PRIMARY_COLOR
  },
  botOptionStyle: {
    borderColor: PRIMARY_COLOR
  },
  botOptionHoveredStyle: {
    borderColor: PRIMARY_COLOR
  },
  botCheckboxRowStyle: {
    height: "100%"
  }
}

export { styles }
