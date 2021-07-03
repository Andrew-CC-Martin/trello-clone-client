import { validateInput, validateEmail, validatePassword } from "./validators"

describe("validateInput", () => {
  test("It returns false if bad words are present", () => {
    expect(validateInput("bum")).toBe(false)
    expect(validateInput("hello you bum")).toBe(false)
  })

  test("It returns true if no bad words are present", () => {
    expect(validateInput("hello there")).toBe(true)
  })
})

describe("validateEmail", () => {
  test("it allows valid email addresses", () => {
    const validAddress = "email123@gmail.com"
    expect(validateEmail(validAddress)).toBe(true)
  })

  test("It rejects invalid email addresses", () => {
    const invalidAddresses = ["hello", "email.com", "something@somethingelse"]
    invalidAddresses.forEach((address) => {
      expect(validateEmail(address)).toBe(false)
    })
  })
})

