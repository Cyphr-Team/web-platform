const processOptions = [
  "Loan Program",
  "Troubleshooting",
  "About us",
  "Start Chat"
]

const troubleshootOptionsMap: { [key: string]: string } = {
  "Bank Connections": "https://plaid.com/docs/",
  "E-Sign": "https://developers.pandadoc.com/docs/getting-started",
  "Know Your Customer": "https://docs.withpersona.com/docs/getting-started",
  "Know Your Business": "https://docs.middesk.com/docs/getting-started"
}

const processOptionsMap: { [key: string]: string } = {
  "Loan Program": "loanProgram",
  Troubleshooting: "showTroubleshootOptions",
  "About us": "aboutUs",
  "Start Chat": "chatInit"
}

export { processOptionsMap, processOptions, troubleshootOptionsMap }
