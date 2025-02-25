import { type Meta, type StoryObj } from "@storybook/react"
import { Image } from "./Image"

const meta = {
  title: "Shared/Atoms/Image with Placeholder",
  component: Image,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text"
    },
    alt: {
      control: "text"
    },
    width: {
      control: "number"
    },
    height: {
      control: "number"
    }
  },
  args: {
    className: "rounded-xl object-cover h-60 w-96",
    src: "https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    alt: "Image"
  }
}

export const WithPlaceholder: Story = {
  args: {
    alt: "Failed image",
    src: "",
    placeholderClassName:
      "bg-muted-foreground/20 animate-pulse rounded-xl h-60 w-96"
  }
}
