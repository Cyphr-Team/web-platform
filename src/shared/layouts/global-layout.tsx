import { useInstitutionData } from "@/hooks/useInstitutionData"
import { TenantProvider } from "@/providers/tenant-provider"
import { useTheme } from "@/providers/theme-provider"
import { getSubdomain } from "@/utils/domain.utils"
import { useEffect } from "react"

import { Outlet } from "react-router-dom"

export const GlobalLayouts = () => {
  const institutionData = useInstitutionData()
  const institution = getSubdomain()

  // Setup theme base on institution here
  const { setTheme } = useTheme()
  useEffect(() => {
    setTheme(institution ?? "light")
  }, [institution, institutionData.name, setTheme])

  return (
    <div>
      <TenantProvider initInstitution={institutionData}>
        <Outlet />
      </TenantProvider>
    </div>
  )
}
