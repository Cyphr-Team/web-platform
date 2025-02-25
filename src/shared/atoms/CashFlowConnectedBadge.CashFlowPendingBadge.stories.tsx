import type { Meta, StoryObj } from "@storybook/react"

import { CashFlowPendingBadge } from "./CashFlowConnectedBadge"

const meta = {
  component: CashFlowPendingBadge,
  parameters: {
    layout: "centered"
  },
  title: "Shared/Molecules/Cash Flow Badge"
} satisfies Meta<typeof CashFlowPendingBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Pending: Story = {}
