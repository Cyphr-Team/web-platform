import { type Meta, type StoryObj } from "@storybook/react"
import { ButtonLoading } from "./button"

const meta = {
  title: "Shared/Atoms/Buttons/Button Loading",
  component: ButtonLoading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A button with loading state, extended from Shadcn button."
      }
    }
  },
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "success",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link"
      ]
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      type: { name: "string" }
    },
    asChild: {
      control: "boolean"
    },
    isLoading: {
      control: "boolean"
    }
  },
  args: {
    children: "Button",
    variant: "default"
  }
} satisfies Meta<typeof ButtonLoading>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutLoadingState: Story = {
  args: {
    isLoading: false,
    children: "Button Loading"
  }
}

export const WithLoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A button with a loading state. Buttons in this state are also disabled and cannot be clicked."
      }
    }
  },
  args: {
    children: "Button Loading",
    variant: "default",
    isLoading: true
  }
}
