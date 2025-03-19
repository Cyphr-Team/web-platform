/**
 * Allows multiple names separated by spaces, hyphens, or apostrophes (e.g., "John Smith", "Mary O'Brian", "Jean-Luc Picard")
 */
const NAME_REGEX = /^[A-Za-z]+([\s'-][A-Za-z]+)*$/

/**
 * Regex to replace multiple endline characters with a single endline.
 */
const CHAT_BOT_MULTIPLE_ENDLINE_REGEX = /&nbsp;/g

export { NAME_REGEX, CHAT_BOT_MULTIPLE_ENDLINE_REGEX }
