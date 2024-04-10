import { Institution, InstitutionData } from "@/constants/tenant.constants"
import { getSubdomain } from "@/utils/domain.utils"
import { createContext, useContext, useMemo, useState } from "react"

type TenantProviderProps = {
  children: React.ReactNode
  initInstitution: InstitutionData
}

type TenantProviderState = {
  tenant?: Institution
  tenantData?: InstitutionData
}

const TenantContext = createContext<TenantProviderState>({})

export function TenantProvider({
  children,
  initInstitution,
  ...props
}: TenantProviderProps) {
  const [tenant] = useState<Institution>(getSubdomain() as Institution)
  const [tenantData] = useState(initInstitution)

  const value = useMemo(() => ({ tenant, tenantData }), [tenant, tenantData])

  return (
    <TenantContext.Provider {...props} value={value}>
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => {
  const context = useContext(TenantContext)

  if (context === undefined)
    throw new Error("useTenant must be used within a TenantProvider")

  return context
}
