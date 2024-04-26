import { DataFlex } from "@/modules/admin/user/flex/flex.tsx"
import { TopNav } from "./components/molecules/TopNav.tsx"

export default async function ExampleTablePage() {}

export function Component() {
  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <TopNav />
      <DataFlex />
    </div>
  )
}

Component.displayName = "SampleLazyRoute"
