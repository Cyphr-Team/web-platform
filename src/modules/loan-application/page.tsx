import { Outlet } from "react-router-dom"
import { SideNav } from "./components/organisms/SideNav"
import { LoanApplicationProvider } from "./providers/LoanApplicationProvider"

export default function LoanApplication() {
  return (
    <LoanApplicationProvider>
      <div className="flex h-screen overflow-hidden">
        <SideNav />
        <div className="p-4xl w-full flex justify-center">
          <Outlet />
        </div>
      </div>
    </LoanApplicationProvider>
  )
}
