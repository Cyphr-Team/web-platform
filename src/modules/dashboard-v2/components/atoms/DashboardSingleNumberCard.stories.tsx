import type { Meta, StoryObj } from "@storybook/react"

import { DashboardSingleNumberCard } from "./DashboardSingleNumberCard"
import { Paperclip } from "lucide-react"

const meta = {
  component: DashboardSingleNumberCard,
  tags: ["autodocs", "wrong-position", "dashboard-v2"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: "centered"
  },
  args: {
    title: "Approved",
    value: "10",
    isLoading: false
  }
} satisfies Meta<typeof DashboardSingleNumberCard>

export default meta

type Story = StoryObj<typeof meta>

export const Approved: Story = {
  args: {
    variantColor: "green"
  }
}

export const LoadingState: Story = {
  args: {
    isLoading: true,
    variantColor: "green"
  }
}

export const WithIcon: Story = {
  args: {
    title: "Submitted",
    value: "10",
    isLoading: false,
    variantColor: "green",
    icon: <Paperclip size={24} />
  }
}

export const WithUnit: Story = {
  args: {
    title: "Approved",
    value: "10",
    isLoading: false,
    variantColor: "green",
    unit: "Apps"
  }
}

export const DifferentBadgeVariant: Story = {
  args: {
    title: "Denied",
    value: "10",
    isLoading: false,
    variantColor: "red",
    unit: "Apps"
  }
}

export const ModifyBadgeProps: Story = {
  args: {
    title: "Approved",
    value: "10",
    isLoading: false,
    variantColor: "green",

    badgeProps: {
      isDot: false
    }
  }
}
