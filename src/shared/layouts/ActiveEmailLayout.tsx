import { Outlet } from "react-router-dom"
import { LogoHeader } from "../atoms/LogoHeader"
import { useTenant } from "@/providers/tenant-provider"
import { Mail } from "lucide-react"
import { SUPPORT_EMAIL } from "@/constants/email.constant"
import { isCapitalCollab } from "@/utils/domain.utils.ts"

export function ActiveEmailLayout() {
  const { tenantData } = useTenant()

  return (
    <>
      <header className="fixed z-20 flex w-full items-center justify-between gap-2 bg-white p-3 md:w-auto md:p-8">
        <div>
          <LogoHeader isShowLogo={!isCapitalCollab()} />
        </div>

        {tenantData?.supportEmail ? (
          <div className="block text-sm text-text-tertiary md:hidden">
            <a
              className="flex items-center gap-2"
              href={SUPPORT_EMAIL(tenantData.supportEmail)}
            >
              <Mail className="size-4" /> {tenantData.supportEmail}
            </a>
          </div>
        ) : null}
      </header>

      <main className="pt-6 md:pt-0">
        <Outlet />
      </main>

      <footer className="hidden md:block">
        <div className="text-sm text-text-tertiary">
          {tenantData?.name ? (
            <div className="absolute bottom-8 left-8 capitalize">
              © {tenantData?.name} 2024
            </div>
          ) : null}

          {tenantData?.supportEmail ? (
            <div className="absolute bottom-8 right-8">
              <a
                className="flex items-center gap-2"
                href={SUPPORT_EMAIL(tenantData.supportEmail)}
              >
                <Mail className="size-4" /> {tenantData.supportEmail}
              </a>
            </div>
          ) : null}
        </div>
      </footer>
    </>
  )
}
