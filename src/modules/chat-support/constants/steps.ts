import { Block, Params } from "react-chatbotify"

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
  LOOP: "chatLoop",
  END: "chatEnd"
}

export class FlowBuilder {
  private flow: { [key: string]: Block } = {}

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

  public chatbotInit(message: () => Promise<string>, path: string) {
    this.flow[CHAT_STEPS.INIT] = {
      message,
      path
    }
    return this
  }

  public chatbotLoop(
    message: (params: Params) => Promise<string>,
    path: string,
    options: (params: Params) => Promise<string[]>
  ) {
    this.flow[CHAT_STEPS.LOOP] = {
      message,
      path,
      options
    }
    return this
  }

  public build() {
    return this.flow
  }
}

export { OVERALL_STEPS, PROCESS_STEPS, TROUBLESHOOT_STEPS, CHAT_STEPS }
