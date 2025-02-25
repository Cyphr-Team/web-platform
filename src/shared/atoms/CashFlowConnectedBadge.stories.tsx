import type { Meta, StoryObj } from "@storybook/react"

import { CashFlowConnectedBadge } from "./CashFlowConnectedBadge"

const meta = {
  component: CashFlowConnectedBadge,
  parameters: {
    layout: "centered"
  },
  title: "Shared/Molecules/Cash Flow Badge"
} satisfies Meta<typeof CashFlowConnectedBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Connected: Story = {}
