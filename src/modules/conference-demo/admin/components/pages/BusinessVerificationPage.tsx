import BusinessVerification from "../organisms/BusinessVerification"
import { Header } from "../organisms/Header"
import { TopNav } from "../organisms/TopNav"
import { useLocation } from "react-router-dom"

export function BusinessVerificationPage() {
  const location = useLocation()

  return (
    <div className="flex size-full flex-col md:pt-4">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <Header />
        <TopNav />
      </div>
      <div className="flex-1 overflow-auto bg-gray-50 p-4xl pt-3xl">
        <BusinessVerification name={location.state?.businessName} />
      </div>
    </div>
  )
}
