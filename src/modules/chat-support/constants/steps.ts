import {
  type ComponentFuncType,
  type MessageFuncType,
  type OptionsFuncType,
  type OptionsPromiseFuncType
} from "@/modules/chat-support/constants/type"
import { type Block } from "react-chatbotify"

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
  INIT: "start",
  THEME: "chatTheme",
  PROCESS_THEME: "processTheme",
  LOOP: "chatLoop",
  END: "chatEnd",
  RESTART: "restart"
}

export class FlowBuilder {
  private flow: Record<string, Block> = {}

  public start(message: string, path: string) {
    this.flow[OVERALL_STEPS.START] = {
      message,
      transition: { duration: 1000 },
      path
    }

    return this
  }

  public loanProgram(message: string, path: string) {
    this.flow[OVERALL_STEPS.LOAN_PROGRAM] = {
      message,
      transition: { duration: 1000 },
      path
    }

    return this
  }

  public aboutUs(message: string, path: string) {
    this.flow[OVERALL_STEPS.ABOUT_US] = {
      message,
      transition: { duration: 1000 },
      path
    }

    return this
  }

  public promptAgain(message: string, path: string) {
    this.flow[OVERALL_STEPS.PROMPT_AGAIN] = {
      message,
      path
    }

    return this
  }

  public repeat(path: string) {
    this.flow[OVERALL_STEPS.REPEAT] = {
      transition: { duration: 1000 },
      path
    }

    return this
  }

  public unknownInput(message: string, options: string[], path: string) {
    this.flow[OVERALL_STEPS.UNKNOWN_INPUT] = {
      message,
      options,
      path
    }

    return this
  }

  public chatbotInit(
    message: MessageFuncType,
    path: string,
    options: OptionsPromiseFuncType
  ) {
    this.flow[CHAT_STEPS.INIT] = {
      message,
      path,
      options
    }

    return this
  }

  public chatbotLoop(
    message: MessageFuncType,
    path: string,
    options: OptionsPromiseFuncType,
    component?: ComponentFuncType
  ) {
    this.flow[CHAT_STEPS.LOOP] = {
      message,
      path,
      options,
      component
    }

    return this
  }

  public chatbotEnd(message: MessageFuncType, path: string, options: string[]) {
    this.flow[CHAT_STEPS.END] = {
      message,
      path,
      options,
      chatDisabled: true
    }

    return this
  }

  public chatbotRestart(
    message: MessageFuncType,
    path: string,
    options: OptionsPromiseFuncType
  ) {
    this.flow[CHAT_STEPS.RESTART] = {
      message,
      path,
      options
    }

    return this
  }

  public chatbotSelectTheme(
    message: MessageFuncType,
    path: string,
    themes: string[],
    component?: ComponentFuncType
  ) {
    this.flow[CHAT_STEPS.THEME] = {
      message,
      path,
      options: themes,
      component
    }

    return this
  }

  public chatbotProcessTheme(
    message: MessageFuncType,
    path: string,
    questions: OptionsFuncType,
    component?: ComponentFuncType
  ) {
    this.flow[CHAT_STEPS.PROCESS_THEME] = {
      message,
      path,
      options: questions,
      component
    }

    return this
  }

  public build() {
    return this.flow
  }
}

export { OVERALL_STEPS, PROCESS_STEPS, TROUBLESHOOT_STEPS, CHAT_STEPS }
