import {
  processOptions,
  processOptionsMap,
  troubleshootOptionsMap
} from "@/modules/chat-support/constants/map"
import { Params } from "react-chatbotify"

const OVERALL_STEPS = {
  START: "start",
  LOAN_PROGRAM: "loanProgram",
  ABOUT_US: "aboutUs",
  REPEAT: "repeat",
  UNKNOWN_INPUT: "unknownInput",
  PROMPT_AGAIN: "promptAgain"
}

const PROCESS_STEPS = {
  OPTIONS: "processOptions",
  MESSAGE: "showProcessOptions"
}

const TROUBLESHOOT_STEPS = {
  OPTIONS: "troubleshootOptions",
  MESSAGE: "showTroubleshootOptions"
}

const CHAT_STEPS = {
  INIT: "chatInit",
  LOOP: "chatLoop",
  END: "chatEnd"
}

export const flow = (institutionName: string) => ({
  // OVERALL STEPS
  [OVERALL_STEPS.START]: {
    message: `Hello, I am Lenda 👋! Welcome to ${institutionName}, I'm excited that you are using our chatbot 😊!`,
    transition: { duration: 1000 },
    path: PROCESS_STEPS.MESSAGE
  },
  [OVERALL_STEPS.LOAN_PROGRAM]: {
    message: `This is the Loan Program from ${institutionName}`,
    transition: { duration: 1000 },
    path: OVERALL_STEPS.REPEAT
  },
  [OVERALL_STEPS.ABOUT_US]: {
    message: `We are from ${institutionName}`,
    transition: { duration: 1000 },
    path: OVERALL_STEPS.REPEAT
  },
  [OVERALL_STEPS.PROMPT_AGAIN]: {
    message: "Do you need any other help?",
    options: processOptions,
    path: PROCESS_STEPS.OPTIONS
  },
  [OVERALL_STEPS.REPEAT]: {
    transition: { duration: 1000 },
    path: OVERALL_STEPS.PROMPT_AGAIN
  },
  [OVERALL_STEPS.UNKNOWN_INPUT]: {
    message:
      "Sorry, I do not understand your message 😢! If you require further assistance, you may need to contact support@cyphrai.com.",
    options: processOptions,
    path: PROCESS_STEPS.OPTIONS
  },

  // PROCESS STEPS
  [PROCESS_STEPS.MESSAGE]: {
    message:
      "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
      "things you can check out to get started:",
    options: processOptions,
    path: PROCESS_STEPS.OPTIONS
  },
  [PROCESS_STEPS.OPTIONS]: {
    transition: { duration: 100 },
    path: async (params: Params) =>
      processOptionsMap[params.userInput] || CHAT_STEPS.INIT
  },

  // TROUBLESHOOT STEPS
  [TROUBLESHOOT_STEPS.MESSAGE]: {
    message: "Here are a few things you can check out to get started:",
    options: Object.keys(troubleshootOptionsMap),
    path: TROUBLESHOOT_STEPS.OPTIONS
  },
  [TROUBLESHOOT_STEPS.OPTIONS]: {
    transition: { duration: 100 },
    chatDisabled: true,
    path: async (params: Params) => {
      const link = troubleshootOptionsMap[params.userInput] ?? null
      if (link === null) return OVERALL_STEPS.UNKNOWN_INPUT
      await params.injectMessage("Sit tight! I'll send you right there!")
      // Add time to wait for redirecting... This is added for the bot to be more UX-friendly.
      setTimeout(() => {
        window.open(link)
      }, 1000)
      return OVERALL_STEPS.REPEAT
    }
  },

  // CHAT STEPS
  [CHAT_STEPS.INIT]: {},
  [CHAT_STEPS.LOOP]: {},
  [CHAT_STEPS.END]: {}
})

export { OVERALL_STEPS, PROCESS_STEPS, TROUBLESHOOT_STEPS, CHAT_STEPS }
