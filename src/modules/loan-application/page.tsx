import { LoanIntroduction } from "./components/layouts/LoanIntroduction"
import { SideNav } from "./components/organisms/SideNav"

export default function LoanApplication() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="p-4xl w-full flex justify-center">
        <LoanIntroduction />
      </div>
    </div>
  )
}
