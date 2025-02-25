import type { Meta, StoryObj } from "@storybook/react"

import { ButtonContactForMoreUsage } from "./ButtonContactForMoreUsage"

const meta = {
  component: ButtonContactForMoreUsage,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof ButtonContactForMoreUsage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: "Get more apps"
  }
}
