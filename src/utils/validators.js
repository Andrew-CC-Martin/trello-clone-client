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

export const validateEmail = (email) => {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return emailRegex.test(email)
}
