import { CHART_COLORS } from "../../constants/chart-styles"

export type GradientProps = React.HTMLAttributes<SVGElement>

export const Gradients = {
  yellow: ({ ...props }: GradientProps) => (
    <linearGradient id="yellow" x1="0" x2="0" y1="0" y2="1" {...props}>
      <stop offset="30%" stopColor={CHART_COLORS.yellow} stopOpacity={0.16} />
      <stop offset="100%" stopColor={CHART_COLORS.yellow} stopOpacity={0.05} />
    </linearGradient>
  ),
  green: ({ ...props }: GradientProps) => (
    <linearGradient id="green" x1="0" x2="0" y1="0" y2="1" {...props}>
      <stop offset="30%" stopColor={CHART_COLORS.green} stopOpacity={0.16} />
      <stop offset="100%" stopColor={CHART_COLORS.green} stopOpacity={0.05} />
    </linearGradient>
  ),
  red: ({ ...props }: GradientProps) => (
    <linearGradient id="red" x1="0" x2="0" y1="0" y2="1" {...props}>
      <stop offset="30%" stopColor={CHART_COLORS.red} stopOpacity={0.16} />
      <stop offset="100%" stopColor={CHART_COLORS.red} stopOpacity={0.05} />
    </linearGradient>
  ),
  limeGreen: ({ ...props }: GradientProps) => (
    <linearGradient id="lime-green" x1="0" x2="0" y1="0" y2="1" {...props}>
      <stop
        offset="30%"
        stopColor={CHART_COLORS["lime-green"]}
        stopOpacity={1}
      />
      <stop
        offset="100%"
        stopColor={CHART_COLORS["light-lime-green"]}
        stopOpacity={0.4}
      />
    </linearGradient>
  )
}
