import type { Meta, StoryObj } from "@storybook/react"

import { DragDropFileInput } from "./DragFileInput"

const meta = {
  title: "Shared/Molecules/Drag Drop File Input",
  component: DragDropFileInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      value: "#f0f0f0"
    }
  },
  args: {
    onFileSelect: (files: FileList) => {
      alert(`Selected ${files.length} files`)
    },
    id: ""
  },
  argTypes: {
    multiple: {
      control: {
        type: "boolean"
      }
    }
  }
} satisfies Meta<typeof DragDropFileInput>

export default meta

type Story = StoryObj<typeof meta>

export const UploadSingleFile: Story = {
  args: {}
}

export const AllowUploadMultipleFiles: Story = {
  args: {
    multiple: true
  }
}
