import type { Meta, StoryObj } from "@storybook/react"

import { RequiredSymbol as Component } from "./RequiredSymbol"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Shared/Atoms",
  component: Component,
  render: () => (
    <Label>
      Text with a required symbol
      <Component />
    </Label>
  ),
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const RequiredSymbol: Story = {
  args: {}
}
