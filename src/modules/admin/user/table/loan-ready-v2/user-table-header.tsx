import { Button } from "@/components/ui/button"
import { Search, Trash } from "lucide-react"
import { Input } from "@/components/ui/input.tsx"
import { type UseFormReturn } from "react-hook-form"
import { FilterSearchUsers } from "@/modules/admin/user/table/loan-ready-v2/user-filter-search-bar.tsx"
import { type UserFilterValues } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateUser.ts"
import { type ChangeEvent } from "react"

interface UserTableHeaderProps {
  totalUsers: number
  totalSelectedUsers: number
  onDelete: () => void
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
  filterForm: UseFormReturn<UserFilterValues>
}

export function UserTableHeader({
  totalUsers,
  totalSelectedUsers,
  onDelete,
  onSearch,
  filterForm
}: UserTableHeaderProps) {
  return (
    <div className="bg-[#F9FAFB] sticky left-0">
      <div className=" px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-24">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h3 className="mb-1 text-lg font-semibold text-center">Users</h3>
            <div className="text-xs py-0.5 px-2 bg-[#F2F8F8] w-max text-center rounded-lg">
              {totalUsers} users
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your platform users and their account permissions here.
          </p>
        </div>
        <div className="flex">
          {totalSelectedUsers > 0 && (
            <Button variant="outline" onClick={onDelete}>
              <Trash size={14} /> &nbsp; Delete
            </Button>
          )}
        </div>
      </div>
      <div className="pb-2 flex w-full flex-wrap items-center px-4">
        <div className="min-w-0 flex-[2] overflow-x-auto">
          <FilterSearchUsers filterForm={filterForm} />
        </div>

        <div className="flex flex-1 justify-items-end gap-3 py-1 pr-1">
          <Input
            name="search"
            placeholder="Search"
            prefixIcon={<Search className="size-4 text-text-tertiary" />}
            wrapperClassName="flex-1"
            onChange={onSearch}
          />
        </div>
      </div>
    </div>
  )
}
