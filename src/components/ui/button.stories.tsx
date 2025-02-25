import { type Meta, type StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Check, MoveRight } from "lucide-react"

const meta = {
  title: "Shared/Atoms/Buttons",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable button component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/button'>Documentation</a>"
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
    }
  },
  args: {
    children: "Button"
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ColorAndSizeDefault: Story = {
  args: {
    variant: "default"
  }
}

export const WithReactNodeChildren: Story = {
  args: {
    variant: "default"
  },
  render: (args) => {
    return (
      <Button {...args}>
        Register now <MoveRight className="ml-2" size={16} />
      </Button>
    )
  }
}

export const ColorSuccess: Story = {
  args: {
    variant: "success"
  }
}

export const ColorDestructive: Story = {
  args: {
    variant: "destructive"
  }
}

export const ColorOutline: Story = {
  args: {
    variant: "outline"
  }
}

export const ColorSecondary: Story = {
  args: {
    variant: "secondary"
  }
}

export const ColorGhost: Story = {
  args: {
    variant: "ghost"
  }
}

export const ColorLink: Story = {
  args: {
    variant: "link"
  }
}

export const SizeSmall: Story = {
  args: {
    variant: "default",
    size: "sm"
  }
}

export const SizeLarge: Story = {
  args: {
    variant: "default",
    size: "lg"
  }
}

export const SizeIcon: Story = {
  args: {
    variant: "default",
    size: "icon"
  },
  render: (args) => {
    return (
      <Button {...args}>
        <Check />
      </Button>
    )
  }
}
