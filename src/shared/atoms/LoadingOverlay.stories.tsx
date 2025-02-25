import type { Meta, StoryObj } from "@storybook/react"

import { LoadingOverlay as Component } from "./LoadingOverlay"

const meta = {
  component: Component,
  title: "Shared/Atoms",
  render: (props) => (
    <Component
      {...props}
      className="flex h-full flex-1 flex-col overflow-auto py-6 pt-10"
    >
      <div className="h-96 grid place-items-center w-full text-center">
        <p>Our content</p>
      </div>
    </Component>
  )
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const LoadingOverlay: Story = {
  args: {
    isLoading: true
  }
}
