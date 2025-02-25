/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from "@storybook/react"

import { Pagination } from "./Pagination"
import { useState } from "react"

const ContentDemo = (props: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(props.page)

  return (
    <div>
      <h3>Current page content: {page}</h3>
      <Pagination
        {...props}
        page={page}
        onNextPage={() => setPage((prev) => prev + 1)}
        onPageChange={setPage}
        onPreviousPage={() => setPage((prev) => prev - 1)}
      />
    </div>
  )
}

const meta = {
  component: Pagination,
  title: "Shared/Molecules/Pagination",
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    total: 20,
    page: 5
  }
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onNextPage: () => {},
    onPreviousPage: () => {},
    onPageChange: () => {}
  },
  render: (args) => <ContentDemo {...args} />
}
