/**
 * Get subdomain e.g. https://intrust-bank.cyphrai.link/, https://intrust-bank.portal.cyphrai.link/
 *                    http://intrust-bank.localhost:5173/login
 * @returns e.g. intrust-bank
 */

import { APP_CONFIGS } from "@/configs"
import { Institution } from "@/constants/tenant.constants"
import { isEnableIdentityInstitutionByKey } from "./feature-flag.utils"
import { institutionService } from "@/services/institution.service"

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

function getInstitutionKey(): string {
  if (isEnableIdentityInstitutionByKey()) {
    return institutionService.getInstitution().key
  }

  return getSubdomain()
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

function isCapsight(): boolean {
  return getInstitutionKey() === Institution.Capsight
}

function isLoanReady(): boolean {
  return getInstitutionKey() === Institution.LoanReady
}

function isCyphrBank(): boolean {
  return getInstitutionKey() === Institution.CyphrV2
}

function isKccBank(): boolean {
  return getInstitutionKey() === Institution.KCChamber
}

function isLaunchKC(): boolean {
  return getInstitutionKey() === Institution.LaunchKC
}

function isSbb(): boolean {
  return getInstitutionKey() === Institution.SBB
}

export {
  getInstitutionKey,
  getSubdomain,
  getTenantDomain,
  isCapsight,
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
}
