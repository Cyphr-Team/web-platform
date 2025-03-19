import { useInstitutionData } from "@/hooks/useInstitutionData"
import { TenantProvider } from "@/providers/tenant-provider"
import { useTheme } from "@/providers/theme-provider"
import { getImageURL } from "@/utils/aws.utils"
import { getRootSubdomain, getSubdomain } from "@/utils/domain.utils"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"

import { Outlet } from "react-router-dom"

export function GlobalLayouts() {
  const institutionData = useInstitutionData()
  const institution = getRootSubdomain(getSubdomain())

  // Setup theme base on institution here
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(institution ?? "light")
  }, [institution, institutionData.name, setTheme])

  return (
    <div>
      <TenantProvider initInstitution={institutionData}>
        <Helmet>
          {!!institutionData?.customFieldsOnDemand?.favicon && (
            <link
              href={getImageURL(institutionData?.customFieldsOnDemand?.favicon)}
              rel="icon"
              type="image/png"
            />
          )}
          <title>{institutionData.name}</title>
        </Helmet>
        <Outlet />
      </TenantProvider>
    </div>
  )
}
