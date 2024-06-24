import { Outlet } from "react-router-dom"
import { LogoHeader } from "../atoms/LogoHeader"
import { useTenant } from "@/providers/tenant-provider"
import { Mail } from "lucide-react"
import { SUPPORT_EMAIL } from "@/constants/email.constant"

export function ActiveEmailLayout() {
  const { tenantData } = useTenant()

  return (
    <>
      <header className="fixed p-3 md:p-8 flex justify-between items-center w-full md:w-auto z-20 bg-white gap-2">
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

      <main className="pt-6 md:pt-0">
        <Outlet />
      </main>

      <footer className="hidden md:block">
        <div className="text-sm text-text-tertiary">
          {tenantData?.name && (
            <div className="capitalize absolute bottom-8 left-8">
              © {tenantData?.name} 2024
            </div>
          )}

          {tenantData?.supportEmail && (
            <div className="absolute bottom-8 right-8">
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
