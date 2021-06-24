import { validateInput } from "./validators"

describe("validateInput", () => {
  test("It returns false if bad words are present", () => {
    expect(validateInput("bum")).toBe(false)
    expect(validateInput("hello you bum")).toBe(false)
  })

  test("It returns true if no bad words are present", () => {
    expect(validateInput("hello there")).toBe(true)
  })
})
