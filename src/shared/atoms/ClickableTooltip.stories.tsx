import type { Meta, StoryObj } from "@storybook/react"

import { ClickableTooltip as Component } from "./ClickableTooltip"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Shared/Atoms/Clickable Tooltip",
  component: Component,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    tooltipContent: {
      control: {
        type: "text"
      }
    }
  }
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const ClickableTooltip: Story = {
  args: {
    tooltipContent: "Surprise!",
    children: <Button variant="outline">Hover me</Button>
  }
}
