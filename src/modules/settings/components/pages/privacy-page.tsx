import { DataTable } from "@/components/ui/data-table.tsx"
import { connectedAppColumns } from "@/modules/settings/components/organisms"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { SectionTitle } from "@/modules/loan-application-management/components/atoms/cashflows/SectionTitle.tsx"
import useGetConnectedBanks from "@/modules/settings/hooks/useGetConnectedBanks.ts"
import { isEnablePIISelfService } from "@/utils/feature-flag.utils.ts"
import { Component as UnderConstruction } from "@/modules/loan-application-management/pages/under-construction"

export function Component() {
  const { data: connectedApps, isLoading: isLoadingConnectedApps } =
    useGetConnectedBanks()

  if (!isEnablePIISelfService()) return <UnderConstruction />

  return (
    <div className="mx-auto pt-5">
      <SectionTitle className="text-3xl">Privacy</SectionTitle>
      <div className="my-8">
        <div className="flex flex-col gap-1 mt-8">
          <h2 className="text-lg font-semibold text-[#101828]">
            Manage connected apps
          </h2>
          <p className="text-[#2C3E48]">
            Find and manage your connected apps. Once disconnected, you won’t be
            able to reconnect the app.
          </p>
        </div>
        <DataTable
          columns={connectedAppColumns}
          data={connectedApps ? connectedApps.connectedBanks : []}
          isLoading={isLoadingConnectedApps}
          tableWrapperClassName="rounded-2xl border-none shadow-md"
          total={connectedApps ? connectedApps.connectedBanks.length : 0}
        />
      </div>

      <div className="flex flex-col gap-6 items-end">
        <div className="flex flex-col gap-6 mt-8 w-full">
          <h2 className="text-lg font-semibold text-[#101828]">Data</h2>
          <p className="text-[#2C3E48]">
            You can download a copy of all personal data stored within this
            platform. This includes your application details, data subprocessor
            information, data usage purposes, and information on third-party
            sharing.
          </p>
        </div>
        <ButtonLoading className="w-fit" isLoading={false} variant="outline">
          Download data
        </ButtonLoading>
        <Separator orientation="horizontal" />
      </div>
    </div>
  )
}

Component.displayName = "PrivacyPage"
