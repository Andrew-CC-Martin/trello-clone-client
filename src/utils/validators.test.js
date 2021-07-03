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

describe("validatePassword", () => {
  test("It requires min 8 chars", () => {
    expect(validatePassword("5Hhwe&o")).toBe(false)
  })

  test("It requires min 1 number", () => {
    expect(validatePassword("]&Ifdudk")).toBe(false)
  })

  test("It requires both upper and lowercase letters", () => {
    expect(validatePassword("245%hdig")).toBe(false)
    expect(validatePassword("245%HDIG")).toBe(false)
  })

  test("It requires at least one non-alphanumeric char", () => {
    expect(validatePassword("2458HDiG")).toBe(false)
  })

  test("It allows valid passwords", () => {
    expect(validatePassword("24*8HDiG")).toBe(true)
  })
})
