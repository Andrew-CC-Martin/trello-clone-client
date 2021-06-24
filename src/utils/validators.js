export const validateInput = (input) => {
  const bannedWords = ["bum"]
  let valid = true
  bannedWords.forEach((word) => {
    if (input.includes(word)) {
      valid = false
      return
    }
  })

  return valid
}
