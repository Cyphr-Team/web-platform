import { useEffect, useState } from "react"
import { DeleteUserButton } from "./DeleteUserButton"
import { UserDetailInfo, UserRoles, UserStatus } from "@/types/user.type"
import { nameByRole } from "../../constants/roles.constants"
import { useQueryListPaginateUser } from "../../hooks/useQuery/useQueryListPaginateUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AccessList() {
  const { data, isFetching } = useQueryListPaginateUser({
    // TODO: Pagination for infinite scrolling
    limit: Infinity,
    offset: 0
  })
  const [users, setUsers] = useState<UserDetailInfo[]>([])

  useEffect(() => {
    // Filter out applicants - only show users with roles other than "Applicant" and are ACTIVE
    const accessList =
      data?.data.filter(
        (user) =>
          !user.roles.includes(
            UserRoles.APPLICANT.toLowerCase() as UserRoles
          ) && user.status === UserStatus.ACTIVE
      ) ?? []
    setUsers(accessList)
  }, [data?.data, isFetching])

  const removeUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
  }

  return (
    <div className="mt-1">
      <div>
        <div className="flex justify-between w-full mt-2">
          <p className="font-medium">People with access</p>
          <p className="font-medium mr-5 invisible md:visible">Role</p>
        </div>
        <hr className="mt-2" />
      </div>
      <div className="mt-2 max-h-80 overflow-y-auto bg-white p-2">
        {users.map((user, index) => {
          const userFirstRole = user.roles[0]
          return (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-2 max-w-[300px] md:max-w-full"
            >
              <div className="flex items-center w-full md:w-2/3">
                <DeleteUserButton
                  userId={user.id}
                  userName={user.name}
                  index={index}
                  disabled={
                    user.roles.length == 1 &&
                    nameByRole(userFirstRole) === "Applicant"
                  }
                  onRemove={() => removeUser(user.id)}
                />
                <Avatar className="w-10 h-10 rounded-full mx-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <p className="font-normal text-base text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-700 md:hidden">
                    {nameByRole(userFirstRole)}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="md:w-1/3 text-right invisible md:visible">
                <span className="font-normal text-sm">
                  {nameByRole(userFirstRole)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
