import { useInstitutionData } from "@/hooks/useInstitutionData"
import { TenantProvider } from "@/providers/tenant-provider"
import { Outlet } from "react-router-dom"

export const GlobalLayouts = () => {
  const institutionData = useInstitutionData()

  return (
    <div>
      <TenantProvider initInstitution={institutionData}>
        <Outlet />
      </TenantProvider>
    </div>
  )
}
