import { type Meta, type StoryObj } from "@storybook/react"
import { BgGradient } from "./bg-gradient"

const meta = {
  title: "Shared/Atoms/Background Gradient",
  component: BgGradient,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof BgGradient>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
