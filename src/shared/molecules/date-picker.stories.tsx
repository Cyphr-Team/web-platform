import type { Meta, StoryObj } from "@storybook/react"

import { CalendarDatePicker } from "./date-picker"
import { useState } from "react"

const meta = {
  title: "Shared/Molecules/CalendarDatePicker",
  component: CalendarDatePicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ],
  render: (args) => <WrapperComponent {...args} />,
  argTypes: {
    onSelectDate: {
      action: "onSelectDate"
    },
    align: {
      options: ["start", "end", "center"],
      control: { type: "select" },
      defaultValue: "center"
    },
    isEnableFutureDate: {
      control: { type: "boolean" },
      defaultValue: false
    }
  }
} satisfies Meta<typeof CalendarDatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const WrapperComponent = (
  props: React.ComponentProps<typeof CalendarDatePicker>
) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  return (
    <CalendarDatePicker
      value={selectedDate?.toString()}
      onSelectDate={setSelectedDate}
      {...props}
    />
  )
}

export const CustomPlaceholder: Story = {
  args: {
    align: "center",
    placeholder: "Custom placeholder"
  }
}

export const WithPrefixLabel: Story = {
  args: {
    prefixLabel: "DATE"
  }
}
