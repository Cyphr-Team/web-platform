/**
 * Allows multiple names separated by spaces, hyphens, or apostrophes (e.g., "John Smith", "Mary O'Brian", "Jean-Luc Picard")
 */
const NAME_REGEX = /^[A-Za-z]+([\s'-][A-Za-z]+)*$/

export { NAME_REGEX }
