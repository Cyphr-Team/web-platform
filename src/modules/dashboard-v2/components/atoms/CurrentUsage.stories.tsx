import type { Meta, StoryObj } from "@storybook/react"

import { CurrentUsage } from "./CurrentUsage"

const meta = {
  component: CurrentUsage,
  tags: ["autodocs", "wrong-position", "dashboard-v2", "organisms"]
} satisfies Meta<typeof CurrentUsage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const MinimalStyle: Story = {
  args: {
    minimal: true
  }
}
