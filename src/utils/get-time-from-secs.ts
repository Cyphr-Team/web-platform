export const getTimeFromSecs = ({ totalSecs }: { totalSecs: number }) => {
  const secsInDay = 86400
  const secsInHour = 3600
  const secsInMinute = 60
  const days = Math.floor(totalSecs / secsInDay)
  const hours = Math.floor((totalSecs % secsInDay) / secsInHour)
  const minutes = Math.floor(
    ((totalSecs % secsInDay) % secsInHour) / secsInMinute
  )
  const secs = Math.floor(((totalSecs % secsInDay) % secsInHour) % secsInMinute)

  let result = ""

  if (days != 0) {
    result += `${days}d `
  }
  if (hours != 0) {
    result += `${hours}h `
  }
  if (minutes != 0) {
    result += `${minutes}m `
  }
  if (secs != 0) {
    result += `${secs}s `
  }

  return result.trim() == "" ? "N/A" : result
}
