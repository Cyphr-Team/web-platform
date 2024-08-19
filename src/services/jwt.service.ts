import { AxiosResponse } from "axios"

import { postRequest } from "./client.service"

import { UserInfo } from "@/types/user.type"
import { customRequestHeader } from "@/utils/request-header"

export const parseJwt = (token: string) => {
  try {
    if (!token) return null
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}

const REFRESH_TOKEN_LS_KEY = "cyphr-web-refresh_token"
const USER_INFO_LS_KEY = "cyphr-web-user_info"
export const INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY =
  "cyphr-web-intermediate_session_token"

export const inMemoryJWTManager = () => {
  let logoutEventName = "cyphr-web-logout"
  let inMemoryJWT: string | null = null
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

  /**
   * Sets the intermediate session token in local storage.
   * We would need to use it when MFA is enabled
   * This is the connection token between First Factor and Second Factor
   *
   * @param {string} token - The intermediate session token to be set.
   * @return {void}
   */
  const setIntermediateSessionToken = (token: string) => {
    localStorage.setItem(INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY, token)
  }

  const clearIntermediateSessionToken = () => {
    localStorage.deleteItem(INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY)
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
      },
      customHeader: customRequestHeader.customHeaders
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
          setToken(userInfo.accessToken)
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

  const setToken = (token: string) => {
    inMemoryJWT = token
  }

  const setUserInfo = (info: UserInfo) => {
    userInfo = info
    localStorage.setItem(USER_INFO_LS_KEY, JSON.stringify(info))
  }

  const eraseToken = () => {
    refreshToken = ""
    localStorage.removeItem(REFRESH_TOKEN_LS_KEY)
    localStorage.removeItem(USER_INFO_LS_KEY)
    localStorage.removeItem(INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY)
    inMemoryJWT = null
    userInfo = null
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
    getNewAccessToken,
    setIntermediateSessionToken,
    clearIntermediateSessionToken
  }
}

export const inMemoryJWTService = inMemoryJWTManager()
