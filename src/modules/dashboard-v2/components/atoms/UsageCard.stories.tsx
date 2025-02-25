import type { Meta, StoryObj } from "@storybook/react"

import { UsageCard } from "./UsageCard"
import { ButtonContactForMoreUsage } from "./ButtonContactForMoreUsage"
import { DashBoardToolTip } from "./DashBoardToolTip"

const meta = {
  tags: ["autodocs", "wrong-position", "dashboard-v2"],
  component: UsageCard,
  decorators: [
    (Story) => (
      <div className="w-96 p-4 bg-white">
        <Story />
      </div>
    )
  ],
  args: {
    currentUsage: 50,
    isLoading: false,
    alertThreshold: 90,
    warnThreshold: 70,
    limit: 100,
    title: "Applications used",
    cta: <ButtonContactForMoreUsage content="Get more apps" />,
    icon: <DashBoardToolTip content="Total applications used" />
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof UsageCard>

export default meta

type Story = StoryObj<typeof meta>

export const FullProps: Story = {
  args: {
    isNotFoundSubscription: false
  }
}

export const NotFoundSubscription: Story = {
  args: {
    isNotFoundSubscription: true
  }
}

export const ExceedWarningThreshold: Story = {
  args: {
    currentUsage: 80,
    isNotFoundSubscription: false
  }
}

export const ExceedAlertThreshold: Story = {
  args: {
    currentUsage: 95,
    isNotFoundSubscription: false
  }
}
