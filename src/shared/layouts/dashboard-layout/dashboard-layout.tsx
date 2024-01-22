import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Header } from "./dashboard-header"
import { Sidebar } from "./dashboard-sidebar"

import { Suspense } from "react"
import { UserInfo } from "@/common"
import { APP_PATH } from "@/constants"

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<Navigate to={APP_PATH.LOGIN} replace />}
      >
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar className="w-1/6 hidden md:block" />
          <main className="flex-1 pt-16 overflow-x-hidden overflow-y-auto ">
            <Outlet />
          </main>
        </div>
      </Await>
    </Suspense>
  )
}
