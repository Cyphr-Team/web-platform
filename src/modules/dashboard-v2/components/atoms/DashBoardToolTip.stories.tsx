import type { Meta, StoryObj } from "@storybook/react"

import { DashBoardToolTip } from "./DashBoardToolTip"

const meta = {
  component: DashBoardToolTip,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof DashBoardToolTip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: "This is the content of the tooltip"
  }
}
