import { SectionTitle } from "@/modules/loan-application-management/components/atoms/cashflows/SectionTitle.tsx"
import { PersonalInfo } from "@/modules/settings/components/organisms/PersonalInfo.tsx"
import { ChangePassword } from "@/modules/settings/components/organisms/ChangePassword.tsx"
import { isEnablePIISelfService } from "@/utils/feature-flag.utils.ts"
import { Component as UnderConstruction } from "@/modules/loan-application-management/pages/under-construction"
import { useGetUserInformation } from "@/hooks/useGetUserInformation.ts"
import { UserAuthProvider } from "@/modules/settings/constants"
import DeleteAccount from "@/modules/settings/components/organisms/DeleteAccount.tsx"
import { UserRoles } from "@/types/user.type"

export function Component() {
  const { data, isLoading } = useGetUserInformation()

  if (!isEnablePIISelfService()) return <UnderConstruction />

  return (
    <>
      <SectionTitle className="my-2xl">Profile</SectionTitle>
      <div className="space-y-8 py-4">
        <PersonalInfo />
        {!isLoading && data?.authProvider !== UserAuthProvider.GOOGLE ? (
          <ChangePassword />
        ) : null}
        {!isLoading &&
        data?.roles.includes(UserRoles.APPLICANT.toLowerCase() as UserRoles) ? (
          <DeleteAccount />
        ) : null}
      </div>
    </>
  )
}

Component.displayName = "ProfilePage"
