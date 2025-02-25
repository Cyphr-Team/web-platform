import type { Meta, StoryObj } from "@storybook/react"

import { DashboardStatsRate } from "./DashboardStatsRate"

const meta = {
  component: DashboardStatsRate,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    percentRate: {
      control: {
        type: "number"
      }
    },
    revert: {
      control: {
        type: "boolean"
      }
    }
  }
} satisfies Meta<typeof DashboardStatsRate>

export default meta

type Story = StoryObj<typeof meta>

export const PositiveNumber: Story = {
  args: {
    percentRate: 10
  }
}

export const NegativeNumber: Story = {
  args: {
    percentRate: -10,
    revert: false
  }
}

export const ReverseTheIconDirection: Story = {
  args: {
    percentRate: -10,
    revert: true
  }
}
