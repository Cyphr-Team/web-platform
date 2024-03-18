/**
 * Get subdomain e.g. https://intrust-bank.tryforesight.link/, https://intrust-bank.portal.tryforesight.link/
 * @returns e.g. intrust-bank
 */

function getSubdomain(): string {
  try {
    const { host } = window.location
    const splitHost = host.split(".")
    return splitHost[0]
  } catch {
    return ""
  }
}

export { getSubdomain }
