/**
 * Get subdomain e.g. https://intrust-bank.tryforesight.link/, https://intrust-bank.portal.tryforesight.link/
 *                    http://intrust-bank.localhost:5173/login
 * @returns e.g. intrust-bank
 */

import { Institution } from "@/constants/tenant.constants"

const DEFAULT_DEMO_SUBDOMAIN = "capsight"

function getSubdomain(): string {
  // return Institution.CyphrV2 // for Cyphr 2.0
  // return "loanready" // for LoanReady

  try {
    const { host } = window.location
    const isDev = host.includes("localhost")
    const splitHost = host.split(".")
    const isContainPortal = splitHost.includes("portal")
    if (
      (!isDev && splitHost.length === (isContainPortal ? 4 : 3)) ||
      (isDev && splitHost.length === (isContainPortal ? 3 : 2))
    ) {
      return splitHost[0]
    }
    return DEFAULT_DEMO_SUBDOMAIN
  } catch {
    return DEFAULT_DEMO_SUBDOMAIN
  }
}

function getTenantDomain(subdomain: string) {
  try {
    return window.location.origin.replace("foresight", subdomain)
  } catch {
    return ""
  }
}

function isLoanReady(): boolean {
  return getSubdomain() === Institution.LoanReady
}

function isCyphrBank(): boolean {
  return getSubdomain() === Institution.CyphrV2
}

export { getSubdomain, isLoanReady, isCyphrBank, getTenantDomain }
