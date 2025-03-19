import { type ChartConfig } from "@/components/ui/chart"

const loanApplicationActivity = {
  draft: {
    label: "Draft",
    color: "rgba(102, 112, 133, 0.5)"
  },
  submitted: {
    label: "Submitted",
    color: "rgba(44, 138, 240, 0.5)"
  },
  inreview: {
    label: "In-Review",
    color: "rgba(237, 138, 9, 0.5)"
  },
  approved: {
    label: "Approved",
    color: "rgba(231, 65, 54, 0.5)"
  },
  denied: {
    label: "Denied",
    color: "rgba(17, 176, 102, 0.5)"
  }
} satisfies ChartConfig

const CHART_CONFIGS = {
  loanApplicationActivity
}

export default CHART_CONFIGS
