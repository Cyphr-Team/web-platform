import { Component as UnderConstruction } from "@/modules/loan-application-management/pages/under-construction"
import { isEnablePIISelfService } from "@/utils/feature-flag.utils.ts"
import { SectionTitle } from "@/modules/loan-application-management/components/atoms/cashflows/SectionTitle.tsx"
import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "@/components/ui/table"
// import { MoreHorizontal } from "lucide-react"

export function Component() {
  if (!isEnablePIISelfService()) return <UnderConstruction />

  return (
    <div className="flex flex-col gap-4 mt-2xl">
      <SectionTitle>Privacy</SectionTitle>

      {/* Manage connected apps section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Manage connected apps</h2>
        <p className="text-muted-foreground">
          Find and manage your connected apps. Once disconnected, you won't be
          able to reconnect the app.
        </p>

        <div className="max-h-[84vh] flex-1 flex-col overflow-hidden rounded-xl border">
          <div className="bg-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Application</th>
                  <th className="px-4 py-3 text-left">App</th>
                  <th className="px-4 py-3 text-left">Connected On</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* <tr>
                  <td className="px-4 py-3">Larry's Latte</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black">
                        <span className="text-white">P</span>
                      </div>
                      <span>Plaid</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Jan 6, 2022</td>
                  <td className="px-4 py-3">Connected</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </td>
                </tr> */}

                <TableRow>
                  <TableCell
                    className={cn("h-24 text-center text-base")}
                    colSpan={5}
                  >
                    No results.
                  </TableCell>
                </TableRow>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

Component.displayName = "PrivacyPage"
