import { Outlet } from "react-router-dom"
import { LogoHeader } from "../atoms/LogoHeader"
import { useTenant } from "@/providers/tenant-provider"
import { Mail } from "lucide-react"
import { SUPPORT_EMAIL } from "@/constants/email.constant"

export function ActiveEmailLayout() {
  const { tenantData } = useTenant()

  return (
    <>
      <header className="fixed p-3 md:p-8 flex justify-between items-center w-full md:w-auto z-20 bg-white">
        <div>
          <LogoHeader />
        </div>

        {tenantData?.supportEmail && (
          <div className="block md:hidden text-sm text-text-tertiary">
            <a
              href={SUPPORT_EMAIL(tenantData.supportEmail)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> {tenantData.supportEmail}
            </a>
          </div>
        )}
      </header>

      <main className="pt-6 md:0">
        <Outlet />
      </main>

      <footer className="hidden md:block absolute bottom-0 w-full">
        <div className="flex justify-between w-full p-2 md:p-8 pt-0 text-sm text-text-tertiary gap-2">
          {tenantData?.name && (
            <div className="capitalize">© {tenantData?.name} 2023</div>
          )}

          {tenantData?.supportEmail && (
            <div>
              <a
                href={SUPPORT_EMAIL(tenantData.supportEmail)}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> {tenantData.supportEmail}
              </a>
            </div>
          )}
        </div>
      </footer>
    </>
  )
}
