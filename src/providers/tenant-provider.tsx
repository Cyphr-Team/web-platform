import {
  Institution,
  InstitutionData,
  TENANT
} from "@/constants/tenant.constants"
import { getSubdomain } from "@/utils/domain.utils"
import { createContext, useContext, useMemo, useState } from "react"

type TenantProviderProps = {
  children: React.ReactNode
}

type TenantProviderState = {
  tenant?: Institution
  tenantData: InstitutionData
}

const TenantContext = createContext<TenantProviderState>({
  tenantData: TENANT["altcap"]
})

export function TenantProvider({ children, ...props }: TenantProviderProps) {
  const [tenant] = useState<Institution>(getSubdomain() as Institution)

  const value = useMemo(
    () => ({
      tenant,
      tenantData: TENANT[tenant] ? TENANT[tenant] : TENANT["altcap"]
    }),
    [tenant]
  )

  return (
    <TenantContext.Provider {...props} value={value}>
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => {
  const context = useContext(TenantContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
