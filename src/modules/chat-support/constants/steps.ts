const OVERALL_STEPS = {
  START: "start",
  LOAN_PROGRAM: "loanProgram",
  ABOUT_US: "aboutUs",
  REPEAT: "repeat",
  UNKNOWN_INPUT: "unknownInput",
  PROMPT_AGAIN: "promptAgain"
}

const CHAT_STEPS = {
  INIT: "start",
  THEME: "chatTheme",
  PROCESS_THEME: "processTheme",
  LOOP: "chatLoop",
  END: "chatEnd",
  RESTART: "restart"
}

export { OVERALL_STEPS, CHAT_STEPS }
