import type { Meta, StoryObj } from "@storybook/react"

import { LoadingWrapper as Component } from "./LoadingWrapper"

const meta = {
  title: "Shared/Atoms",
  component: Component,
  decorators: [
    (Story) => (
      <div className=" flex flex-col gap-20">
        <h2>
          Loading wrapper changes the loading message from <em>Loading...</em>{" "}
          to <em>Calculating...</em> and ends with <em>Finishing...</em>
        </h2>
        <Story />
      </div>
    )
  ],
  render: (props) => (
    <Component {...props}>
      <p className="text-center">Our content</p>
    </Component>
  )
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const LoadingWrapper: Story = {
  args: {
    isLoading: true
  }
}
