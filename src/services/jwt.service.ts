import { AxiosResponse } from "axios"

import { postRequest } from "./client.service"

import { UserInfo } from "@/types/user.type"

export const parseJwt = (token: string) => {
  try {
    if (!token) return null
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}

const ONE_DAY_IN_SECONDS = 86400
const REFRESH_TOKEN_LS_KEY = "foresight-web-refresh_token"
const USER_INFO_LS_KEY = "foresight-web-user_info"

export const inMemoryJWTManager = () => {
  let logoutEventName = "foresight-web-logout"
  let inMemoryJWT: string | null = null
  let refreshTimeOutId: number
  let refreshToken: string
  let userInfo: UserInfo | null = null

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === logoutEventName) {
        inMemoryJWT = null
      }
    })
  }

  const setRefreshToken = (token: string) => {
    refreshToken = token
    localStorage.setItem(REFRESH_TOKEN_LS_KEY, token)
  }

  // This countdown feature is used to renew the JWT in a way that is transparent to the user.
  // before it's no longer valid
  const renewAccessToken = (delay: number = ONE_DAY_IN_SECONDS) => {
    refreshTimeOutId = window.setTimeout(
      processRenewToken,
      delay * 1000 - 10000
    ) // Validity period of the token in seconds, minus 10 seconds
  }

  const abortRefreshToken = () => {
    if (refreshTimeOutId) {
      window.clearTimeout(refreshTimeOutId)
    }
  }

  const processRenewToken = () => {
    getNewAccessToken()
  }

  // The method makes a call to the refresh-token endpoint
  // If there is a valid cookie, the endpoint will return a fresh jwt.
  const getNewAccessToken = () => {
    // page reload, refreshToken in memory lost, get it from local storage

    if (!refreshToken) {
      refreshToken = localStorage.getItem(REFRESH_TOKEN_LS_KEY) ?? ""
    }

    // refresh token doesn't exist in local storage, return
    if (!refreshToken) {
      return Promise.reject("Log out because we can't renew the token.")
    }

    return postRequest({
      path: "api/oauth/access-token",
      data: {
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      }
    })
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          eraseToken()
          console.error("Failed to renew the jwt from the refresh token.")
          return { refreshToken: null, accessToken: null }
        }
        return response.data
      })
      .then((userInfo: UserInfo) => {
        if (userInfo.accessToken) {
          setToken(userInfo.accessToken, userInfo.expiresIn)
        }
        if (userInfo.refreshToken) {
          setRefreshToken(userInfo.refreshToken)
        }
        setUserInfo(userInfo)
        return Promise.resolve(userInfo)
      })
      .catch(() => {
        eraseToken()
        return Promise.reject("Log out because we can't renew the token.")
      })
  }

  const getToken = () => inMemoryJWT

  const getUserInfo = () => userInfo

  const setToken = (token: string, delay?: number) => {
    inMemoryJWT = token
    renewAccessToken(delay)
  }

  const setUserInfo = (info: UserInfo) => {
    userInfo = info
    localStorage.setItem(USER_INFO_LS_KEY, JSON.stringify(info))
  }

  const eraseToken = () => {
    refreshToken = ""
    localStorage.removeItem(REFRESH_TOKEN_LS_KEY)
    localStorage.removeItem(USER_INFO_LS_KEY)
    inMemoryJWT = null
    userInfo = null
    abortRefreshToken()
    window.localStorage.setItem(logoutEventName, String(Date.now()))
  }

  const setLogoutEventName = (name: string) => (logoutEventName = name)

  return {
    getUserInfo,
    setUserInfo,
    userInfo,
    eraseToken,
    getToken,
    setToken,
    setLogoutEventName,
    setRefreshToken,
    getNewAccessToken
  }
}

export const inMemoryJWTService = inMemoryJWTManager()
