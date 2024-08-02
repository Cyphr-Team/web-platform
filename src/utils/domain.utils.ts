/**
 * Get subdomain e.g. https://intrust-bank.cyphrai.link/, https://intrust-bank.portal.cyphrai.link/
 *                    http://intrust-bank.localhost:5173/login
 * @returns e.g. intrust-bank
 */

import { APP_CONFIGS } from "@/configs"
import { Institution } from "@/constants/tenant.constants"

const DEFAULT_DEMO_SUBDOMAIN = APP_CONFIGS.VITE_BASE_SUBDOMAIN

function getSubdomain(): string {
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

function getRootSubdomain(subdomain: string): string {
  // example: launchkc-rep -> launchkc
  return subdomain.replace(new RegExp("-rep" + "$"), "")
}

function matchSubdomain(subdomainToMatch: string, subdomain: string): boolean {
  const regex = new RegExp(`^${subdomain}(?:-rep)?$`)
  return regex.test(subdomainToMatch)
}

/**
 * When admin send invitation to institution's user, the baseUrl should be institution's baseURL
 * So we need to change the subdomain from [admin].cyphrai.dev / [admin].cyphrai.com
 */
function getTenantDomain(subdomain: string) {
  try {
    return window.location.origin.replace("admin", subdomain)
  } catch {
    return ""
  }
}

function isAdmin(): boolean {
  return matchSubdomain(getSubdomain(), Institution.Admin)
}

function isCapsight(): boolean {
  return matchSubdomain(getSubdomain(), Institution.Capsight)
}

function isLoanReady(): boolean {
  return matchSubdomain(getSubdomain(), Institution.LoanReady)
}

function isCyphrBank(): boolean {
  return matchSubdomain(getSubdomain(), Institution.CyphrV2)
}

function isKccBank(): boolean {
  return matchSubdomain(getSubdomain(), Institution.KCChamber)
}

function isLaunchKC(): boolean {
  return matchSubdomain(getSubdomain(), Institution.LaunchKC)
}

function isSbb(): boolean {
  return matchSubdomain(getSubdomain(), Institution.SBB)
}

export {
  getSubdomain,
  getRootSubdomain,
  matchSubdomain,
  isAdmin,
  isLoanReady,
  isCyphrBank,
  isCapsight,
  getTenantDomain,
  isKccBank,
  isLaunchKC,
  isSbb
}
