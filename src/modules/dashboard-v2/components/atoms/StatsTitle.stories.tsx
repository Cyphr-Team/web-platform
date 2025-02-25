import type { Meta, StoryObj } from "@storybook/react"

import { StatsTitle } from "./StatsTitle"

const meta = {
  component: StatsTitle
} satisfies Meta<typeof StatsTitle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "This is the Stats title"
  }
}
